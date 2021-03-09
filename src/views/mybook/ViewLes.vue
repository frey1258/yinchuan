<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px"
                style="padding-bottom:0px;">
                <el-form-item label="学期" prop="type">
                    <el-select v-model="queryParams.semesterId" 
                    @change="semesterChange"
                    placeholder="全部" size="small">
                        <el-option v-for="dict in semesters" :key="dict.id" :label="dict.name"
                            :value="dict.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="教学周" prop="weekNum">
                    <el-select v-model="queryParams.weekNum"
                    @change="weekNumChange"
                     placeholder="全部" size="small">
                        <el-option v-for="dict in weekNums" :key="dict.id" :label="dict.weekNum"
                            :value="dict.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <!--  -->
            <div class="class-table">
                <div class="table-wrapper">
                    <div class="tabel-container">
                        <div class="toptitlev">
                            <div class="top_leftv" @click="beforeWeek">
                                <i class="el-icon-d-arrow-left"></i> 前一周
                            </div>
                            <div class="top_centerv">{{semesterName}}</div>
                            <div class="top_rightv" @click="nextWeek">
                                后一周
                                <i class="el-icon-d-arrow-right"></i>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>时间</th>
                                    <th v-for='(week, index) in sers' :key='index'>
                                        {{'星期' + digital2Chinese(index+1, 'week')}} 
                                        <br/> 
                                        {{week.day}}  
                                        </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for='(item, index) in classTableData' :key='index'>
                                    <td>
                                        <div>{{item.lessonName}}</div>
                                        <div class='period'>{{ item.time }}</div>
                                    </td>
                                    <td v-for='(ii, ix) in getEveryCol(item.lessonDays)' :key='ix'
                                        :class="backCanUse(ii)"
                                        :rowspan="ii.rowspan>1?ii.rowspan:1"
                                        >
                                        <div style="padding-bottom:2px">
                                            {{ii.labName  || ''}}
                                        </div><br>
                                         <div style="padding-bottom:2px">
                                            {{ii.teacherName  || ''}}
                                        </div><br>
                                        <div style="padding-bottom:2px">
                                            {{ii.lessonName  || ''}}
                                        </div><br>
                                        <div style="padding-bottom:2px">
                                            {{ii.classNames  || ''}}
                                        </div> 
                                      
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!--  -->
            <div class="legendV">
                <div class="itemv">
                    <div class="kuangv grayb"></div> 已结束
                </div>
                <div class="itemv">
                    <div class="kuangv greenb"></div> 进行中
                </div>
                <div class="itemv">
                    <div class="kuangv redb"></div> 未开始
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { semesterList, semesterWeekNumList } from '@/api/yc_semester.js';
import { appointmentScheduleList } from '@/api/yc_book.js';
import { mapState } from 'vuex'
export default {
    name: 'ViewLes',

    data() {
        return {
            queryParams: {
                semesterId: undefined,
                weekNum: undefined,
            },
            semesters: [],
            semesterName: '',
            weekNums: [],
            classTableData: [],
            selectLesson: [],
            benzhou:undefined,
            sers:[]
        };
    },

    components: {},

    computed: {
        ...mapState({
            userId: state => state.user.userId,
        }),
    },

    mounted() {
        this.queryParams.userId = this.userId
        this.getSemesters()
    },

    created() {

    },

    methods: {
        getScheduleList() {
            appointmentScheduleList(this.queryParams).then(res => {
                console.log(res)
                this.classTableData = res.data || []
                if (this.classTableData.length) {
                   this.sers = this.classTableData[0].lessonDays
                }
                this.semesters.forEach(element => {
                    if (element.id == this.queryParams.semesterId) {
                        this.semesterName = element.name + '第' + this.queryParams.weekNum + '周' + (this.queryParams.weekNum == this.benzhou ? '(本周)' : '')
                    }
                });
            })
        },
        getWeekNum(e) {
            semesterWeekNumList({ semesterId: e }).then(res => {
                console.log(res)
                this.weekNums = res.data || []
                if (this.weekNums.length) {
                    this.weekNums.forEach((element, index) => {
                        if (element.type == 1) {
                            this.queryParams.weekNum = index + 1
                            this.benzhou = index+1
                            this.getScheduleList()
                        }
                        element.id = index + 1
                    });
                }
            })
        },
        getSemesters() {
            semesterList().then(res => {
                console.log(res)
                this.semesters = res.data || []
                if (this.semesters.length) {
                    this.semesters.forEach(element => {
                        if (element.type == 1) {
                            this.queryParams.semesterId = element.id
                            this.getWeekNum(element.id)
                        }
                    });
                }
            })
        },
        digital2Chinese(num, identifier) {
            const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
        },
        backCanUse(e) {
            if (e.status == 0) {
                // 未开始
                return 'keyongv'
            } else if (e.status == 1) {
                // 进行中
                return 'bukeyongv'
            } else if (e.status == 2) {
                // 已结束
                return 'xuanzhongv'
            } else {
                return ''
            }
        },
        semesterChange(e){
             this.getWeekNum(e)
             
        },
        weekNumChange(){
            this.getScheduleList()
        },
        beforeWeek() {
            if (this.queryParams.weekNum == 1) {
                this.$message({
                    message: '已经是第一周了',
                    type: 'warning'
                });
                return
            }
            this.queryParams.weekNum -= 1
            this.getScheduleList()
        },
        nextWeek() {
            if (this.queryParams.weekNum == this.weekNums.length) {
                this.$message({
                    message: '已经是最后一周了',
                    type: 'warning'
                });
                return
            }
            this.queryParams.weekNum += 1
            this.getScheduleList()
        },
        getEveryCol(e){
          return e.filter(res => res.rowspan != -1)
        }
    }
}

</script>

<style lang="scss" scoped>
.class-table {
    .table-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgb(242, 242, 242);
    }
    .toptitlev {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        font-size: 14px;
        font-weight: 600;
        padding: 0px 20px;
        background: rgb(18, 97, 62);
        color: white;
        cursor: pointer;
    }
    .tabel-container {
        // margin: 7px;
        table {
            table-layout: fixed;
            width: 100%;
            thead {
                background-color: rgb(223, 234, 229);
                th {
                    color: black;
                    line-height: 17px;
                    font-weight: normal;
                }
            }
            tbody {
                background-color: white;
                td {
                    color: black;
                    line-height: 12px;
                    cursor: pointer;
                    height: 35px;
                }
            }
            th,
            td {
                width: 60px;
                padding: 12px 2px;
                font-size: 12px;
                text-align: center;
            }

            tr td:first-child {
                color: #333;
                background-color: rgb(223, 234, 229);
                .period {
                    margin-top: 5px;
                    font-size: 8px;
                }
            }
            .keyongv {
                background: #FF494A;
                 color: white;
            }
            .bukeyongv {
                background: #19bb69;
                 color: white;
            }
            .xuanzhongv {
                background: #AAAAAA;
                 color: white;
            }
        }
    }
}
.legendV {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .itemv {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #333;
        margin-right: 10px;
    }
    .kuangv {
        border: 1px solid #aaaaaa;
        width: 31px;
        height: 15px;
        border-radius: 5px;
        margin-right: 5px;
    }
    .whiteb {
        background: white;
    }
    .grayb {
        background: #aaaaaa;
        color: white;
    }
    .greenb {
        background: #19bb69;
        color: white;
    }
    .redb {
        background: #ee4014;
        color: white;
    }
    .blueb {
        background: #2d8df0;
        color: white;
    }
}

::v-deep .el-date-editor {
    width: 100%;
}

::v-deep .el-input__inner {
    width: 100%;
}
</style>
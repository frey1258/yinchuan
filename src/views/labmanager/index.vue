<!--  -->
<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="6" :xs="24">
                <div class="p10bg255">
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addLab">
                        添加</el-button>
                    <el-select v-model="selectlabid" placeholder="选择实验室" clearable=""
                        class="topselectv" @change="labChange" size="small">
                        <el-option v-for="dict in labs" :key="dict.id" :label="dict.name"
                            :value="dict.id" />
                    </el-select>
                    <div v-for="(ii,ix) in tableList" :key="ix" class="labv"
                        @click="changeLesTable(ii)"
                        :class="ii.id==queryParams.labId?'xuanzhongv':''">
                        <img :src="ii.photo" class="imagev">
                        <div class="btmv">
                            <div class="btm_left">
                                <div class="fl">
                                    <div class="pointv" :class="ii.useStatus==1?'usev':''"></div>
                                    <div class="labnamev">{{ii.name}}</div>
                                </div>
                                <div class="addressv">{{ii.location}}</div>
                            </div>
                            <div class="btm_right">
                                <div class="tuv">
                                    <el-progress type="circle" :width="50" color="#19BB69"
                                        :height="50" :percentage="ii.currentUseRate"></el-progress>
                                    <div>当前使用率</div>
                                </div>
                                <div class="tuv">
                                    <el-progress type="circle" :width="50" :height="50"
                                        :percentage="ii.semesterUseRate"></el-progress>
                                    <div>学期使用率</div>
                                </div>
                            </div>
                        </div>
                        <div class="operationv">
                            <span @click.stop="handleInfo(ii)">详情</span>
                            <!-- <el-divider direction="vertical"></el-divider> -->
                            <span @click.stop="handleEdit(ii)">编辑</span>
                            <!-- <el-divider direction="vertical"></el-divider> -->
                            <span @click.stop="handleDelete(ii)">删除</span>
                        </div>
                    </div>
                    <el-pagination v-show="total>0" layout="prev, pager, next"
                        @current-change="handleCurrentChange" :page-size="param.pageSize" :total="total">
                    </el-pagination>
                    <!-- <pagination v-show="total>0" :total="total" :page.sync="param.pageNum"
                        :limit.sync="param.pageSize" @pagination="getList" /> -->
                </div>
            </el-col>
            <el-col :span="18" :xs="24" class="egex">
                <div class="p10bg255">
                    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="60px"
                        style="padding-bottom:0px;">
                        <el-form-item label="学期" prop="semesterId">
                            <el-select v-model="queryParams.semesterId" placeholder="全部"
                                size="small" @change="semesterChange">
                                <el-option v-for="dict in semesters" :key="dict.id"
                                    :label="dict.name" :value="dict.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="教学周" prop="weekNum">
                            <el-select v-model="queryParams.weekNum" placeholder="全部" size="small"
                                @change="weekNumChange">
                                <el-option v-for="dict in weekNums" :key="dict.id"
                                    :label="dict.weekNum" :value="dict.id" />
                            </el-select>
                        </el-form-item>
                    </el-form>
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
                    <div class="legendV">
                        <div class="itemv">
                            <div class="kuangv whiteb"></div> 闲置中
                        </div>
                        <div class="itemv">
                            <div class="kuangv grayb"></div> 已结束
                        </div>
                        <div class="itemv">
                            <div class="kuangv greenb"></div> 使用中
                        </div>
                        <div class="itemv">
                            <div class="kuangv redb"></div> 已占用
                        </div>
                        <div class="itemv">
                            <div class="kuangv blueb"></div> 待审核
                        </div>
                    </div>
                </div>
                <!--  -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {
    labAdd, labUpdate, labAddInnerUser, labAddOutUser,
    labRelatedDevice, labUpdatePassword, labList, labPage, labGet, labDelete
} from '@/api/yc_laboratory.js';
import { appointmentScheduleList } from '@/api/yc_book.js';
import { semesterList, semesterWeekNumList } from '@/api/yc_semester.js';
export default {
    name: 'LabManager',
    data() {
        return {
            queryParams: {
                semesterId: undefined,
                weekNum: undefined,
                labId: undefined
            },
            param: {
                pageNum: 1,
                pageSize: 2,
                labId: undefined
            },
            semesters: [],
            semesterName: '',
            weekNums: [],
            classTableData: [],
            selectLesson: [],
            tableList: [],
            selectlabid: undefined,
            labs: [],
            total: 0,
            benzhou:undefined,
            sers:[]
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.getList()
        labList().then(res => {
            this.labs = res.data || []
        })
    },

    created() { },

    methods: {
        addLab() {
            this.$router.push({ path: '/lab/add' })
        },
        handleInfo(e) {
            this.$router.push({ path: '/lab/info', query: { id: e.id } })
        },
        handleEdit(e) {
            this.$router.push({ path: '/lab/update', query: { id: e.id } })
        },
        handleDelete(e) {
            var that = this
            this.$confirm('是否要删除该实验室吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return labDelete(e.id);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            })
        },
        changeLesTable(e) { 
            this.queryParams.labId = e.id
            this.getScheduleList()
        },
        handleCurrentChange(val) {
            this.param.pageNum = val
            this.getList()
        },
        getList() {
            labPage(this.param).then(res => {
                console.log(res)
                let tableList = res.data.list
                if (tableList.length) {
                    this.queryParams.labId = tableList[0].id
                    this.getSemesters()
                }
                this.tableList = tableList
                this.total = res.data.total
            })
        },
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
                            this.semesterName = element.name
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
            if (e.labStatus == 0) {
                // 未开始
                return 'xianzhiv'
            } else if (e.labStatus == 2) {
                // 进行中
                return 'jieshuv'
            } else if (e.labStatus == 1) {
                // 已结束
                return 'shiyongv'
            } else if (e.labStatus == 3) {
                // 已结束
                return 'zhanyongv'
            } else if (e.labStatus == 4) {
                // 已结束
                return 'shenhev'
            }
        },
        semesterChange(e) {
            this.getWeekNum(e)
            this.semesters.forEach(element => {
                if (element.id == e) {
                    this.semesterName = e.name
                }
            });
        },
        weekNumChange() {
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
        labChange(e) {

            if (e) {
                this.param.labId = e
                this.param.pageNum = 1
                this.getList()
            } else {
                this.param.labId = undefined
                this.getList()
            }
        },
        getEveryCol(e){
          return e.filter(res => res.rowspan != -1)
        }
    }
}

</script>
<style lang="scss" scoped>
.sdge{
    min-width: 300px;
}
.topselectv {
    float: right;
    width: 150px;
}

.labv {
    border: 1px solid #aaaaaa;
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}


.operationv {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 30px;
    width: 150px;
    background: rgb(223, 234, 229);
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    align-items: center;
    font-size: 12px;
    color: #333;
    padding: 0px 10px;
}

.imagev {
    display: block;
    width: 100%;
    height: 200px;
    // aspectFill
    object-fit: cover;
}

.xuanzhongv{
   border: 2px solid #5cb87a;
}

.btmv {
    background: white;
    min-width: 200px;
    display: flex;
    justify-content: space-between;
    padding: 10px 0px 10px 10px;
    .btm_left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .fl{
            display: flex;
            align-items: center;
        }
        .pointv {
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background: #ccc;
        }
        .usev {
            background: white;
        }
        .labnamev {
            font-weight: bold;
            font-size: 14px;
            padding-left: 10px;
        }
        .addressv {
            color: #666;
            font-size: 12px;
        }
    }
    .btm_right {
        min-width: 140px;
        font-size: 12px;
        color: #666;
        .tuv {
            display: inline-block;
            padding: 0px 5px;
        }
    }
}
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
            .xianzhiv {
                background: white;
            }
            .jieshuv {
                background: #aaaaaa;
                color: white;
            }
            .shiyongv {
                background: #19bb69;
                color: white;
            }
            .zhanyongv {
                background: #c01920;
                color: white;
            }
            .shenhev {
                background: #2d8cef;
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
    }
    .greenb {
        background: #19bb69;
    }
    .redb {
        background: #ee4014;
    }
    .blueb {
        background: #2d8df0;
    }
}

::v-deep .el-date-editor {
    width: 100%;
}

::v-deep .el-input__inner {
    width: 100%;
}
</style>
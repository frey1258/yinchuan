<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <el-row type="flex" justify="center" :gutter="20">
                <el-col :xs="24" :sm="4" :md="4" :lg="6" :xl="6">
                    <div class="tipv">注意：选择多个非相邻课节时，系统会自动拆分成多条预约记录；</div>
                    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px"
                        class="mt20" style="padding-bottom:0px;">
                        <el-form-item label="学期" prop="type">
                            <el-select v-model="queryParams.semesterId" @change="semesterChange"
                                placeholder="全部" size="small">
                                <el-option v-for="dict in semesters" :key="dict.id"
                                    :label="dict.name" :value="dict.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="教学周" prop="weekNum">
                            <el-select v-model="queryParams.weekNum" @change="weekNumChange"
                                placeholder="全部" size="small">
                                <el-option v-for="dict in weekNums" :key="dict.id"
                                    :label="dict.weekNum" :value="dict.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="已选择">
                            <div v-for="(ii,ix) in newArr" :key="ix">{{ii.name}}</div>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :xs="24" :sm="20" :md="20" :lg="18" :xl="18">
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
                                            <th v-for='(week, index) in 7' :key='index'>
                                                {{'星期' + digital2Chinese(index+1, 'week')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for='(item, index) in classTableData' :key='index'>
                                            <td>
                                                <div>{{item.lessonName}}</div>
                                                <div class='period'>{{ item.time }}</div>
                                            </td>

                                            <td v-for='(ii, ix) in item.lessonDays' :key='ix'
                                                :class="backCanUse(ii)"
                                                @click="classClick(ii,ix,index,item.lessonId)">
                                                {{ii.lessonName  || ''}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="legendV">
                        <div class="itemv">
                            <div class="kuangv whiteb"></div> 可预约
                        </div>
                        <div class="itemv">
                            <div class="kuangv grayb"></div> 已占用
                        </div>
                        <div class="itemv">
                            <div class="kuangv greenb"></div> 已选择
                        </div>
                        <!-- <div class="itemv">
                            <div class="kuangv redb"></div> 已占用
                        </div>
                        <div class="itemv">
                            <div class="kuangv blueb"></div> 待审核
                        </div> -->
                    </div>
                    <!--  -->
                </el-col>
            </el-row>
            <div class="mt20 fle">
                <el-button icon="el-icon-check" type="primary" plain @click="submitForm">确 定
                </el-button>
                <el-button icon="el-icon-close" class="m20" type="info" plain @click="cancel">取 消
                </el-button>
            </div>
        </div>

    </div>
</template>

<script>
import { semesterList, semesterWeekNumList } from '@/api/yc_semester.js';
import { appointmentScheduleList } from '@/api/yc_book.js';
export default {
    name: 'BookLes',
    data() {
        return {
            queryParams: {
                semesterId: undefined,
                weekNum: undefined,
            },
            materialGroups: [],
            materialCates: [],
            semesters: [],
            semesterName: '',
            weekNums: [],
            classTableData: [],
            selectLesson: [],
            benzhou: undefined,
            benxueqi: undefined,
            xueqiName: '',
            newArr:[]
        };
    },

    components: {},

    computed: {

    },

    mounted() {
        this.queryParams.labId = this.$route.query.labId
        this.getSemesters()
        let selectList = window.localStorage.getItem('aaa')
        if (selectList) {
            selectList = JSON.parse(selectList)
            this.selectLesson = selectList
            this.createSelectList()
        }
    },

    created() { },

    methods: {
        submitForm() {
            if (this.selectLesson.length) {
                window.localStorage.setItem('aaa', JSON.stringify(this.selectLesson))
                this.$router.go(-1)
            } else {
                this.$message.error('请选择课节')
            }
        },
        cancel() {
            window.localStorage.removeItem('aaa')
            this.$router.go(-1)
        },
        getScheduleList() {
            appointmentScheduleList(this.queryParams).then(res => {
                console.log(res)
                this.classTableData = res.data || []
                this.semesters.forEach(element => {
                    if (element.id == this.queryParams.semesterId) {
                        this.xueqiName = element.name
                        this.semesterName = element.name + '第' + this.queryParams.weekNum + '周' + (this.queryParams.weekNum == this.benzhou ? '(本周)' : '')
                    }
                });
                this.classTableData.forEach(element => {
                    element.lessonDays.forEach((e, x) => {
                        let dic = {
                            semesterId: this.queryParams.semesterId,
                            lessonId: element.lessonId,
                            week: x + 1,
                            weekNo: this.queryParams.weekNum,
                        }
                        for (let index = 0; index < this.selectLesson.length; index++) {
                            const ele = this.selectLesson[index];
                            if (ele.semesterId === dic.semesterId
                                && ele.lessonId === dic.lessonId
                                && ele.week === dic.week
                                && ele.weekNo === dic.weekNo) {
                                e.canUse = 2
                                break
                            }
                        }
                    });
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
                            this.benzhou = index + 1
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
            if (e.canUse == 0) {
                // 可用
                return 'keyongv'
            } else if (e.canUse == 1) {
                // 不可用
                return 'bukeyongv'
            } else if (e.canUse == 2) {
                // 选中
                return 'xuanzhongv'
            } else {
                return ''
            }
        },
        classClick(e, y, k, l) {
            // 选课
            // selectLesson
            let dic = {
                semesterId: this.queryParams.semesterId,
                lessonId: l,
                week: y + 1,
                weekNo: this.queryParams.weekNum,
                xueqiName: this.xueqiName,
                kejie: k + 1,
                myNo: this.queryParams.semesterId + '' + this.queryParams.weekNum + '' + '' + (y + 1) + '' + ((k + 1) >= 10 ? (k + 1) + '' : '0' + (k + 1))
            }
            console.log(dic.myNo)
            if (e.canUse == 0) {
                e.canUse = 2
                this.selectLesson.push(dic)
            } else if (e.canUse == 2) {
                e.canUse = 0
                for (let index = 0; index < this.selectLesson.length; index++) {
                    const ele = this.selectLesson[index];
                    if (ele.semesterId === dic.semesterId
                        && ele.lessonId === dic.lessonId
                        && ele.week === dic.week
                        && ele.weekNo === dic.weekNo) {
                        this.selectLesson.splice(index, 1)
                        break
                    }
                }
                // this.selectLesson.splice(this.selectLesson.findIndex(e => e === dic), 1)
            }
            this.createSelectList()
        },
        createSelectList() {
            // 合并
            // 先排序
            let showLessons = this.selectLesson || []
            function compare(propertyName) {
                return function (object1, object2) {
                    var value1 = parseInt(object1[propertyName]);
                    var value2 = parseInt(object2[propertyName]);
                    if (value2 < value1) {
                        return 1;
                    } else if (value2 > value1) {
                        return - 1;
                    } else {
                        return 0;
                    }
                }
            }
            showLessons.sort(compare("myNo"));
            
            let s = 0;
            let e = 0;
            let newArr = []
            for (let i = 0; i < showLessons.length; i++) {
                const qian = showLessons[i];
                s = qian.kejie
                for (let j = i; j < showLessons.length; j++) {
                    const hou = showLessons[j];
                    if (parseInt(hou.myNo) - parseInt(qian.myNo) == (j - i)) {
                        e = hou.kejie
                        // 如果相邻或重复
                        // 如果重复且是最后一个单独加
                        if (e == s && j == showLessons.length - 1) {
                            newArr.push({ name: hou.xueqiName + '/' + '第' + hou.weekNo + '周' + '/' + '星期' + this.digital2Chinese(hou.week, 'week') + '/' + '第' + e + '节' })
                            i = showLessons.length
                            break
                        } else if (j == showLessons.length - 1) {
                            // 如果最后一个
                            newArr.push({ name: hou.xueqiName + '/' + '第' + hou.weekNo + '周' + '/' + '星期' + this.digital2Chinese(hou.week, 'week') + '/' + '第' + s + '-' + e + '节' })
                            i = showLessons.length
                            break
                        }
                    } else {
                        // 如果不相邻 要结束 
                        //  不管是否是最后一个。都统计前面的。然后方形
                        i = j-1
                        // 判断是否是多个，多个的
                        if (s == e) {
                            newArr.push({ name: qian.xueqiName + '/' + '第' + qian.weekNo + '周' + '/' + '星期' + this.digital2Chinese(qian.week, 'week') + '/' + '第' + s  + '节' })
                        }else {
                            newArr.push({ name: qian.xueqiName + '/' + '第' + qian.weekNo + '周' + '/' + '星期' + this.digital2Chinese(qian.week, 'week') + '/' + '第' + s + '-' + e + '节' })
                        }
                        
                        break
                    }
                }
            }
            this.newArr = JSON.parse(JSON.stringify(newArr))

        },
        semesterChange(e) {
            this.getWeekNum(e)
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
        }
    }
}

</script>
<style lang="scss" scoped>
.tipv {
    color: #ee4014;
    font-size: 12px;
    padding: 0px 10px;
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
            .keyongv {
                background: white;
            }
            .bukeyongv {
                background: #aaaaaa;
            }
            .xuanzhongv {
                background: #19bb69;
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
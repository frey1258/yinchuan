<!--  -->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch"
            label-width="68px" class="p10bg255" style="padding-bottom:0px;">
            <el-form-item label="关键字" prop="keyword">
                <el-input v-model="queryParams.keyword" placeholder="" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="学期" prop="semesterIds">
                <el-select v-model="queryParams.semesterIds" placeholder="全部" multiple clearable
                    size="small">
                    <el-option v-for="dict in semesters" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="教学周" prop="weekNums">
                <el-select v-model="queryParams.weekNums" multiple placeholder="全部" clearable
                    size="small">
                    <el-option v-for="dict in weekNums" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="实验室" prop="labIds">
                <el-select v-model="queryParams.labIds" placeholder="全部" multiple clearable
                    size="small">
                    <el-option v-for="dict in labs" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="预约状态" prop="subStatuses">
                <el-select v-model="queryParams.subStatuses" placeholder="全部" multiple clearable
                    size="small">
                    <el-option v-for="dict in subStatuses" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="课程状态" prop="lessonStatuses">
                <el-select v-model="queryParams.lessonStatuses" placeholder="全部" multiple clearable
                    size="small">
                    <el-option v-for="dict in lessonStatuses" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                </el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        
        <div class="p10bg255 mt20">
            <el-row :gutter="10" style="margin:0px;">
                <el-col :span="1.5">
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleOrder">
                        预约实验室</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" icon="el-icon-view" size="mini" @click="handleInfo">
                        查看课表</el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"
                    :columns="columns"></right-toolbar>
            </el-row>

            <el-table :data="tablelist" @selection-change="handleSelectionChange">
                <el-table-column type="index" width="50" label="编号" align="center" />
                <el-table-column v-for="(ii,ix) in columns" :label="ii.label" align="center"
                    :key="ix+'dw'" v-if="ii.visible" :prop="ii.prop" 
                    :width="ix==1?200:''"
                     >
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-view"
                            @click="handleView(scope.row)">详情</el-button>
                        <el-button size="mini" type="text"
                         v-if="scope.row.status != 2"
                         icon="el-icon-edit"
                            @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text"
                            v-if="scope.row.status != 2"
                         icon="el-icon-delete"
                            @click="handleDelete(scope.row)">撤销</el-button>
                    </template>
                </el-table-column>
            </el-table>

           <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />

            <div class="btmshowtitle">累计课时：<span class="text-main">{{totalPeriod}}</span></div>
        </div>
    
        <!-- 详细 -->
        <el-dialog title="撤销预约" :visible.sync="open" width="700px" append-to-body>
            <el-input type="textarea" :rows="3" placeholder="请填写撤销预约的原因" v-model="textarea">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 认</el-button>
                <el-button @click="open = false">关 闭</el-button>
            </div>
        </el-dialog>
        
    </div>
    
</template>

<script>
import { appointmentPage, appointmentRevokeOrRefuse } from '@/api/yc_book.js';
import { semesterList } from '@/api/yc_semester.js';
import { labList } from '@/api/yc_laboratory.js';
export default {
    name: 'MyBook',
    data() {
        return {
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                keyword: undefined,
                semesterIds: undefined,
                weekNums: undefined,
                labIds: undefined,
                subStatuses: undefined,
                lessonStatuses: undefined,
            },
            semesters: [],
            weekNums: [],
            labs: [],
            total: 0,
            showSearch: true,
            multiple: true,
            subStatuses: [{ id: 0, name: '待审核' },
            { id: 1, name: '已通过' },
            { id: 2, name: '已驳回' },
            { id: 3, name: '已撤销' }],
            lessonStatuses: [{ id: 0, name: '未开始' },
            { id: 1, name: '进行中' },
            { id: 2, name: '已结束' },],
            // 列信息
            columns: [
                { key: 1, label: `预约实验室`, visible: true, prop: 'labName' },
                { key: 2, label: `预约课节`, visible: true, prop: 'lessonName' },
                { key: 3, label: `课时`, visible: true, prop: 'period' },
                { key: 4, label: `课程状态`, visible: true, prop: 'lessonStatus' },
                { key: 5, label: `使用目的`, visible: true, prop: "purpose" },
                { key: 6, label: `课程名称`, visible: true, prop: 'name' },
                { key: 7, label: `上课教师`, visible: true, prop: 'teacherNames' },
                { key: 8, label: `上课班级`, visible: true, prop: 'classesNames' },
                { key: 9, label: `备注`, visible: true, prop: 'remark' },
                { key: 10, label: `预约人`, visible: true, prop: 'creatorName' },
                { key: 11, label: `预约日期`, visible: true, prop: 'createTime' },
                { key: 12, label: `预约状态`, visible: true, prop: 'statusShift' },
            ],
            tablelist: [],
            open: false,
            totalPeriod: 0,
            textarea:'',
            appointmentId:''
        };
    },

    components: {},

    computed: {
    },

    mounted() {
        this.queryParams.userId=this.$store.state.user.userid
        this.getList()
        // 学期
        semesterList().then(res => {
            // console.log(res)
            this.semesters = res.data
            let weeknum = 0
            if (res.data.length) {
                res.data.forEach(element => {
                    if (weeknum < element.weekNum) {
                        weeknum = element.weekNum
                    }
                });
                for (let index = 1; index <= weeknum; index++) {
                    this.weekNums.push({ name: '第' + index + '周', id: index })
                }
            }
        })
        // 
        labList().then(res => {
            this.labs = res.data
        })
    },

    created() { },

    methods: {
        handleQuery() {
            this.getList()
        },
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        handleOrder() {
            window.localStorage.removeItem('aaa')
            window.localStorage.removeItem('form')
            this.$router.push({ path: '/mybook/book/lab' })
        },
        handleInfo() {
            this.$router.push({ path: '/mybook/book/viewles' })
        },
        getList() {
            // 获取分页列表
            appointmentPage(this.queryParams).then((res) => {
                console.log(res)
                var  list = res.data.data.list || []
                if (list) {
                    list.forEach(element => {
                        // this.lessonStatuses.forEach(e => {
                        //     if (e.id == element.lessonStatus) {
                        //         element.lessonStatusShift = e.name
                        //     }
                        // });
                        this.subStatuses.forEach(e => {
                            if (e.id == element.status) {
                                element.statusShift = e.name
                            }
                        });
                    });
                }
                this.totalPeriod = res.data.totalPeriod
                this.tablelist = list
                this.total = res.data.data.total
            })
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleEdit(e) {
            window.localStorage.removeItem('aaa')
            window.localStorage.removeItem('form')
            this.$router.push({ path: '/mybook/book/update', query: { id: e.id} })
        },
        handleView(e) {
            this.$router.push({ path: '/mybook/book/info', query: { id: e.id } })
        },
        submitForm(){
            if(!this.textarea) {
                this.$message.error('请填写撤销原因')
                return
            }
            let param = {
                reason:this.textarea,
                appointmentId:this.appointmentId,
                type:3
            }
            appointmentRevokeOrRefuse(param).then(res =>{
                this.getList();
                this.msgSuccess("撤销成功");
                this.open = false
                this.textarea = ''
            });
        },
        handleDelete(e) {
           this.open = true
           this.appointmentId = e.id
        }
    }
}

</script>
<style lang="scss" scoped>
::v-deep .el-date-editor {
    width: 180px;
}

::v-deep .el-input__inner {
    width: 180px;
}

.btmshowtitle {
    font-size: 15px;
    margin-top: 10px;
}
</style>
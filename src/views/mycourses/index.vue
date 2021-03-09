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
                    <el-button type="primary" icon="el-icon-check" size="mini" @click="handleInfo">
                        查看课表</el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"
                    :columns="columns"></right-toolbar>
            </el-row>

            <el-table :data="tablelist">
                <el-table-column type="index" label="编号" width="50" align="center" />
                <el-table-column v-for="(ii,ix) in columns" :label="ii.label" align="center"
                    :key="ix+'dw'" v-if="ii.visible" :prop="ii.prop" show-overflow-tooltip
                    :width="ix==1?300:''"
                    >
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-view"
                            @click="handleView(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </div>

        
    </div>
</template>

<script>
import { appointmentPage, appointmentRevokeOrRefuse } from '@/api/yc_book.js';
import { semesterList } from '@/api/yc_semester.js';
import { labList } from '@/api/yc_laboratory.js';
export default {
    name: 'MyCourse',
    data() {
        return {
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                keyword: undefined,
                semesterIds: undefined,
                weekNums: undefined,
                labIds: undefined,
                lessonStatuses: undefined,
                userId:'',
                subStatuses:1
            },
            semesters: [],
            weekNums: [],
            labs: [],
            total: 0,
            showSearch: true,
            multiple: true,
            lessonStatuses: [{ id: 0, name: '未开始' },
            { id: 1, name: '进行中' },
            { id: 2, name: '已结束' },],
            // 列信息
            columns: [
                { key: 1, label: `上课实验室`, visible: true, prop: 'labName' },
                { key: 2, label: `上课时间`, visible: true, prop: 'lessonName' },
                { key: 3, label: `课程状态`, visible: true, prop: 'lessonStatus' },
                { key: 4, label: `课程名称`, visible: true, prop: 'name' },
                { key: 5, label: `上课教师`, visible: true, prop: "teacherNames" },
                { key: 6, label: `上课班级`, visible: true, prop: 'classesNames' },
                { key: 7, label: `备注`, visible: true, prop: 'remark' },
            ],
            tablelist: [],
            open: false,
            totalPeriod: 0,
            textarea: '',
            appointmentId: ''
        };
    },

    components: {},

    computed: {
      
    },

    mounted() {
        this.queryParams.userId=this.$store.state.user.userid
        this.getList()
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
        handleInfo() {
            this.$router.push({ path: '/mybook/book/viewles' })
        },

        handleView(e) {
            this.$router.push({ path: '/course/info',query:{id:e.id} })
        },
        getList() {
            // 获取分页列表
            appointmentPage(this.queryParams).then((res) => {
                console.log(res)
                var  list = res.data.data.list || []
                // if (list) {
                //     list.forEach(element => {
                //         this.lessonStatuses.forEach(e => {
                //             if (e.id == element.lessonStatus) {
                //                 element.lessonStatusShift = e.name
                //             }
                //         });
                //     });
                // }
                this.totalPeriod = res.data.totalPeriod
                this.tablelist = list
                this.total = res.data.data.total
            })
        },
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
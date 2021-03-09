<!--  -->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch"
            class="p10bg255" style="padding-bottom:0px;" label-width="68px">
            <el-form-item label="关键字" prop="keyword">
                <el-input v-model="queryParams.keyword" placeholder="名称/编码" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                </el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="p10bg255 mt20">
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini"
                        @click="handleAdd">添加</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini"
                        :disabled="multiple" @click="handleListDelete">删除</el-button>
                </el-col>

            </el-row>

            <el-table :data="tablelist" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column label="学期名称" show-overflow-tooltip prop="name"></el-table-column>
                <el-table-column label="教学周数" show-overflow-tooltip prop="weekNum">
                </el-table-column>
                <el-table-column label="开始日期" show-overflow-tooltip prop="startTimeStr">
                </el-table-column>
                <el-table-column label="状态" show-overflow-tooltip prop="statusShift">
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit"
                            @click="handleView(scope.row)">详情</el-button>
                        <el-button size="mini" type="text" icon="el-icon-edit"
                            @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="title" :visible.sync="open" width="450px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="学期名称:" prop="name">
                    <el-input v-model="form.name" placeholder="请输入学期名称" v-if="title!='查看学期'" />
                    <div v-else>
                        {{form.name}}
                    </div>
                </el-form-item>
                <el-form-item label="教学周数:" prop="weekNum">
                    <el-input v-model="form.weekNum" placeholder="请输入教学周数" v-if="title!='查看学期'" />
                    <div v-else>
                        {{form.weekNum}}
                    </div>
                </el-form-item>
                <el-form-item label="开始日期:" prop="startTime">
                    <el-date-picker v-model="form.startTime" v-if="title!='查看学期'"
                        value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始日期">
                    </el-date-picker>
                    <div v-else>
                        {{form.startTime}}
                    </div>
                </el-form-item>
                <el-form-item label="学期状态:">
                    <div v-if="title!='查看学期'">
                        <el-radio v-model="form.status" :label="0">正常</el-radio>
                        <el-radio v-model="form.status" :label="1">停用</el-radio>
                    </div>
                    <div v-else>
                        {{form.statusShift}}
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" v-if="title!='查看学期'">
                <el-button type="primary" icon="el-icon-check" @click="deviceCateOpeation">确 定
                </el-button>
                <el-button icon="el-icon-close" @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    semesterAdd, semesterUpdate
    , semesterPage,
    semesterGet, semesterDelete,
    semesterListDelete
} from '@/api/yc_semester.js';
export default {
    name: 'XueQi',
    data() {
        return {
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                keyword: undefined,
            },
            showSearch: true,
            multiple: true,

            tablelist: [],
            open: false,
            title: '',
            form: {},
            rules: {
                weekNum: [
                    { required: true, message: "请输入设备类编码", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入学期名称", trigger: "blur" }
                ],
                createTime: [
                    { required: true, message: "请输入设备类编码", trigger: "blur" }
                ],
            },
            ids: undefined
        };
    },

    components: {},

    computed: {},

    mounted() {
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
        handleAdd() {
             this.form = {}
            this.resetForm("form");
            this.open = true;
            this.title = "添加学期";
        },
        handleListDelete() {
            let that = this
            this.$confirm('确认要删除该学期吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return semesterListDelete(that.ids);
            }).then(() => {
                this.msgSuccess("删除成功");
                this.getList();
            })
        },
        getList() {
            // 获取分页列表
            semesterPage(this.queryParams).then((res) => {
                console.log(res)
                var list = res.data.list
                list.forEach(element => {
                    if (element.status == '0') {
                        element.statusShift = '正常'
                    } else if (element.status == '1') {
                        element.statusShift = '停用'
                    }
                });
                this.tablelist = list
            })
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            console.log(this.ids)
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleView(e) {
            this.form = JSON.parse(JSON.stringify(e))
            this.open = true;
            this.title = "查看学期";
        },
        handleEdit(e) {
            this.form = JSON.parse(JSON.stringify(e))
            this.open = true;
            this.title = "修改学期";
        },
        handleDelete(e) {
            this.$confirm('确认要删除该学期吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return semesterDelete(e.id);
            }).then(() => {
                this.msgSuccess("删除成功");
                this.getList();
            })
        },
        deviceCateOpeation() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        semesterUpdate(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        semesterAdd(this.form).then(response => {
                            this.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        cancel() {
             this.open = false
            this.resetForm("form");
            this.form = {}
        }
    }
}

</script>
<style lang="scss" scoped>
::v-deep .el-date-editor {
    width: 100%;
}

::v-deep .el-input__inner {
    width: 100%;
}
</style>
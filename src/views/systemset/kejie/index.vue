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
                <el-table-column type="index" label="编号"></el-table-column>
                <el-table-column label="课节名称" show-overflow-tooltip prop="name"></el-table-column>
                <el-table-column label="开始时间" show-overflow-tooltip prop="startTime">
                </el-table-column>
                <el-table-column label="结束时间" show-overflow-tooltip prop="endTime">
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="150">
                    <template slot-scope="scope">
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
                <el-form-item label="课节名称:" prop="name">
                    <el-input v-model="form.name" placeholder="请输入课节名称" />
                </el-form-item>
                <el-form-item label="开始时间:" prop="startTime">
                    <!-- <el-time-picker is-range v-model="form.times" format="HH:mm" arrow-control
                        value-format='HH:mm' range-separator="至" start-placeholder="开始时间"
                        end-placeholder="结束时间" placeholder="选择时间范围" @blur="selectTimeChange">
                    </el-time-picker> -->
                    <el-time-picker v-model="form.startTime" value-format='HH:mm' format="HH:mm"
                        placeholder="开始时间点">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="结束时间:" prop="endTime">
                    <el-time-picker v-model="form.endTime" value-format='HH:mm' format="HH:mm"
                        placeholder="结束时间点" >
                    </el-time-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" icon="el-icon-check" @click="deviceCateOpeation">确 定
                </el-button>
                <el-button icon="el-icon-close" @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    lessonAdd, lessonUpdate
    , lessonListDelete,
    lessonPage, lessonGet,
    lessonDelete
} from '@/api/yc_lesson.js';
export default {
    name: 'KeJie',
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
                times: [
                    { required: true, message: "请输入时间范围", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入课节名称", trigger: "blur" }
                ],
                startTime: [
                    { required: true, message: "请输入开始时间点", trigger: "blur" }
                ],
                endTime: [
                    { required: true, message: "请输入结束时间点", trigger: "blur" }
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
            this.resetForm("form");
            this.form = {}
            this.open = true;
            this.title = "添加课节";
        },
        handleListDelete() {
            let that = this
            this.$confirm('确认要删除该课节吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return lessonListDelete(that.ids);
            }).then(() => {
                this.msgSuccess("删除成功");
                this.getList();
            })
        },
        getList() {
            // 获取分页列表
            lessonPage(this.queryParams).then((res) => {
                console.log(res)
                var list = res.data.list
                this.tablelist = list
            })
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleEdit(e) {
            this.form = JSON.parse(JSON.stringify(e))
            this.open = true;
            this.title = "编辑课节";
        },
        handleDelete(e) {
            this.$confirm('确认要删除该课节吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return lessonDelete(e.id);
            }).then(() => {
                this.msgSuccess("删除成功");
                this.getList();
            })
        },
        deviceCateOpeation() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let timeArr = []
                     if (this.form.startTime >=this.form.endTime) {
                         this.$message.error('开始时间不能大于结束时间')
                         return
                     }
                    this.tablelist.forEach(element => {
                        if (this.form.id != element.id) {
                            timeArr.push({ 'startTime': element.startTime, endTime: element.endTime })
                        } 
                    });
                    timeArr.push({ 'startTime': this.form.startTime, endTime: this.form.endTime })
                    if (!this.Fn(timeArr)) {
                        this.$message.error('选择时间有重复，请重新添加')
                        return
                    }
                    if (this.form.id != undefined) {
                        lessonUpdate(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        lessonAdd(this.form).then(response => {
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
        },
        // 防止重复
        Fn(dateAr) {
            for (let k in dateAr) {
                if (!this.judege(k, dateAr)) {
                    return false
                }
            }
            return true
        },
        judege(idx, dateAr) {
            for (let k in dateAr) {
                if (idx !== k) {
                    if (dateAr[k].startTime < dateAr[idx].startTime && dateAr[k].endTime > dateAr[idx].startTime) {
                        return false
                    }
                    if (dateAr[k].startTime < dateAr[idx].endTime && dateAr[k].endTime > dateAr[idx].endTime) {
                        return false
                    }
                }
            }
            return true
        },
        selectTimeChange(e) {
            console.log(e)
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
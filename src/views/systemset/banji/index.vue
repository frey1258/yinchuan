<!--  -->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch"
            label-width="68px" class="p10bg255" style="padding-bottom:0px;">
            <el-form-item label="关键字" prop="keyword">
                <el-input v-model="queryParams.keyword" placeholder="" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <!-- <el-form-item label="院系" prop="departmentId">
                <el-select v-model="queryParams.departmentId" placeholder="全部" clearable
                    size="small">
                    <el-option v-for="dict in departments" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="majorId">
                <el-select v-model="queryParams.majorId" placeholder="全部" clearable size="small">
                    <el-option v-for="dict in majors" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </el-form-item> -->
            <el-form-item label="年级" prop="grade">
                <el-select v-model="queryParams.grade" placeholder="全部" clearable size="small">
                    <el-option v-for="dict in grades" :key="dict" :label="dict" :value="dict" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                </el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="20" class="mt20">
            <el-col :span="6" :xs="24">
                <div class="p10bg255">
                    <div class="head-container mt10 mb10">院系专业
                        <i class="el-icon-circle-plus fr pointer" @click="showDialog"></i>
                    </div>
                    <div class="head-container">
                        <el-input v-model="deptName" placeholder="请输入名称" clearable size="small"
                            prefix-icon="el-icon-search" style="margin-bottom: 20px" />
                    </div>
                    <div class="head-container">
                        <el-tree :data="deptOptions" highlight-current class="filter-tree"
                            :props="defaultProps" :expand-on-click-node="false" default-expand-all
                            node-key="id" :filter-node-method="filterNode" ref="tree"
                            @node-click="handleNodeClick">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                                <el-dropdown trigger="click" @click.native="saveNodeData(node,data)"
                                    @command="handleCommand">
                                    <i class="el-icon-more"></i>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="a" v-if="data.type == 0">添加专业
                                        </el-dropdown-item>
                                        <el-dropdown-item command="b" v-if="data.type == 0">编辑
                                        </el-dropdown-item>
                                        <el-dropdown-item command="c" v-if="data.type == 0">删除
                                        </el-dropdown-item>
                                        <el-dropdown-item command="d" v-if="data.type == 1">编辑
                                        </el-dropdown-item>
                                        <el-dropdown-item command="e" v-if="data.type == 1">删除
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </span>
                        </el-tree>
                    </div>
                </div>
            </el-col>
            <el-col :span="18" :xs="24">
                <div class="p10bg255 ">
                    <el-row :gutter="10" style="margin:0px;">
                        <el-col :span="1.5">
                            <el-button type="primary" icon="el-icon-plus" size="mini"
                                @click="handleAdd">
                                添加</el-button>
                        </el-col>
                        <el-col :span="1.5">
                            <el-button type="primary" icon="el-icon-delete" :disabled='multiple'
                                size="mini" @click="handleListDelete">
                                删除</el-button>
                        </el-col>
                        <el-col :span="1.5">
                            <el-upload action="#" :limit="1" :auto-upload="false"
                                :show-file-list="false"
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                ref="upload" :on-change="fileUpdateChange">
                                <el-button type="primary" icon="el-icon-download" size="mini">导入
                                </el-button>
                            </el-upload>
                        </el-col>
                        <el-col :span="1.5">
                            <el-button type="primary" icon="el-icon-upload2" size="mini"
                                @click="handleOut">
                                导出</el-button>
                        </el-col>
                        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"
                            :columns="columns"></right-toolbar>
                    </el-row>

                    <el-table :data="tablelist" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50" align="center" />
                        <el-table-column v-for="(ii,ix) in columns" :label="ii.label" align="center"
                            :key="ix+'dw'" v-if="ii.visible" :prop="ii.prop" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" align="center"
                            class-name="small-padding fixed-width" width="200">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" icon="el-icon-view"
                                    @click="handleView(scope.row)">详情</el-button>
                                <el-button size="mini" type="text" icon="el-icon-edit"
                                    @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="text" icon="el-icon-delete"
                                    @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
                        :limit.sync="queryParams.pageSize" @pagination="getList" />
                </div>
            </el-col>
        </el-row>

        <!-- 详细 -->
        <el-dialog :title="title" :visible.sync="open" width="450px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
                <el-form-item label="院系名称：" prop="name" v-if="title == '添加院系' || title == '编辑院系'">
                    <el-input v-model="form.name" placeholder="1-20个字符" clearable size="small" />
                </el-form-item>
                <!--  -->
                <div v-else-if="title == '添加专业' || title == '编辑专业'">
                    <el-form-item label="所属院系：">
                        <el-select v-model="form.departmentId" placeholder="全部" disabled clearable
                            size="small">
                            <el-option v-for="dict in departments" :key="dict.id" :label="dict.name"
                                :value="dict.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业名称：" prop="name">
                        <el-input v-model="form.name" placeholder="1-20个字符" clearable
                            size="small" />
                    </el-form-item>
                </div>
                <!--  -->
                <div v-else-if="title == '添加班级' || title == '编辑班级' || title == '班级详情'">
                    <el-form-item label="班级名称：" prop="name">
                        <el-input v-model="form.name" placeholder="1-20个字符" clearable size="small"
                            v-if="title != '班级详情'" />
                        <div v-else>{{form.name}}</div>
                    </el-form-item>
                    <el-form-item label="所属年级：" prop="grade">
                        <el-select v-model="form.grade" placeholder="全部" clearable size="small"
                            v-if="title != '班级详情'">
                            <el-option v-for="dict in grades" :key="dict" :label="dict"
                                :value="dict" />
                        </el-select>
                        <div v-else>{{form.grade}}</div>
                    </el-form-item>
                    <el-form-item label="班级人数：" prop="num">
                        <el-input v-model="form.num" placeholder="1-20个字符" clearable size="small"
                            v-if="title != '班级详情'" />
                        <div v-else>{{form.num}}</div>
                    </el-form-item>
                    <el-form-item label="班主任：" prop="teacher">
                        <el-input v-model="form.teacher" placeholder="1-20个字符" clearable
                            size="small" v-if="title != '班级详情'" />
                        <div v-else>{{form.teacher}}</div>
                    </el-form-item>
                    <el-form-item label="所属院系：">
                        <el-select v-model="form.departmentId" placeholder="全部" clearable
                            @change="xueyuanChange" size="small" v-if="title != '班级详情'">
                            <el-option v-for="dict in departments" :key="dict.id" :label="dict.name"
                                :value="dict.id" />
                        </el-select>
                        <div v-else>{{form.departmentName}}</div>
                    </el-form-item>
                    <el-form-item label="所属专业：">
                        <el-select v-model="form.majorId" placeholder="全部" clearable size="small"
                            v-if="title != '班级详情'">
                            <el-option v-for="dict in majors" :key="dict.id" :label="dict.name"
                                :value="dict.id" />
                        </el-select>
                        <div v-else>{{form.majorName}}</div>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="form.remark" placeholder="1-20个字符" clearable size="small"
                            v-if="title != '班级详情'" />
                        <div v-else>{{form.remark}}</div>
                    </el-form-item>
                    <el-form-item label="班级状态：">
                        <el-radio v-model="form.status" :label="0" v-if="title != '班级详情'">正常
                        </el-radio>
                        <el-radio v-model="form.status" :label="1" v-if="title != '班级详情'">停用
                        </el-radio>
                        <div v-else>{{form.statusShift}}</div>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer" v-if="title != '班级详情'">
                <el-button type="primary" icon="el-icon-check" @click="submitOperatin">确 定
                </el-button>
                <el-button @click="open = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    majorAdd, majorUpdate, majorDelete, majorList,
    departmentAdd, departmentUpdate, departmentTreeList, departmentList, departmentDelete,
    classesAdd, classesUpdate, classesListDelete, classesPage, classesDelete, classesImport

} from '@/api/yc_banji.js';
export default {
    name: 'BanJi',
    data() {
        return {
            title: '',
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                keyword: undefined,
            },
            departments: [],
            grades: [],
            majors: [],
            total: 0,
            showSearch: true,
            multiple: true,
            materialCates: [{ dictValue: 2, dictLabel: '成品' }, { dictValue: 1, dictLabel: '半成品' }, { dictValue: 0, dictLabel: '原材料' }],
            materialGroups: [],
            // 列信息
            columns: [
                { key: 1, label: `班级名称`, visible: true, prop: 'name' },
                { key: 2, label: `所属年级`, visible: true, prop: 'grade' },
                { key: 3, label: `人数`, visible: true, prop: 'num' },
                { key: 4, label: `班主任`, visible: true, prop: 'teacher' },
                { key: 5, label: `所属院系`, visible: true, prop: "departmentName" },
                { key: 6, label: `所属专业`, visible: true, prop: 'majorName' },
                { key: 7, label: `备注`, visible: true, prop: 'remark' },
                { key: 8, label: `班级状态`, visible: true, prop: 'statusShift' },
            ],
            tablelist: [{}],
            form: {},
            open: false,
            deptName: '',
            // 部门树选项
            deptOptions: undefined,
            defaultProps: {
                children: "majorList",
                label: "name"
            },
            nodeInfo: {},
            rules: {
                grade: [
                    { required: true, message: "请选择年级", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                departmentId: [
                    { required: true, message: "无院系", trigger: "blur" }
                ],
                num: [
                    { required: true, message: "请输入人数", trigger: "blur" }
                ],
                teacher: [
                    { required: true, message: "请输入班主任", trigger: "blur" }
                ],
            },
            ids: undefined
        };
    },

    components: {},

    computed: {},
    watch: {
        // 根据名称筛选部门树
        deptName(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted() {
        this.getTreeList()
        this.getList()
        // 院系
        departmentList().then(res => {
            console.log(res)
            this.departments = res.data
        })

        // 年级
        for (let index = 0; index < 22; index++) {
            this.grades.push(2010 + index)
        }

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
        handleAdd() {
            // 添加班级
            this.form = {}
            this.resetForm("form");
            this.title = '添加班级'
            this.open = true
        },
        handleInput() {

        },
        handleOut() {
            var a = document.createElement("a");
            let url = this.setParam(process.env.BASE_API + '/classes/export',this.queryParams)
            a.setAttribute("href", url);
            a.setAttribute("target", "_blank");
            a.click();
        },
        setParam(e,param) {
            if (param) {
                let url = e + '?';
                for (const propName of Object.keys(param)) {
                    const value = param[propName];
                    var part = encodeURIComponent(propName) + "=";
                    if (value !== null && typeof (value) !== "undefined") {
                        if (typeof value === 'object') {
                            for (const key of Object.keys(value)) {
                                let params = propName + '[' + key + ']';
                                var subPart = encodeURIComponent(params) + "=";
                                url += subPart + encodeURIComponent(value[key]) + "&";
                            }
                        } else {
                            url += part + encodeURIComponent(value) + "&";
                        }
                    }
                }
                url = url.slice(0, -1);
                return url
            }
        },
        handleListDelete() {
            let that = this
            this.$confirm('确认要删除这些班级吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return classesListDelete(that.ids);
            }).then(() => {
                this.msgSuccess("删除成功");
                this.getList();
            })
        },
        getTreeList() {
            // 查询树形表
            departmentTreeList().then(res => {
                console.log(res)
                this.deptOptions = res.data
            })
        },
        submitOperatin() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.title == '添加院系' || this.title == '编辑院系') {
                        if (this.form.id) {
                            departmentUpdate(this.form).then(res => {
                                this.msgSuccess("编辑成功");
                                this.getTreeList()
                                this.open = false
                                this.form = {}
                                this.resetForm("form");
                            })
                        } else {
                            departmentAdd(this.form).then(res => {
                                this.msgSuccess("添加成功");
                                this.getTreeList()
                                this.open = false
                                this.form = {}
                                this.resetForm("form");
                            })
                        }
                    } else if (this.title == '添加专业' || this.title == '编辑专业') {
                        if (this.form.id) {
                            majorUpdate(this.form).then(res => {
                                this.msgSuccess("编辑成功");
                                this.getTreeList()
                                this.open = false
                                this.form = {}
                                this.resetForm("form");
                            })
                        } else {
                            majorAdd(this.form).then(res => {
                                this.msgSuccess("添加成功");
                                this.getTreeList()
                                this.open = false
                                this.form = {}
                                this.resetForm("form");
                            })
                        }
                    } else if (this.title == '添加班级' || this.title == '编辑班级') {
                        if (this.form.id) {
                            classesUpdate(this.form).then(res => {
                                this.msgSuccess("编辑成功");
                                this.getTreeList()
                                this.getList()
                                this.open = false
                                this.form = {}
                                this.resetForm("form");
                            })
                        } else {
                            classesAdd(this.form).then(res => {
                                this.msgSuccess("添加成功");
                                this.getTreeList()
                                this.getList()
                                this.open = false
                                this.form = {}
                                this.resetForm("form");
                            })
                        }
                    }
                }
            });
        },
        getList() {
            classesPage(this.queryParams).then((res) => {
                // console.log(res)
                var list = res.data.list
                list.forEach(element => {
                    // 状态
                    if (element.status == 0) {
                        element.statusShift = '正常'
                    } else if (element.status == 1) {
                        element.statusShift = '停用'
                    }
                });
                this.tablelist = list
                this.total = res.data.total
            })
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleEdit(e) {
            this.resetForm("form");
            this.form = JSON.parse(JSON.stringify(e))
            this.title = '编辑班级'
            this.open = true
        },
        handleView(e) {
            this.resetForm("form");
            this.form = JSON.parse(JSON.stringify(e))
            this.title = '班级详情'
            this.open = true
        },
        handleDelete(e) {
            var that = this
            this.$confirm('是否要删除该院系吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return classesDelete(e.id);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            })
        },

        filterNode(value, data) {
            // 筛选节点
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        // 节点单击事件
        handleNodeClick(data) {
            if (data.type == 1) {
                if (data.id != this.queryParams.majorId) {
                    this.queryParams.majorId = data.id
                    this.queryParams.departmentId = undefined
                    this.getList();
                }
            } else if (data.type == 0) {
                if (data.id != this.queryParams.departmentId) {
                    this.queryParams.departmentId = data.id
                    this.queryParams.majorId = undefined
                    this.getList();
                }
            }
        },
        saveNodeData(e, a) {
            console.log(a)
            this.nodeInfo = JSON.parse(JSON.stringify(a))
        },
        handleCommand(command) {
            if (command == 'a') {
                this.form = {
                    departmentId: this.nodeInfo.id
                }
                this.resetForm("form");
                this.title = '添加专业'
                this.open = true
            } else if (command == 'b') {
                // 添加编辑
                this.resetForm("form");
                this.form = JSON.parse(JSON.stringify(this.nodeInfo))
                this.title = '编辑院系'
                this.open = true
            } else if (command == 'c') {
                // 删除
                var that = this
                this.$confirm('是否要删除该院系吗?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function () {
                    return departmentDelete(that.nodeInfo.id);
                }).then(() => {
                    this.getTreeList();
                    this.msgSuccess("删除成功");
                })
            }
            else if (command == 'd') {
                // 编辑
                this.resetForm("form");
                this.form = JSON.parse(JSON.stringify(this.nodeInfo))
                this.title = '编辑专业'
                this.open = true
            } else if (command == 'e') {
                // 删除
                var that = this
                this.$confirm('是否要删除该专业吗?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function () {
                    return majorDelete(that.nodeInfo.id);
                }).then(() => {
                    this.getTreeList();
                    this.msgSuccess("删除成功");
                })
            }
        },
        showDialog() {
            this.form = {}
            this.resetForm("form");
            this.open = true
            this.title = '添加院系'
        },
        xueyuanChange(e) {
            this.$set(this.form, 'majorId', '')
            // 专业
            majorList({ departmentId: e }).then(res => {
                // console.log(res)
                this.majors = res.data
            })
        },
        fileUpdateChange(res, fileList) {
            const file = fileList[fileList.length - 1].raw;
            const fileSize = file.size;
            let fileExtension = '';
            let fileName = '';
            if (file.name.lastIndexOf('.') > -1) {
                fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1);
                fileName = file.name.split('.')[0];
            }
            if (!fileSize) {
                this.$message.error('无效的文件，请重新选择！');
                return;
            }
            if (fileSize / 1024 / 1024 > 20) {
                this.$message.error('上传文件大小不能超过 10MB!');
                return;
            }
            if (fileExtension != 'xls' && fileExtension != 'xlsx') {
                this.$message.error('必须为excel文件!');
                return;
            }
            let params = new FormData();
            params.append('fileName', file);
            uploadFileToFast(params).then((res) => {
                console.log(res);
                classesImport({ url: res }).then(e => {
                    this.msgSuccess("上传成功");
                })
            });
            this.$refs.upload.clearFiles();
        }
    }
}

</script>
<style lang="scss" scoped>
::v-deep .el-date-editor {
    width: 180px;
}

::v-deep .el-input__inner {
    width: 100%;
}

.btmshowtitle {
    font-size: 15px;
    margin-top: 10px;
}
</style>
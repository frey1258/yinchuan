<!--  -->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch"
            label-width="68px" class="p10bg255" style="padding-bottom:0px;">
            <el-form-item label="关键字" prop="keyword">
                <el-input v-model="queryParams.keyword" placeholder="" clearable size="small"
                    @keyup.enter.native="handleQuery" />
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
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">
                        添加</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" icon="el-icon-delete" size="mini"
                        @click="handleListDelete">删除
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-col :span="1.5">
                        <el-upload action="#" :limit="1" :auto-upload="false"
                            :show-file-list="false"
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            ref="upload" :on-change="fileUpdateChange">
                            <el-button type="primary" icon="el-icon-download" size="mini">导入
                            </el-button>
                        </el-upload>
                    </el-col>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" icon="el-icon-upload2" size="mini" @click="handleOut">
                        导出
                    </el-button>
                </el-col>

                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"
                    :columns="columns"></right-toolbar>
            </el-row>

            <el-table :data="tablelist" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column v-for="(ii,ix) in columns" :label="ii.label" align="center"
                    :key="ix+'dw'" v-if="ii.visible" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="ii.label!='照片'">
                            {{scope.row[ii.prop]}}
                        </div>
                        <div class="demo-image__preview" v-else>
                            <el-image style="width: 100px; height: 100px" :src="scope.row[ii.prop]"
                                :preview-src-list="[scope.row[ii.prop]]">
                            </el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="200">
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

        <!-- 详细 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
                <el-form-item label="职工编号：" prop="no">
                    <el-input v-model="form.no" placeholder="6-20个字母或数字" clearable size="small"
                        v-if="title != '教职工信息'" />
                    <div v-else>{{form.no}}</div>
                </el-form-item>
                <el-form-item label="职工姓名：" prop="nickName">
                    <el-input v-model="form.nickName" placeholder="1-20个字符" clearable size="small"
                        v-if="title != '教职工信息'" />
                    <div v-else>{{form.nickName}}</div>
                </el-form-item>
                <el-form-item label="登录密码：" prop="password" v-if="title == '添加教职工'">
                    <el-input v-model="form.password" placeholder="1-20个字符" clearable
                        size="small" />
                </el-form-item>
                <el-form-item label="确认密码：" prop="surePassword" v-if="title == '添加教职工'">
                    <el-input v-model="form.surePassword" placeholder="1-20个字符" clearable
                        size="small" />
                </el-form-item>
                <!--  -->
                <el-form-item label="所属院系：">
                    <el-select v-model="form.departmentId" v-if="title != '教职工信息'" placeholder="全部"
                        size="small">
                        <el-option v-for="dict in departments" :key="dict.id" :label="dict.name"
                            :value="dict.id" />
                    </el-select>
                    <div v-else>{{form.departmentName}}</div>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model="form.phone" v-if="title != '教职工信息'" placeholder="1-20个字符"
                        clearable size="small" />
                    <div v-else>{{form.phone}}</div>
                </el-form-item>
                <el-form-item label="登录角色：" prop="roleIds">
                    <el-select v-model="form.roleIds" placeholder="全部" multiple clearable
                        size="small" v-if="title != '教职工信息'">
                        <el-option v-for="dict in roles" :key="dict.id" :label="dict.name"
                            :value="dict.id" />
                    </el-select>
                    <div v-else>{{form.roleNames}}</div>
                </el-form-item>
                <el-form-item label="照片：" prop="photo">
                    <el-row>
                        <div class="flr">
                            <div style="padding-top:10px;">
                                <el-upload class="avatar-uploader" action="" :auto-upload="false"
                                    ref="upload" :show-file-list="false" v-if="title != '教职工信息'"
                                    accept="image/*" :on-change="imageChange">
                                    <img v-if="imgurl" :src="imgurl" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <!-- <el-button type="primary" class="mt10"
                                    size="mini">查看事例
                                </el-button> -->
                                <img v-else :src="imgurl" class="avatar" />
                            </div>
                            <div style="padding-left:20px;">
                                <div>
                                    *照片质量影响人脸识别开门效果，请按要求上传：
                                </div>
                                <div>
                                    1.确保人脸完全在屏幕内，且轮廓清晰；
                                </div>
                                <div>
                                    2.光线合适，避免过强／过弱；
                                </div>
                                <div>
                                    3.不要美化图像，头发不要遮挡眉毛；
                                </div>
                                <div>
                                    4.为避免开门失败，请勿上传非本人图像；
                                </div>
                                <div>
                                    5.尺寸在500x500px-2000x2000px之间，质量小于1M。
                                </div>
                            </div>
                        </div>
                    </el-row>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="form.note" v-if="title != '教职工信息'" placeholder="1-20个字符"
                        clearable size="small" />
                    <div v-else>{{form.note}}</div>
                </el-form-item>
                <el-form-item label="账号状态：">
                    <el-radio v-model="form.status" :label="1" v-if="title != '教职工信息'">正常</el-radio>
                    <el-radio v-model="form.status" :label="0" v-if="title != '教职工信息'">停用</el-radio>
                    <div v-else>{{form.statusShift}}</div>
                </el-form-item>

            </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer" v-if="title != '教职工信息'">
                <el-button type="primary" icon="el-icon-check" @click="submitOperatin">确 定
                </el-button>
                <el-button @click="open = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { adminAdd, adminUpdate, adminPage, adminDelete, adminImportTeacher } from '@/api/yc_user.js';
import { departmentList } from '@/api/yc_banji.js';
import { roleList } from '@/api/yc_roles.js';
import { uploadFileToFast } from '@/api/utils.js';
export default {
    name: 'Teacher',
    data() {
        var checkPhoto = (rule, value, callback) => {
            if (!this.form.photo) {
                callback(new Error('请选择图片'));
                //  自定义校验 callback 必须被调用。
            } else {
                callback();
            }
        };
        var checkPassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入确认密码'));
                //  自定义校验 callback 必须被调用。
            } else if (value != this.form.password) {
                callback(new Error('两次输入的密码不对'));
            } else {
                callback();
            }
        };
        return {
            queryParams: {
                type: 1,
                pageNum: 1,
                pageSize: 10,
                keyword: undefined,
            },
            total: 0,
            showSearch: true,
            multiple: true,
            departments: [],
            roles: [],
            materialGroups: [],
            // 列信息
            columns: [
                { key: 1, label: `职工编号`, visible: true, prop: 'no' },
                { key: 2, label: `职工姓名`, visible: true, prop: 'nickName' },
                { key: 3, label: `所属院系`, visible: true, prop: 'departmentName' },
                { key: 4, label: `手机号`, visible: true, prop: 'phone' },
                { key: 5, label: `角色`, visible: true, prop: "roleNames" },
                { key: 6, label: `备注`, visible: true, prop: 'note' },
                { key: 7, label: `照片`, visible: true, prop: 'photo' },
                { key: 8, label: `照片状态`, visible: true, prop: 'photoStatusShift' },
                { key: 9, label: `账号状态`, visible: true, prop: 'statusShift' },
            ],
            tablelist: [],
            form: {
                type: 1
            },
            open: false,
            rules: {
                no: [
                    { required: true, message: "6-20个字母或数字", trigger: "blur" }
                ],
                nickName: [
                    { required: true, message: "请输入职工姓名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                surePassword: [
                    { required: true, validator: checkPassword, trigger: 'blur' }
                ],
                // photo: [
                //     { required: true, validator: checkPhoto, trigger: 'change' }
                // ]
            },
            ids: [],
            imgurl: '',
            title: ''
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.getList()
        // 院系
        departmentList().then(res => {
            console.log(res)
            this.departments = res.data
        })

        roleList().then(res => {
            console.log(res)
            this.roles = res.data
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
        handleListDelete() { },
        handleAdd() {
            this.form = { type: 1 }
            this.resetForm("form");
            this.open = true;
            this.title = "添加教职工";
        },

        handleInput() {

        },
        handleOut() {
            this.$confirm('确认要导出教职工吗?', "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                var a = document.createElement("a");
                let url = this.setParam(process.env.BASE_API + '/admin/exportTeacher', this.queryParams)
                a.setAttribute("href", url);
                a.setAttribute("target", "_blank");
                a.click();
            })
        },
        setParam(e, param) {
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
        getList() {
            // 获取分页列表
            adminPage(this.queryParams).then((res) => {
                console.log(res)
                var list = res.data.list
                list.forEach(element => {
                    if (element.photoStatus == 0) {
                        element.photoStatusShift = '待检验'
                    } else if (photoStatus.type == 1) {
                        element.photoStatusShift = '未通过'
                    } else if (photoStatus.type == 2) {
                        element.photoStatusShift = '已通过'
                    }
                    // 状态
                    if (element.status == 0) {
                        element.statusShift = '禁用'
                    } else if (element.status == 1) {
                        element.statusShift = '启用'
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
            this.form = JSON.parse(JSON.stringify(e))
            this.imgurl = this.form.photo
            this.resetForm("form");
            this.open = true;
            this.title = "修改教职工";
        },
        handleView(e) {
            this.form = JSON.parse(JSON.stringify(e))
            this.resetForm("form");
            this.form.surePassword = this.form.password
            this.imgurl = this.form.photo
            this.open = true;
            this.title = "教职工信息";
        },
        handleDelete(e) {
            this.$confirm('是否确认删除该老师吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return adminDelete(e.id);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            })
        },
        imageChange: function (res, fileList) {
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
            if (fileSize / 1024 / 1024 > 1) {
                this.$message.error('上传文件大小不能超过 1MB!');
                return;
            }
            if (fileExtension != 'jpg' && fileExtension != 'png' && fileExtension != 'jpeg') {
                this.$message.error('支持jpg,jpeg,png格式!');
                return;
            }
            let params = new FormData();
            params.append('fileName', file);
            let that = this
            const reader = new FileReader() // 创建读取文件对象
            reader.readAsDataURL(file) // 发起异步请求，读取文件
            reader.onload = function () { // 文件读取完成后
                that.imgurl = reader.result
            }
            uploadFileToFast(params).then((res) => {
                console.log(res);
                this.form.photo = res;
            });
            this.$refs.upload.clearFiles();
        },
        submitOperatin() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id) {
                        adminUpdate(this.form).then(res => {
                            this.msgSuccess("编辑成功");
                            this.getList()
                            this.open = false
                            this.form = {}
                            this.resetForm("form");
                        })
                    } else {
                        adminAdd(this.form).then(res => {
                            this.msgSuccess("添加成功");
                            this.getList()
                            this.open = false
                            this.form = {}
                            this.resetForm("form");
                        })
                    }
                }
            });
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
                adminImportTeacher({ url: res }).then(e => {
                    this.msgSuccess("上传成功");
                })
            });
            this.$refs.upload.clearFiles();
        }
    }
}

</script>
<style lang="scss" scoped>
.imagev {
    display: block;
    width: 60px;
    height: 60px;
}
::v-deep .el-date-editor {
    width: 100%;
}

::v-deep .el-input__inner {
    width: 100%;
}

.flr {
    display: flex;
}

.btmshowtitle {
    font-size: 15px;
    margin-top: 10px;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
    border: 0.5px solid #ccc;
    border-radius: 5px;
}

.avatar {
    width: 78px;
    height: 78px;
    background: red;
    display: block;
}
</style>
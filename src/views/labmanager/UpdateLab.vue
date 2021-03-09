<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
                    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                        <el-row>
                            <el-form-item label="实验室名称：" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="所在位置：" prop="location">
                                <el-input v-model="form.location"></el-input>
                            </el-form-item>
                            <el-form-item label="责任人：">
                                <el-select v-model="form.teacherId" placeholder="请选择">
                                    <el-option v-for="dict in teachers" :key="dict.id"
                                        :label="dict.username" :value="dict.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="使用率系数：">
                                <el-input v-model="form.useCoefficient" placeholder="1-10，影响使用统计">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="权重：">
                                <el-input v-model="form.weight" placeholder="1-99，数字越大，排序越靠前">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="实验室照片：">
                                <el-upload class="avatar-uploader" action="" :auto-upload="false"
                                    ref="upload" :show-file-list="false" accept="image/*"
                                    :on-change="imageChange">
                                    <img v-if="imgurl" :src="imgurl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div>支持jpg和png格式，小于2M，建议比例2:1</div>
                            </el-form-item>

                            <el-form-item label="备注：">
                                <el-input v-model="form.remark" placeholder="请输入备注" />
                            </el-form-item>

                        </el-row>
                    </el-form>
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
import {
    labAdd, labUpdate, labAddInnerUser, labAddOutUser,
    labRelatedDevice, labUpdatePassword, labList, labPage, labGet, labDelete
} from '@/api/yc_laboratory.js';
import { uploadFileToFast } from '@/api/utils.js';
import {adminUserList} from '@/api/yc_user.js';
export default {
    name: 'LabUpdate',
    data() {
        return {
            form: {
                materialAttributeList: []
            },
            rules: {
                name: [
                    { required: true, message: "请输入实验室名称", trigger: "blur" }
                ],
                location: [
                    { required: true, message: "请输入所在位置", trigger: "blur" }
                ],
            },
            teachers: [],
            imgurl:''
        };
    },

    components: {},

    computed: {},

    mounted() {
        labGet(this.$route.query.id).then(res=>{
            this.form = res.data
            this.imgurl = res.data.photo
        })

        adminUserList({type:1}).then(res=>{
            this.teachers = res.data
        })
     },

    created() { },

    methods: {
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    labUpdate(this.form).then(response => {
                        this.msgSuccess("编辑成功");
                        this.$router.go(-1)
                    });
                }
            });
        },
        cancel() { this.$router.go(-1) },
        lessonChange(e) {
            this.$router.push({ path: '/mybook/book/les' })
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
            if (fileSize / 1024 / 1024 > 2) {
                this.$message.error('上传文件大小不能超过 2MB!');
                return;
            }
            if (fileExtension != 'jpg' && fileExtension != 'png' && fileExtension != 'jpeg') {
                this.$message.error('支持jpg和png格式!');
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
                // this.msgSuccess("上传成功");
            });
            this.$refs.upload.clearFiles();
        },
    }
}

</script>
<style lang="scss" scoped>
.centerForm {
    max-width: 70%;
    margin: 0px auto;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 0.5px solid #ccc;
    border-radius: 5px;
}

::v-deep .avatar {
    width: 178px;
    height: 178px;
    background: red;
    display: block;
}
</style>
<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
                    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                        <el-row>
                            <el-form-item label="设备编号：" prop="code">
                                <el-input v-model="form.code"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类型：" prop="type">
                                <el-select v-model="form.type" placeholder="请选择">
                                    <el-option v-for="dict in types" :key="dict" :label="dict"
                                        :value="dict"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="IP：" prop="ip">
                                <el-input v-model="form.ip"></el-input>
                            </el-form-item>
                            <el-form-item label="供应商：">
                                <el-input v-model="form.supplier"></el-input>
                            </el-form-item>
                            <el-form-item label="型号：">
                                <el-input v-model="form.model"></el-input>
                            </el-form-item>
                            <el-form-item label="铭牌号：">
                                <el-input v-model="form.nameplate"></el-input>
                            </el-form-item>
                            <el-form-item label="出厂日期：">
                                <el-date-picker v-model="form.date" type="date" format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd" placeholder="选择出厂日期：">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="上传附件：">
                                <el-upload action="#" :limit="1" :auto-upload="false"
                                    :show-file-list="false" accept="text/plain" ref="upload"
                                    :on-change="codeUpdateChange">
                                    <el-button type="primary" size="small">点击上传 </el-button>
                                </el-upload>
                                <span style="margin-left:10px;">*单个附件需小于20M</span>
                            </el-form-item>
                            <el-form-item label="已传附件：" v-if="form.files.length">
                                <div v-for="(ii,ix) in form.files" :key="ix" class="flx">
                                    <i class="el-icon-s-order"></i>
                                    <span  style="margin-left:15px">{{ii.name}}</span>
                                    <i class="el-icon-close" style="margin-left:15px" @click="deleteFile(ii,ix)"></i>
                                </div>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <el-input v-model="form.remark" placeholder="请输入描述" />
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
    deviceAdd,
    deviceUpdate,
    deviceList,
    devicePage, deviceGet,
    deviceDelete
} from '@/api/yc_device.js';
import { uploadFileToFast } from '@/api/utils.js';
export default {
    name: 'DeviceUpdate',
    data() {
        return {
            form: {
                files: []
            },
            rules: {
                code: [
                    { required: true, message: "请输入设备编码", trigger: "blur" }
                ],
                type: [
                    { required: true, message: "请选择设备类型", trigger: "blur" }
                ],
                ip: [
                    { required: true, message: "请输入IP", trigger: "blur" }
                ],
            },
            types: ['基础试验台', '三轴', '过程控制', '柔性产线', '微电网', '门禁', '摄像头',],
            statusOptions: [{ dictValue: 0, dictLabel: '是' }, { dictValue: 1, dictLabel: '否' }],
            materialGroups: [{ id: 2, name: '成品' },],
            documents: [],
            devices: []
        };
    },

    components: {},

    computed: {},

    mounted() { 
        deviceGet(this.$route.query.id).then(res=>{
            console.log(res)
            this.form = res.data
            if (!res.data.files) {
                this.form.files = []
            }
        })
    },

    created() { },

    methods: {
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        deviceUpdate(this.form).then(response => {
                            this.msgSuccess("修改成功");
                             this.$router.go(-1)
                        });
                    } else {
                        deviceAdd(this.form).then(response => {
                            this.msgSuccess("添加成功");
                            this.$router.go(-1)
                        });
                    }
                }
            });
        },
        cancel() { this.$router.go(-1) },
        lessonChange(e) {
            this.$router.push({ path: '/mybook/book/les' })
        },
        codeUpdateChange(res, fileList) {
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
                this.$message.error('上传文件大小不能超过 20MB!');
                return;
            }
            if (fileExtension != 'txt') {
                this.$message.error('必须为txt文件类型!');
                return;
            }
            let params = new FormData();
            params.append('fileName', file);
            uploadFileToFast(params).then((res) => {
                console.log(res);
                let fileP = {
                    name: fileName,
                    size: this.filterSize(fileSize),
                    type: fileExtension,
                    url: res,
                };
                this.form.files.push(fileP);
                // this.msgSuccess("上传成功");
            });
            this.$refs.upload.clearFiles();
        },
        deleteFile(i,x){
            this.form.files.splice(x,1)
        }
    }
}

</script>
<style lang="scss" scoped>
.centerForm {
    max-width: 70%;
    margin: 0px auto;
}

::v-deep .el-date-editor {
    width: 100%;
}

::v-deep .el-input__inner {
    width: 100%;
}
</style>
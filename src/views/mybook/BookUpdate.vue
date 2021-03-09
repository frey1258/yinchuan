<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
                    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                        <el-row>
                            <el-form-item label="预约实验室：" prop="labId">
                                <el-select v-model="form.labId" :disabled="form.status==2"
                                    placeholder="请选择" @change="labChange">
                                    <el-option v-for="dict in labs" :key="dict.id"
                                        :label="dict.name" :value="dict.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="预约课节：" prop="aaa">
                                <el-select v-model="form.aaa" placeholder=""
                                    @click.native="lessonFocus">
                                    <el-option v-for="dict in lessons" :key="dict.id"
                                        :label="dict.name" :value="dict.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="已选择：">
                                <div v-for="(ii,ix) in form.appointmentLessons" :key="ix"
                                    v-if="form.appointmentLessons || form.appointmentLessons.length">
                                    {{ii.name}}
                                </div>
                                <div v-else>
                                    {{form.lessonName}}
                                </div>
                            </el-form-item>
                            <el-form-item label="课程名称：" prop="name">
                                <el-input v-model="form.name" placeholder="请填写课程名称" />
                            </el-form-item>
                            <el-form-item label="使用目的：" prop="purpose">
                                <el-select v-model="form.purpose" placeholder="请选择">
                                    <el-option v-for="dict in purposes" :key="dict" :label="dict"
                                        :value="dict"></el-option>
                                </el-select>
                                <el-input v-model="form.description" placeholder="请备注说明"
                                    class="mt10" />
                            </el-form-item>
                            <el-form-item label="上课教师：" prop="teacherIds">
                                <el-select v-model="form.teacherIds" multiple placeholder="请选择">
                                    <el-option v-for="dict in teachers" :key="dict.id"
                                        :label="dict.username" :value="dict.id"></el-option>
                                </el-select>
                                <el-input v-model="form.teacherDescription" placeholder="请备注说明"
                                    class="mt10" />
                            </el-form-item>
                            <el-form-item label="上课班级：" prop="classIds">
                                <el-select v-model="form.classIds" multiple placeholder="请选择">
                                    <el-option v-for="dict in classes" :key="dict.id"
                                        :label="dict.name" :value="dict.id"></el-option>
                                </el-select>
                                <el-input v-model="form.classDescription" placeholder="请备注说明"
                                    class="mt10" />
                            </el-form-item>
                            <el-form-item label="上传附件：">
                                <el-upload action="#" :limit="1" :auto-upload="false"
                                    :show-file-list="false" ref="upload"
                                    :on-change="codeUpdateChange">
                                    <el-button type="primary" size="small">点击上传 </el-button>
                                </el-upload>
                                <span style="margin-left:10px;">*单个附件需小于20M</span>
                            </el-form-item>
                            <el-form-item label="已传附件：" v-if="form.attachmentList.length">
                                <div v-for="(ii,ix) in form.attachmentList" :key="ix" class="flx">
                                    <i class="el-icon-s-order"></i>
                                    <span style="margin-left:15px">{{ii.name}}</span>
                                    <i class="el-icon-close" style="margin-left:15px"
                                        @click="deleteFile(ii,ix)"></i>
                                </div>
                            </el-form-item>
                            <el-form-item label="附件对学生可见：" prop="visible">
                                <el-radio v-model="form.visible" :label="1">
                                    不可见</el-radio>
                                <el-radio v-model="form.visible" :label="0">
                                    可见</el-radio>
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
import { labList } from '@/api/yc_laboratory.js';
import { adminUserList } from '@/api/yc_user.js';
import { classesList } from '@/api/yc_banji.js';
import { uploadFileToFast } from '@/api/utils.js';
import { appointmentAdd, appointmentUpdate, appointmentGet } from '@/api/yc_book.js';
export default {
    name: 'BookUpdate',
    data() {
        var checkLesson = (rule, value, callback) => {
            if (!this.form.appointmentLessons.length) {
                callback(new Error('请选择课节'));
                //  自定义校验 callback 必须被调用。
            } else {
                callback();
            }
        };
        var checkPurpose = (rule, value, callback) => {
            if (!this.form.purpose && !this.form.description) {
                callback(new Error('请补充使用目的'));
            } else {
                callback();
            }
        };
        var checkTeacher = (rule, value, callback) => {
            if (!this.form.teacherIds.length && !this.form.teacherDescription) {
                callback(new Error('请补充上课教师'));
            } else {
                callback();
            }
        };
        var checkClass = (rule, value, callback) => {
            if (!this.form.classIds.length && !this.form.classDescription) {
                callback(new Error('请补充上课班级'));
            } else {
                callback();
            }
        };
        return {
            form: {
                appointmentLessons: [],
                attachmentList: [],
                teacherIds: [],
                classIds: []
            },
            rules: {
                labId: [
                    { required: true, message: "请输入实验室", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请填写课程名称", trigger: "blur" }
                ],
                aaa: [
                    { required: true, validator: checkLesson, trigger: 'change' }
                ],
                purpose: [
                    { required: true, validator: checkPurpose, trigger: 'blur' }
                ],
                teacherIds: [
                    { required: true, validator: checkTeacher, trigger: 'blur' }
                ],
                classIds: [
                    { required: true, validator: checkClass, trigger: 'blur' }
                ],
            },
            materialCates: [{ dictValue: 2, dictLabel: '成品' }, { dictValue: 1, dictLabel: '半成品' }, { dictValue: 0, dictLabel: '原材料' }],
            statusOptions: [{ dictValue: 0, dictLabel: '是' }, { dictValue: 1, dictLabel: '否' }],
            materialGroups: [{ id: 2, name: '成品' },],
            documents: [],
            devices: [],
            labs: [],
            lessons: [],
            purposes: ['其他', '实训', '实验', '实习', '开会', '答辩', '大赛', '学科竞赛', '创新创业', '教学辅导',],
            teachers: [],
            classes: []
        };
    },

    components: {},

    computed: {},

    mounted() {
        labList().then(res => {
            this.labs = res.data
        })

        adminUserList({ type: 1 }).then(res => {
            this.teachers = res.data
        })

        classesList().then(res => {
            this.classes = res.data
        })

        let form = window.localStorage.getItem('form')
        if (form) {
            this.form = JSON.parse(form)
        } else {
            appointmentGet(this.$route.query.id).then(res => {
                console.log(res)
                this.form = res.data  
                this.form.appointmentLessons = res.data.appointmentLessons || []
                this.form.attachmentList = res.data.attachmentList || []
                this.form.teacherIds = res.data.teacherIds || []
                this.form.classIds = res.data.classIds || []
                // 加存储
                // window.localStorage.setItem('lid', this.form.labId)
                // window.localStorage.setItem('aaa', JSON.stringify(this.form.appointmentLessons))
                // this.createSelectList()
            })
        }

        let selectList = window.localStorage.getItem('aaa')
        if (selectList) {
            selectList = JSON.parse(selectList)
            this.form.appointmentLessons = selectList
            this.createSelectList()
        }
    },

    created() { },

    methods: {
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        appointmentUpdate(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            window.localStorage.removeItem('aaa')
                            window.localStorage.removeItem('form')
                            this.$router.go(-1)
                        });
                    } else {
                        appointmentAdd(this.form).then(response => {
                            this.msgSuccess("新增成功");
                            this.$router.go(-1)
                        });
                    }

                }
            });
        },
        cancel() {
            this.$router.go(-1)
            window.localStorage.removeItem('aaa')
            window.localStorage.removeItem('form')
        },
        labChange(e) {
            window.localStorage.removeItem('aaa')
            this.form.appointmentLessons = []
        },
        lessonFocus(e) {
            if (this.form.status == 2) {
                return
            }
            if (this.form.labId) {
                window.localStorage.setItem('form', JSON.stringify(this.form))
                this.$router.push({ path: '/mybook/book/les', query: { labId: this.form.labId } })
            } else {
                this.$message.error("请先选择实验室")
            }
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
                this.form.attachmentList.push(fileP);
                // this.msgSuccess("上传成功");
            });
            this.$refs.upload.clearFiles();
        },
        deleteFile(i, x) {
            this.form.attachmentList.splice(x, 1)
        },
        createSelectList() {
            // 合并
            // 先排序
            let showLessons = this.form.appointmentLessons || []
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
                        i = j - 1
                        // 判断是否是多个，多个的
                        if (s == e) {
                            newArr.push({ name: qian.xueqiName + '/' + '第' + qian.weekNo + '周' + '/' + '星期' + this.digital2Chinese(qian.week, 'week') + '/' + '第' + s + '节' })
                        } else {
                            newArr.push({ name: qian.xueqiName + '/' + '第' + qian.weekNo + '周' + '/' + '星期' + this.digital2Chinese(qian.week, 'week') + '/' + '第' + s + '-' + e + '节' })
                        }

                        break
                    }
                }
            }
            this.newArr = JSON.parse(JSON.stringify(newArr))

        },
        digital2Chinese(num, identifier) {
            const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
        },
    }
}

</script>
<style lang="scss" scoped>
.centerForm {
    max-width: 70%;
    margin: 0px auto;
}
</style>
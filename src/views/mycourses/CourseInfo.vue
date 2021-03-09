<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <div class="normalT1 mb20">课程详情</div>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="8">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-row>
                            <el-form-item label="上课实验室：">
                                {{form.labName}}
                            </el-form-item>
                            <el-form-item label="实验室位置：">
                                {{form.labPosition}}
                            </el-form-item>
                            <el-form-item label="上课时间：" >
                                {{form.startTime}}
                                <div v-for="(ii,ix) in form.appointmentLessons" :key="ix" class="flx">
                                    {{ii.name}}
                                </div>
                            </el-form-item>
                            <el-form-item label="课程状态："  >
                                {{form.lessonStatus}}
                            </el-form-item>
                            <el-form-item label="课程名称：">
                                {{form.name}}
                            </el-form-item>
                            <el-form-item label="使用目的：" >
                                {{form.purpose}}
                            </el-form-item>
                            <el-form-item label="上课教师：">
                                {{form.teacherNames}}
                            </el-form-item>
                            <el-form-item label="上课班级：">
                                {{form.classesNames}}
                            </el-form-item>
                            <el-form-item label="附件：">
                                <div v-for="(ii,ix) in form.attachmentList" :key="ix" class="flx">
                                    {{ii.name}}
                                </div>
                            </el-form-item>
                            <el-form-item label="对学生可见：" prop="status">
                                {{form.visible == 0?'可见':''}}
                                {{form.visible == 1?'不可见':''}}
                            </el-form-item>
                            <el-form-item label="备注：">
                                {{form.remark}}
                            </el-form-item>

                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
        </div>
       
    </div>
</template>

<script>
import { appointmentAdd, appointmentUpdate, appointmentGet } from '@/api/yc_book.js';
export default {
    name: 'BookInfo',

    data() {
        return {
            form: {
                attachmentList:[],
                appointmentLessons:[],
                visible:0
            },
            materialCates: [],
            materialGroups: [],
            subStatuses: [{ id: 0, name: '待审核' },
            { id: 1, name: '已通过' },
            { id: 2, name: '已驳回' },
            { id: 3, name: '已撤销' }],
            lessonStatuses: [{ id: 0, name: '未开始' },
            { id: 1, name: '进行中' },
            { id: 2, name: '已结束' },],
        };
    },

    components: {},

    computed: {},

    mounted() {
        appointmentGet(this.$route.query.id).then(res => {
            this.form = res.data || {}
            this.subStatuses.forEach(e => {
                if (e.id == element.status) {
                    this.form.statusShift = e.name
                }
            });
        })
    },

    created() { },

    methods: {}
}

</script>
<style>
</style>
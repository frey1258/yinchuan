<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <el-form :model="queryParams" ref="queryForm" label-width="118px">
                <el-form-item label="预约自动审核">
                    <el-switch v-model="queryParams.automaticReview" active-color="#13ce66"
                        inactive-color="#aaaaaa">
                    </el-switch>
                </el-form-item>
                <!-- <el-form-item label="允许多端登录">
                    <el-switch v-model="queryParams.moreLogin" active-color="#13ce66"
                        inactive-color="#AAAAAA">
                    </el-switch>
                </el-form-item> -->
                <!-- <el-form-item label="提前进出时间">
                    <div class="fl">
                        <el-select v-model="queryParams.aheadTime" placeholder="" size="small">
                            <el-option v-for="dict in times" :key="dict" :label="dict"
                                :value="dict" />
                        </el-select>
                        <div class="innerClass">分钟</div>
                    </div>
                </el-form-item>
                <el-form-item label="延长进出时间">
                    <div class="fl">
                        <el-select v-model="queryParams.delayTime" placeholder="" size="small">
                            <el-option v-for="dict in times" :key="dict" :label="dict"
                                :value="dict" />
                        </el-select>
                        <div class="innerClass">分钟</div>
                    </div>
                </el-form-item> -->

            </el-form>
            <div class="fle btnv">
                <el-button type="primary"   icon="el-icon-check" size="mini"
                @click="handleSet">设置
            </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { advancedSettingsGet, advancedSettingsPut } from '@/api/login.js';
export default {
    name: '',
    data() {
        return {
            queryParams: {},
            times: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
        };
    },

    components: {},

    computed: {},

    mounted() {
        advancedSettingsGet().then(res => {
            console.log(res)
            this.queryParams = res.data
        })
    },

    created() { },

    methods: {
        handleSet() {
            let that = this
            this.$confirm('是否确认修改设置吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return advancedSettingsPut(that.queryParams);
            }).then(() => {
                this.msgSuccess("修改成功");
            })
        }
    }
}

</script>

<style lang="scss" scoped>
.el-select {
    width: 80px;
}

::v-deep .el-input__inner {
    width: 80px;
}

.fl {
    display: flex;
    align-items: center;
}

.innerClass {
    margin-left: 15px;
}

.btnv {
    padding-top: 20px;
    border-top: 0.5px solid #ccc;
}
</style>
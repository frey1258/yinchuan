<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <div class="normalT1 mb20">基础信息</div>
            <el-row :gutter="50" type="flex" justify="center">
                <el-col :span="8" :xs="24" class="cellv">
                    <div>实验室名称：<span>数字实验室</span></div>
                    <div>所在位置：<span>数字实验室</span></div>
                    <div>责任人：<span>数字实验室</span></div>
                    <div>使用率系数：<span>数字实验室</span></div>
                </el-col>
                <el-col :span="8" :xs="24" class="cellv">
                    <div>权限：<span>数字实验室</span></div>
                    <div>备注：<span>数字实验室</span></div>
                    <div>学期当前使用率：<span>数字实验室</span></div>
                    <div>学期当前预约率：<span>数字实验室</span></div>
                </el-col>
                <el-col :span="8" :xs="24" class="cellv">
                    <div>当前使用情况：<span>数字实验室</span></div>
                    <div>上课老师：<span>数字实验室</span></div>
                    <div>上课班级：<span>数字实验室</span></div>
                    <div>使用目的：<span>数字实验室</span></div>
                </el-col>
            </el-row>
        </div>
        <!--  -->
        <el-row class="mt20" :gutter="20">
            <el-col :span="8" :xs="24">
                <div class="p10bg255">
                    <img src="" class="imagev">
                </div>
            </el-col>
            <el-col :span="16" :xs="24" v-if="deviceType==0">
                <!-- 基础实验台 -->
                <div class="p10bg255">
                    <div class="normalT1 mb20">设备数据</div>
                    <el-row :gutter="50" type="flex" justify="center">
                        <el-col :span="12" :xs="24" class="cellv">
                            <div><span class="leftt">当前PLC状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">使能状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">运行状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">访问权限：</span><span>数字实验室</span></div>
                            <div><span class="leftt">PLC程序名：</span><span>数字实验室</span></div>
                            <div><span class="leftt">恒定扫描模式：</span><span>数字实验室</span></div>
                            <div><span class="leftt">CPU内部程序数：</span><span>数字实验室</span></div>
                        </el-col>
                        <el-col :span="12" :xs="24" class="cellv">
                            <div><span class="leftt">PLC FAULT：</span><span>数字实验室</span></div>
                            <div><span class="leftt">空硬件组态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">存在不可恢复错误：</span><span>数字实验室</span></div>
                            <div><span class="leftt">IO FAULT：</span><span>数字实验室</span></div>
                            <div><span class="leftt">内存溢出：</span><span>数字实验室</span></div>
                            <div><span class="leftt">上一次任务的扫描时长：</span><span>数字实验室</span></div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="16" :xs="24" v-else-if="deviceType==1">
                <!-- 三轴实验台 -->
                <div class="p10bg255">
                    <div class="normalT1 mb20">设备数据</div>
                    <el-row :gutter="50" type="flex" justify="center">
                        <el-col :span="12" :xs="24" class="cellv">
                            <div><span class="leftt">当前PLC状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">使能状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">运行状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">CPU访问权限：</span><span>数字实验室</span></div>
                            <div><span class="leftt">PLC程序名：</span><span>数字实验室</span></div>
                            <div><span class="leftt">PLC FAULT：</span><span>数字实验室</span></div>
                            <div><span class="leftt">IO FAULT：</span><span>数字实验室</span></div>
                            <el-row class="mt20">
                                <el-button type="primary" size="small">启动</el-button>
                                <el-button type="warning" size="small">复位</el-button>
                                <el-button type="danger" size="small">停止</el-button>
                            </el-row>
                        </el-col>
                        <el-col :span="12" :xs="24" class="cellv">
                            <div><span class="leftt">X轴实际位置：</span><span>数字实验室</span></div>
                            <div><span class="leftt">Y轴实际位置：</span><span>数字实验室</span></div>
                            <div><span class="leftt">Z轴实际位置：</span><span>数字实验室</span></div>
                            <div><span class="leftt">工作模式：</span><span>数字实验室</span></div>
                            <div class="p10bg255 mt20">
                                <el-table :data="tablelist">
                                    <el-table-column type="selection" width="50" align="center" />
                                    <el-table-column label="报警信息" prop="aa" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column label="报警类型" prop="aa" show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="16" :xs="24" v-else-if="deviceType==2">
                <!-- 过程控制 -->
                <div class="p10bg255">
                    <div class="normalT1 mb20">设备数据</div>
                    <el-row :gutter="50" type="flex" justify="center">
                        <el-col :span="12" :xs="24" class="cellv">
                            <div><span class="leftt">当前PLC状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">使能状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">运行状态：</span><span>数字实验室</span></div>
                            <div><span class="leftt">CPU访问权限：</span><span>数字实验室</span></div>
                            <div><span class="leftt">PLC程序名：</span><span>数字实验室</span></div>
                            <div><span class="leftt">PLC FAULT：</span><span>数字实验室</span></div>
                            <div><span class="leftt">IO FAULT：</span><span>数字实验室</span></div>
                            <div>
                                <span class="leftt">实验通道选择：</span>
                                <el-select v-model="socekt" placeholder="请选择">
                                    <el-option v-for="dict in materialGroups" :key="dict.id"
                                        :label="dict.name" :value="dict.id"></el-option>
                                </el-select>
                            </div>
                            <el-row class="mt20">
                                <el-button type="primary" size="small">启动</el-button>
                                <el-button type="danger" size="small">停止</el-button>
                            </el-row>
                        </el-col>
                        <el-col :span="12" :xs="24" class="cellv">
                            <div><span class="leftt">X轴实际位置：</span><span>数字实验室</span></div>
                            <div><span class="leftt">Y轴实际位置：</span><span>数字实验室</span></div>
                            <div><span class="leftt">Z轴实际位置：</span><span>数字实验室</span></div>
                            <div><span class="leftt">工作模式：</span><span>数字实验室</span></div>
                            <div class="p10bg255 mt20">
                                <el-table :data="tablelist">
                                    <el-table-column type="selection" width="50" align="center" />
                                    <el-table-column label="报警信息" prop="aa" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column label="报警类型" prop="aa" show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="16" :xs="24" v-else-if="deviceType==3">
                <!-- 摄像头 -->
                <div class="p10bg255">
                    <div class="normalT1 mb20">设备数据</div>
                </div>
            </el-col>
            <el-col :span="16" :xs="24" v-else-if="deviceType==4">
                <!-- 门禁 -->
                <div class="p10bg255">
                    <div class="normalT1 mb20">设备数据</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            tablelist: [],
            deviceType:3,
            socekt:'',
            materialGroups:[]
        };
    },

    components: {},

    computed: {},

    mounted() { },

    created() { },

    methods: {}
}

</script>

<style lang="scss" scoped>
.imagev {
    display: block;
    height: 200px;
    background: wheat;
}

.cellv {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 14px;
    min-height: 180px;
}

.leftt {
    min-width: 100px;
}
</style>
<!--  -->
<template>
    <div class="app-container home">
        <el-row :gutter="10">
            <el-col :span="6" :xs="24">
                <div class="p10bg255 topcell">
                    <div class="neirv">
                        <div class="leffv">
                            <div class="tsdf2">{{form.labCount}}</div>
                            <div class="betvew">实验室总数</div>
                        </div>
                        <i class="iconfont iconfangjianweihu icons"></i>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :xs="24">
                <div class="p10bg255 topcell" style="background: #F7BA2A;">
                    <div class="neirv">
                        <div class="leffv">
                            <div class="tsdf2">{{form.deviceCount}}</div>
                            <div class="betvew">设备总数</div>
                        </div>
                        <i class="iconfont iconzhinengyouhua icons"></i>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :xs="24">
                <div class="p10bg255 topcell" style="background: #409EFF;">
                    <div class="neirv">
                        <div class="leffv">
                            <div class="tsdf2">{{form.userCount}}</div>
                            <div class="betvew">用户总数</div>
                        </div>
                        <i class="iconfont iconyonghu1 icons"></i>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :xs="24">
                <div class="p10bg255 topcell" style="background: #19BB69;">
                    <div class="neirv">
                        <div class="leffv">
                            <div class="tsdf2">{{form.classesCount}}</div>
                            <div class="betvew">班级总数</div>
                        </div>
                        <i class="iconfont iconbanji icons"></i>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!--  -->
        <el-row :gutter="10" style="margin:0px;margin-top:20px;">
            <el-col :span="6" :xs="24">
                <div class="p10bg255">
                    <div class="normalT1 mb20">预约管理</div>
                    <div class="btlsetv">
                        <i class="iconfont iconshenqing sve"></i>
                        <div class="raigaewgb">
                            <div class="rgts">已申请</div>
                            <div class="teve">{{form.appointmentCount}}</div>
                        </div>
                    </div>
                    <div class="btlsetv">
                        <i class="iconfont icondaishenhe sve"></i>
                        <div class="raigaewgb">
                            <div class="rgts">待审核</div>
                            <div class="teve" style="color:#FF494A;">{{form.toAuditCount}}</div>
                        </div>
                    </div>
                    <div class="btlsetv">
                        <i class="iconfont icontongguo sve"></i>
                        <div class="raigaewgb">
                            <div class="rgts">已通过</div>
                            <div class="teve">{{form.passCount}}</div>
                        </div>
                    </div>
                    <div class="btlsetv">
                        <i class="iconfont iconbohui sve"></i>
                        <div class="raigaewgb">
                            <div class="rgts">已驳回</div>
                            <div class="teve">{{form.refuseCount}}</div>
                        </div>
                    </div>
                    <div class="btlsetv">
                        <i class="iconfont iconchexiao sve"></i>
                        <div class="raigaewgb">
                            <div class="rgts">已撤销</div>
                            <div class="teve">{{form.revertCount}}</div>
                        </div>
                    </div>
                </div>

            </el-col>
            <el-col :span="18" :xs="24">
                <div class="p10bg255 dsga">
                    <el-carousel arrow="never" :autoplay="false" ref="carusel"
                        indicator-position="none" height="120px">
                        <el-carousel-item v-for="(item,index) in labList" :key="index" class="fase">
                            <div class="cgwse" v-for="(i,ix) in item" :key="ix">
                                <div class="vsdgfe">{{i.name}}</div>
                                <div class="eve">
                                    <div class="gv3">
                                        <div class="hg8">使用率</div>
                                        <div class="hv23">78%</div>
                                    </div>
                                    <el-progress type="circle" :stroke-width="8" :width="50"
                                        :height="50" color="#409EFF" :percentage="78"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <div class="dfe1" @click="prev">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <div class="dfe2" @click="next">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div class="p10bg255 mt20">
                    <div class="normalT1 mb20">登录日志</div>
                    <div class="fls" style="align-items: flex-start;">
                        <el-form :model="queryParams" ref="queryForm" :inline="true"
                            label-width="68px" style="padding-bottom:0px;">
                            <el-form-item label="起止日期">
                                <el-date-picker v-model="queryParams.sta" format="yyyy-MM-dd"
                                    value-format='yyyy-MM-dd' size="mini" range-separator="至"
                                    type="daterange" start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" size="mini"
                                    @click="handleQuery">搜索</el-button>
                                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" icon="el-icon-upload2" size="mini"
                            @click="handleOut">导出</el-button>
                    </div>
                    <el-table :data="logTableList">
                        <el-table-column v-for="(ii,ix) in columns" :label="ii.label" align="center"
                            :key="ix+'dw'" v-if="ii.visible" :prop="ii.prop" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
                        :limit.sync="queryParams.pageSize" @pagination="getList"></pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {
    appointmentHomePageData
    , adminloginlogPage,
    adminloginlogExport
} from '@/api/yc_book.js';
export default {
    name: '',
    data() {
        return {
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                startTime: undefined,
                endTime: undefined,
                sta: []
            },
            tablelist: [],
            total: 0,
            columns: [
                { key: 1, label: `登录编号`, visible: true, prop: 'code' },
                { key: 2, label: `登录用户`, visible: true, prop: 'type' },
                { key: 3, label: `登录地址`, visible: true, prop: 'ip' },
                { key: 4, label: `登录地点`, visible: true, prop: 'supplier' },
                { key: 5, label: `登录端`, visible: true, prop: "model" },
                { key: 6, label: `登录状态`, visible: true, prop: 'nameplate' },
                { key: 7, label: `操作信息`, visible: true, prop: 'productionTime' },
                { key: 8, label: `登录时间`, visible: true, prop: 'remark' },
            ],
            form: {

            },
            labList: [],
            logTableList: []
        };
    },

    components: {},

    computed: {},

    mounted() {
        appointmentHomePageData().then(res => {
            this.form = res.data
            if (this.form.labCount) {
                this.labList = Datas(this.form.labList, 5)
            }
        })
        function Datas(data, num) {
            let index = 0
            let array = []
            while (index < data.length) {
                array.push(data.slice(index, index += num));
            }
            return array;
        }
        var now = new Date()
        var year = now.getFullYear() // 得到年份
        var month = now.getMonth() // 得到月份
        var date = now.getDate() // 得到日期
        month = month + 1
        month = month.toString().padStart(2, '0')
        date = date.toString().padStart(2, '0')
        var defaultDate = `${year}-${month}-${date}`
        this.queryParams.sta = [defaultDate, defaultDate]
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
        getList() {
            if (this.queryParams.sta) {
                this.queryParams.startTime = this.queryParams.sta[0]
                this.queryParams.endTime = this.queryParams.sta[1]
            }
            adminloginlogPage(this.queryParams).then(res => {
                console.log(res)
                this.logTableList = res.data.list
                this.total = res.data.total
            })
        },
        prev() {
            this.$refs.carusel.prev()
        },
        next() {
            this.$refs.carusel.next()
        },
        handleOut() {
            let param = {
                startTime: this.queryParams.sta[0],
                endTime: this.queryParams.sta[1],
            }
 
            var a = document.createElement("a");
            a.setAttribute("href", process.env.BASE_API +'/adminloginlog/export?startTime=' + this.queryParams.sta[0] + '&endTime=' + this.queryParams.sta[1]);
            a.setAttribute("target", "_blank");
            a.click();
        }
    }
}

</script>


<style lang="scss" scoped>
.topcell {
    width: 100%;
    color: white;
    background: #ff494a;
    padding: 30px;
    .neirv {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 5px solid white;
        .leffv {
            .tsdf2 {
                font-weight: bold;
                font-size: 30px;
            }
            .betvew {
                padding-top: 20px;
                font-weight: 500;
                font-size: 15px;
            }
        }
        .icons {
            font-size: 70px;
        }
    }
}

.btlsetv {
    margin-top: 15px;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    .sve {
        width: 90px;
        height: 90px;
        min-width: 90px;
        background: #0b623d;
        line-height: 90px;
        text-align: center;
        font-weight: 500;
        font-size: 40px;
        color: white;
    }
    .raigaewgb {
        background: #dfeae5;
        height: 90px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #333;
        .teve {
            padding-top: 10px;
        }
    }
}

.dsga {
    padding: 0px 20px;
    overflow: hidden;
    position: relative;
    .dfe1 {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: #666;
        border-right: 0.05px solid #ddd;
        cursor: pointer;
    }
    .dfe2 {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: #666;
        border-left: 0.05px solid #ddd;
        cursor: pointer;
    }
}

.fase {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow-y: auto;
    padding: 0px;
    margin: 0px;
}

.cgwse {
    border-top: 1px solid #409eff;
    padding: 0px 15px;
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .vsdgfe {
        color: #666;
        font-size: 15px;
    }
    .eve {
        padding-top: 10px;
        display: flex;
        align-items: center;
        // justify-content: center;
        .gv3 {
            padding-right: 20px;
            .hg8 {
                color: #999;
                font-size: 12px;
            }
            .hv23 {
                padding-top: 5px;
                color: #333;
                font-size: 25px;
                font-weight: 500;
            }
        }
    }
}

::v-deep .el-progress__text {
    display: none;
}
</style>
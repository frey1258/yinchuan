<!--  -->
<template>
    <div class="dimg">
        <img :src="imgUrl" class="imgs" v-if="imgUrl">
        <div v-else class="neirong">
            <div class="topv fls">
                <div class="getb fl">
                    <img src="../assets/images/WechatIMG1808.png" alt="">
                    <span>打扮的卡夫卡地方</span>
                </div>
                <div class="rigtb">
                    网络状态：<span>已断开</span>
                </div>
            </div>
            <div class="fls centerv">
                <div class="leftyiv">
                    <img src="../assets/deviceImgs/sanzhouimg.png" class="leftimg">
                </div>
                <div class="lefterv">
                    <div class="fibtv">系统信息</div>
                    <div class="sre fl"><span class="lgvee">当前PLC状态：</span><span
                            class="egv">Rund</span></div>
                    <div class="sre fl"><span class="lgvee">使能状态：</span>
                        <el-switch v-model="form.value" active-color="#13ce66"
                            inactive-color="#8C8FA4">
                        </el-switch>
                    </div>
                    <div class="sre fl"><span class="lgvee">运行状态：</span>
                        <el-switch v-model="form.value" active-color="#13ce66"
                            inactive-color="#8C8FA4">
                        </el-switch>
                    </div>
                    <div class="sre fl"><span class="lgvee">CPU访问权限：</span>
                        <div class="lengvl fls">
                            <div v-for="i in 5" :key="i" class="qiuqiuv">i</div>
                        </div>
                    </div>
                    <div class="sre fl"><span class="lgvee">PLC程序名：</span>

                    </div>
                    <div class="sre fl"><span class="lgvee">PLC FAULT：</span>

                    </div>

                </div>
                <div class="leftsanv">
                    <div class="cellcs">
                        <div class="fibtv">X轴所在位置</div>
                        <div class="kvaswe">135143135</div>
                    </div>
                    <div class="cellcs">
                        <div class="fibtv">X轴所在位置</div>
                        <div class="kvaswe">135143135</div>
                    </div>
                    <div class="cellcs sds">
                        <div class="fibtv">X轴所在位置</div>
                        <div class="kvaswe">135143135</div>
                    </div>
                    <div class="cellcs sds">
                        <div class="fibtv">X轴所在位置</div>
                        <div class="kvaswe">135143135</div>
                    </div>
                </div>
                <div class="leftsiv">
                    <div class="tipv fls">
                        <div class="vet fl">
                            <div class="yuanv"></div> 启动
                        </div>
                        <div class="vet fl">
                            <div class="yuanv tingzv"></div> 停止
                        </div>
                        <div class="vet fl">
                            <div class="yuanv fuwev"></div> 复位
                        </div>
                    </div>
                    <div class="fl sed"><img src="../assets/deviceImgs/qidong.png">
                        <div></div>启动
                    </div>
                    <div class="fl sed rebgbd"><img src="../assets/deviceImgs/tingzhi.png">
                        <div></div>停止
                    </div>
                    <div class="fl sed vsf"><img src="../assets/deviceImgs/fuwei.png">
                        <div></div>复位
                    </div>
                </div>
            </div>
            <div class="fls centerv" style="padding: 5px 20px;">
                <div class="lefterv verh">
                    <div class="fibtv">系统信息</div>
                    <div class="sre fl">
                        <span class="lgvee">供应商：</span>
                        <span class="egv">Rund</span>
                    </div>
                    <div class="sre fl">
                        <span class="lgvee">铭牌号：</span>
                        <span class="egv">Rund</span>
                    </div>
                    <div class="sre fl">
                        <span class="lgvee">出厂日期：</span>
                        <span class="egv">Rund</span>
                    </div>
                    <div class="sre fl">
                        <span class="lgvee">备注：</span>
                        <span class="egv">Rund</span>
                    </div>
                    <div class="sre fl">
                        <span class="lgvee">关联实验室：</span>
                        <span class="egv">Rund</span>
                    </div>
                    <div class="sre fl">
                        <span class="lgvee">所在位置：</span>
                        <span class="egv">Rund</span>
                    </div>
                    <div class="sre fl">
                        <span class="lgvee">附件：</span>
                        <div class="egv">
                            <div v-for="i in 1" :key="i">Rund</div>
                        </div>
                    </div>
                </div>
                <div class="btrightv">
                    <div class="fibtv">系统信息</div>
                    <el-table :data="tableData" border class="tablev" :cell-class-name="aaaaa"
                        header-cell-style="background:#B8B8CC;color:#333;border-color:#25A9B0;"
                        style="width: 100%">
                        <el-table-column type="index" label="编号" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="报警信息" width="450">
                        </el-table-column>
                        <el-table-column prop="name" label="报警类型" width="450">
                        </el-table-column>
                        <el-table-column prop="name" label="报警时间">
                        </el-table-column>
                    </el-table>
                    <div class="obnswe">
                        <el-pagination background layout="prev, pager, next" :total="1">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            imgUrl: '',
            form: {},
            tableData: [
                { name: 22 }
            ]
        };
    },

    components: {},

    computed: {},

    mounted() {
        if (this.$route.query.type == 1) {
            this.imgUrl = require('../assets/deviceImgs/shiyantai.jpg')
        } else if (this.$route.query.type == 2) {
            this.imgUrl = undefined
        } else if (this.$route.query.type == 3) {
            this.imgUrl = require('../assets/deviceImgs/guocheng.jpg')
        } else if (this.$route.query.type == 4) {
            this.imgUrl = require('../assets/deviceImgs/rouxing.jpg')
        } else if (this.$route.query.type == 5) {
            this.imgUrl = require('../assets/deviceImgs/weidianwang.jpg')
        } else if (this.$route.query.type == 6) {
            this.imgUrl = require('../assets/deviceImgs/shukong.jpg')
        } else if (this.$route.query.type == 8) {
            this.imgUrl = require('../assets/deviceImgs/fengguang.jpg')
        } else if (this.$route.query.type == 10) {
            this.imgUrl = require('../assets/deviceImgs/dapingmoren.jpg')
        } else if (this.$route.query.type == 11) {
            this.imgUrl = require('../assets/deviceImgs/dapingqita.jpg')
        }

    },

    created() { },

    methods: {
        aaaaa() {
            return 'border-color:#06274D;';
        }
    }
}

</script>
<style lang="scss" scoped>
.dimg {
    width: 1920px;
    height: 1080px;
    .neirong {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #150017;
    }
}
.imgs {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.topv {
    height: 60px;
    background: #06274d;
    border: 1px solid rgb(88, 247, 250);
    box-shadow: rgb(11, 234, 235) 0px 0px 5px inset;
    padding-left: 20px;
    .getb {
        height: 100%;
        img {
            display: inline-block;
            height: 80%;
            object-fit: cover;
        }
        span {
            padding-left: 25px;
            color: #25a9b0;
            font-size: 26px;
            line-height: 60px;
        }
    }
    .rigtb{
        padding-right: 20px;
        font-size: 20px;
        color: white;
        span{
            color: #FA1935;
        }
    }
}

.fibtv {
    font-size: 20px;
    color: white;
    font-weight: 600;
}

.centerv {
    padding: 20px;
    .leftyiv {
        border-radius: 6px;
        overflow: hidden;
        // border: 1px solid #25a9b0;
        // box-shadow: rgb(11, 234, 235) 0px 0px 5px inset;
        .leftimg {
            display: block;
            width: 480px;
            height: 480px;
            object-fit: cover;
            border-radius: 6px;
        }
    }
    .lefterv {
        width: 480px;
        height: 480px;
        background: #06274d;
        border: 1px solid #25a9b0;
        box-shadow: rgb(11, 234, 235) 0px 0px 5px inset;
        border-radius: 6px;
        padding: 20px;
        overflow: auto;

        .sre {
            padding-top: 30px;
            .lgvee {
                width: 150px;
                font-size: 20px;
                color: #8c8fa4;
            }
            .egv {
                width: 150px;
                font-size: 20px;
                color: white;
            }
            .lengvl {
                width: 250px;
                .qiuqiuv {
                    background: #8c8fa4;
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 30px;
                }
            }
        }
    }
    .verh {
        height: 460px;
    }
    .leftsanv {
        width: 560px;
        height: 480px;
        border: 1px solid #25a9b0;
        box-shadow: rgb(11, 234, 235) 0px 0px 10px inset;
        border-radius: 6px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        background: #25a9b0;
        overflow: hidden;
        .cellcs {
            background: #06274d;
            width: 278.5px;
            height: 238.5px;
            padding: 20px;

            .kvaswe {
                color: rgb(0, 255, 154);
                font-size: 26px;
                font-weight: 600px;
                margin-top: 72px;
            }
        }
        .sds {
            margin-top: 1px;
        }
    }
    .leftsiv {
        width: 300px;
        height: 480px;
        border: 1px solid #25a9b0;
        background: #06274d;
        box-shadow: rgb(11, 234, 235) 0px 0px 5px inset;
        border-radius: 6px;
        padding: 20px;
        .tipv {
            padding-bottom: 30px;
            .vet {
                font-size: 14px;
                color: #8c8fa4;
                .yuanv {
                    width: 14px;
                    height: 14px;
                    background: #1fcc7a;
                    border-radius: 7px;
                    margin-right: 15px;
                }
                .tingzv {
                    background: #fa1935;
                }
                .fuwev {
                    background: #fbb306;
                }
            }
        }
        .sed {
            height: 72px;
            border-radius: 36px;
            font-size: 26px;
            color: white;
            background: #1fcc7a;
            padding-left: 20px;
            img {
                display: block;
                width: 34px;
                height: 34px;
                margin-right: 58px;
            }
        }
        .rebgbd {
            margin-top: 25px;
            background: #fa1935;
        }
        .vsf {
            margin-top: 25px;
            background: #fbb306;
        }
    }
    .btrightv {
        width: 1380px;
        height: 460px;
        border: 1px solid #25a9b0;
        box-shadow: rgb(11, 234, 235) 0px 0px 5px inset;
        border-radius: 6px;
        background: #06274d;
        padding: 20px;
        .tablev {
            background: #06274d;
        }
        .obnswe {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
    }
}

.el-table {
    border-color: #25a9b0;
    background: #06274d;
}
</style>
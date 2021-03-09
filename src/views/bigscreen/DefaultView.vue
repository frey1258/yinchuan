<!--  -->
<template>
    <div class="screenv">
        <!-- 左上 -->
        <div class="left_topv">
            <div class="title_icon">
                <i class="el-icon-d-arrow-right"></i>
                <div style="padding:0px 20px;">实验室使用率排行</div>
                <i class="el-icon-d-arrow-left"></i>
            </div>

            <div class="left_topv_btmv" v-for="i in  5" :key="i">
                <div class="left_tip">3</div>
                <div class="progress-out">
                    <div class="progress-in" :style="{width:'80%'}">
                        数字实验室
                    </div>
                </div>
                <div class="right_tip">80.00%</div>
            </div>
        </div>

        <!-- 左下 -->
        <div class="left_btmv">
            <div class="title_icon">
                <i class="el-icon-d-arrow-right"></i>
                <div style="padding:0px 20px;">实验室预约记录</div>
                <i class="el-icon-d-arrow-left"></i>
            </div>

            <div class="left_btm_centerv">
                <div class="divv">
                    <div class="tv">
                        今日预约课时
                    </div>
                    <div class="bv">
                        10
                    </div>
                </div>
                <div class="divv">
                    <div class="tv">
                        本周预约课时
                    </div>
                    <div class="bv">
                        100
                    </div>
                </div>
                <div class="divv">
                    <div class="tv">
                        学期预约课时
                    </div>
                    <div class="bv">
                        10
                    </div>
                </div>
            </div>

            <div class="left_btm_btmv">
                <div class="cellv" v-for="i in 5" :key="i">
                    <div class="innert">
                        isdhfihasdfhiohioodfaodj
                    </div>
                    <div class="innert">
                        实训 计算机科学 李阳
                    </div>
                </div>
            </div>
        </div>

        <!-- 中上 -->
        <div class="center_topv">
            <el-carousel trigger="click" :interval="10000" arrow="never"
                indicator-position="outside" class="lunbov">
                <el-carousel-item v-for="item in 4" :key="item">
                    <div class="lunboimg">
                    </div>
                </el-carousel-item>
            </el-carousel>

            <div class="center_topv_btmv">
                <div class="btm_left">
                    <div class="fl">
                        <div class="labnamev">sdfads</div>
                    </div>
                    <div class="addressv">vdsagsdg</div>
                </div>
                <div class="btm_right">
                    <div class="tuv">
                        <el-progress type="circle" :width="50" color="#19BB69" :height="50"
                            :percentage="50"></el-progress>
                        <div>当前使用率</div>
                    </div>
                    <div class="tuv">
                        <el-progress type="circle" :width="50" :height="50"
                            :percentage="60"></el-progress>
                        <div>学期使用率</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中下 -->
        <div class="center_btmv">
            <div class="center_btm_topv">
                <div class="l1">设备使用状态</div>
                <div class="r1">
                    <div class="rr"><div class="greenborder"></div>使用中</div>
                     <div class="rr"><div class="blueborder"></div>未使用</div>
                </div>
            </div>
        </div>
        <!-- 右上 -->
        <div class="right_topv">

        </div>
        <!-- 右下 -->
        <div class="right_btmv">

        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
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
.screenv {
    width: 1920px;
    height: 1080px;
    background: black;
    // background: url('../../assets/bigscreen/background.jpg') no-repeat;
    // background-size: cover;
    position: relative;
    .p_style {
        font-size: 20px;
        font-weight: bold;
        color: #96c2ef;
    }
}

// 图形位置
.left_topv {
    position: absolute;
    top: 30px;
    left: 20px;
    width: 500px;
    height: 300px;
    background: #06274d;
}

.left_btmv {
    position: absolute;
    left: 20px;
    bottom: 0px;
    width: 500px;
    height: 500px;
    background: #06274d;
}

.center_topv {
    position: absolute;
    top: 30px;
    left: 0px;
    right: 0px;
    width: 745px;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
    background: #06274d;
}

.center_btmv{
     position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 745px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    background: #06274d;
}


// 带箭头标题
.title_icon {
    margin-top: 10px;
    color: #0d9caf;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.left_topv_btmv {
    display: flex;
    padding: 15px;
    align-items: center;
    .left_tip {
        width: 10%;
        font-size: 10px;
        color: white;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }
    .right_tip {
        width: 20%;
        font-size: 12px;
        color: white;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }
}

.left_btm_centerv {
    display: flex;
    padding: 15px;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    .divv {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: space-around;
        .tv {
            font-size: 12;
            color: white;
        }
        .bv {
            font-size: 15;
            color: #96c2ef;
        }
    }
}

.left_btm_btmv {
    padding: 15px;
    font-size: 12px;
    font-weight: 500;
    color: #0269e9;
    .cellv {
        margin-top: 20px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .innert {
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
        }
    }
}

.lunbov {
    margin: 50px auto 0px;
    width: 500px;
    height: 400px;
    background: white;
    .lunboimg {
        background: olive;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}


.center_topv_btmv {
    background: white;
    min-width: 200px;
    display: flex;
    justify-content: space-between;
    padding: 10px 0px 10px 10px;
    .btm_left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .fl{
            display: flex;
            align-items: center;
        }
        .pointv {
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background: #ccc;
        }
        .usev {
            background: white;
        }
        .labnamev {
            font-weight: bold;
            font-size: 14px;
            padding-left: 10px;
        }
        .addressv {
            color: #666;
            font-size: 12px;
        }
    }
    .btm_right {
        font-size: 12px;
        color: #666;
        .tuv {
            display: inline-block;
            padding: 0px 5px;
        }
    }
}




// 进度条
.progress-out {
    width: 70%;
    height: 20px;
    background-color: rgba(126, 165, 189, 0.3);
    border-radius: 10px;
    .progress-in {
        height: 100%;
        position: relative;
        background: linear-gradient(to right, #92dae6, #72a7f7, #0269e9);
        border-radius: 10px;
        padding-left: 10px;
        font-size: 12px;
        color: white;
        display: flex;
        align-items: center;
    }
    .progress-error {
        background: linear-gradient(to right, #d64e25, #e6a13a, #eaefab);
    }
}

// 私有修改
</style>
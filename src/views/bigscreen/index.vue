<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <!-- <el-tabs type="border-card" class="tabsv">
                <el-tab-pane label="默认方案">默认方案</el-tab-pane>
                <el-tab-pane label="院校领导参观方案">院校领导参观方案</el-tab-pane>
                <el-tab-pane label="外部访客参观方案">外部访客参观方案</el-tab-pane>
            </el-tabs> -->
            <el-radio-group v-model="radio1" @change="changea">
                <el-radio-button label="默认方案"></el-radio-button>
                <el-radio-button label="院校领导参观方案"></el-radio-button>
                <el-radio-button label="外部访客参观方案"></el-radio-button>
            </el-radio-group>
            <el-button type="primary" class="tabsv" @click="play">播放</el-button>
        </div>
        <div class="p10bg255 mt20">
            <img :src="imageUrl" class="sdege">
            

        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            radio1: '默认方案',
            imageUrl: '',
            
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.imageUrl = require('@/assets/deviceImgs/dapingmoren.jpg')
    },

    created() { },

    methods: {
        play() {

            let targetUrl = '/default/deviceInfo'
            let id = 0
            if (this.radio1 === '默认方案') {
                id = 10
            } else {
                id = 11
            }
            let routeData = this.$router.resolve({ path: targetUrl, query: { id: id } })
            window.open(routeData.href, '_blank');

            // var targetUrl = ''
            // if (this.radio1 === '默认方案') {
            //     targetUrl = '/default/screen'
            // } else if (this.radio1 === '院校领导参观方案') {
            //     targetUrl = '/inner/screen'
            // } else if (this.radio1 === '外部访客参观方案') {
            //     targetUrl = '/outer/screen'
            // }
            // let routeData = this.$router.resolve({ path: targetUrl, query: { id: 1 } })
            // window.open(routeData.href, '_blank');
        },
        changea(e) {
            if (e === '默认方案') {
                this.imageUrl = require('@/assets/deviceImgs/dapingmoren.jpg')
            } else {
                this.imageUrl = require('@/assets/deviceImgs/dapingqita.jpg')
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }
}

</script>
<style>
.tabsv {
    float: right;
}

.sdege {
    display: block;
    width: 100%;
    object-fit: cover;
}
</style>
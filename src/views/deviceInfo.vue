<!--  -->
<template>
    <div class="dimg">
        <img :src="imgUrl" class="imgs">
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            imgUrl:''
        };
    },

    components: {},

    computed: {},

    mounted() { 
        if (this.$route.query.id == 1) {
            this.imgUrl = require('../assets/deviceImgs/shiyantai.jpg')
        }else if (this.$route.query.id == 2) {
            this.imgUrl = require('../assets/deviceImgs/sanzhou.jpg')
        }else if (this.$route.query.id == 3) {
            this.imgUrl = require('../assets/deviceImgs/guocheng.jpg')
        }else if (this.$route.query.id == 4) {
            this.imgUrl = require('../assets/deviceImgs/rouxing.jpg')
        }else if (this.$route.query.id == 5) {
            this.imgUrl = require('../assets/deviceImgs/weidianwang.jpg')
        }else if (this.$route.query.id == 6) {
            this.imgUrl = require('../assets/deviceImgs/shukong.jpg')
        }else if (this.$route.query.id == 8) {
            this.imgUrl = require('../assets/deviceImgs/fengguang.jpg')
        } else if (this.$route.query.id == 10) {
            this.imgUrl = require('../assets/deviceImgs/dapingmoren.jpg')
        } else if (this.$route.query.id == 11) {
            this.imgUrl = require('../assets/deviceImgs/dapingqita.jpg')
        } 

        //  if (e.type === '基础实验台') {
        //         id = 1
        //     } else if (e.type === '三轴') {
        //         id = 2
        //     } else if (e.type === '过程控制') {
        //         id = 3
        //     } else if (e.type === '柔性产线') {
        //         id = 4
        //     } else if (e.type === '微电网') {
        //         id = 5
        //     } else if (e.type === '数控机床') {
        //         id = 6
        //     } else if (e.type === '摄像头') {
        //         id = 7
        //     } else if (e.type === '风光互补') {
        //         id = 8
        //     }
    },

    created() { },

    methods: {
         
    }
}

</script>
<style lang="scss" scoped>
.dimg {
    width: 1920px;
    height: 1080px;
}
.imgs {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
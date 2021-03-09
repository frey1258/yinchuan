<template>
    <scroll-bar>
        <div v-if="sidebar.opened" class="logov">
            <img :src="logoimg" class="logoimg">
        </div>
        <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path"
            :collapse="isCollapse" background-color="white" text-color="black"
            active-text-color="#0B623D">
            <sidebar-item :routes="routes"></sidebar-item>
        </el-menu>
    </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
    data() {
        return {
            logoimg:''
        };
    },
    components: { SidebarItem, ScrollBar },
    computed: {
        ...mapGetters([
            'sidebar',
            'routers'
        ]),
        routes() {
            return this.routers
        },
        isCollapse() {
            return !this.sidebar.opened
        }
    },
    mounted(){
      this.logoimg = require('@/assets/images/WechatIMG1808.png')
    }
}
</script>

<style lang="scss" scoped>
.logov {
    height: 49px;
    width: 100%;
    background: #0b623d;
    overflow: hidden;
}
.logoimg{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
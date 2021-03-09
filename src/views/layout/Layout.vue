<template>
    <div class="app-wrapper" :class="classObj">
        <!-- <div v-if="sidebar.opened" class="drawer-bg"/> -->
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <div class="fixed-header">
              <navbar></navbar>
            </div>
            <div style="height:49px;"></div>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
    name: 'layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        device() {
            return this.$store.state.app.device
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        },
   
    },
 
 
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 180px);
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 36px);
}

.mobile .fixed-header {
    width: 100%;
}

</style>

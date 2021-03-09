<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar"
            :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>

        <div class="right-menu">
            <div class="right-menu-item">{{nowDate}} {{nowTime}} {{nowWeek}}</div>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <!-- <img :src="avatar" class="user-avatar"> -->
                    <div>{{name}}</div>
                    <i class="el-icon-caret-bottom aaaa" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <!-- <router-link to="/user/profile">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link> -->
                    <el-dropdown-item divided @click.native="logout">
                        <span>退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div>{{username}}</div>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {

    data() {
        return {
            nowDate: "",    // 当前日期
            nowTime: "",    // 当前时间
            nowWeek: ""     // 当前星期
        };
    },
    components: {
        Breadcrumb,
        Hamburger
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar',
            'name',
        ])
    },
    mounted() {
        this.currentTime();
    },
    beforeDestroy: function () {
        if (this.getDate) {
            console.log("销毁定时器")
            clearInterval(this.getDate);
        }
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        async logout() {
            this.$confirm('确定注销并退出系统吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            })
        },
        currentTime() {
            setInterval(this.getDate, 500);
        },
        getDate: function () {
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let week = new Date().getDay();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes() < 10
                ? "0" + new Date().getMinutes()
                : new Date().getMinutes();
            if (week == 1) {
                this.nowWeek = "星期一";
            } else if (week == 2) {
                this.nowWeek = "星期二";
            } else if (week == 3) {
                this.nowWeek = "星期三";
            } else if (week == 4) {
                this.nowWeek = "星期四";
            } else if (week == 5) {
                this.nowWeek = "星期五";
            } else if (week == 6) {
                this.nowWeek = "星期六";
            } else {
                this.nowWeek = "星期日";
            }
            _this.nowTime = hh + ":" + mf;
            _this.nowDate = yy + "-" + mm + "-" + dd;
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .navbar {
//     height: 50px;
//     line-height: 50px;
//     border-radius: 0px !important;
//     .hamburger-container {
//         line-height: 58px;
//         height: 50px;
//         float: left;
//         padding: 0 10px;
//     }
//     .screenfull {
//         position: absolute;
//         right: 90px;
//         top: 16px;
//         color: red;
//     }
//     .avatar-container {
//         height: 50px;
//         display: inline-block;
//         position: absolute;
//         right: 35px;
//         .avatar-wrapper {
//             cursor: pointer;
//             margin-top: 5px;
//             position: relative;
//             .user-avatar {
//                 width: 40px;
//                 height: 40px;
//                 border-radius: 10px;
//             }
//             .el-icon-caret-bottom {
//                 position: absolute;
//                 right: -20px;
//                 top: 25px;
//                 font-size: 12px;
//             }
//         }
//     }
// }

.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #0B623D;
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    // .hamburger-container {
    //     line-height: 46px;
    //     height: 100%;
    //     float: left;
    //     color: white;
    //     cursor: pointer;
    //     transition: background 0.3s;
    //     -webkit-tap-highlight-color: transparent;

    //     // &:hover {
    //         // background: rgba(0, 0, 0, 0.025);
    //     // }
    // }
        .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
        // color: white;
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 15px;
            color: white;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                // &:hover {
                //     background: rgba(0, 0, 0, 0.025);
                // }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                // margin-top: 5px;
                // position: relative;

                // .user-avatar {
                //     cursor: pointer;
                //     width: 40px;
                //     height: 40px;
                //     border-radius: 10px;
                // }    
                display: flex;
                font-size: 15px;
                align-items: center;
                .aaaa{
                    cursor: pointer;
                    // position: absolute;
                    // right: -20px;
                    // top: 25px;
                    // padding-left: 5px;
                    // font-size: 12px;
                }
            }
        }
    }
}
</style>


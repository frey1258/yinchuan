<template>
    <div style="height:100%;">
        <div class="screenv">
            <div class="loginimg hidden-sm-and-down">
                <img :src="kkk" class="islgn">
                <div class="cksd">
                    <div class="the_title1">
                        中国矿业大学
                        <br />
                        银川学院
                    </div>
                    <div class="hengxianv"></div>
                    <div class="the_title2">数字化工业互联网系统</div>
                </div>
            </div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
                <!-- <div class="formtitle hidden-sm-and-up">智能制造运营管理平台</div> -->
                <!-- <h3 class="title hidden-sm-and-down">系统登录</h3> -->
                <img :src="iii" class="logoimng">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" type="text" auto-complete="off"
                        placeholder="账号">
                        <i slot="prefix" class="iconfont iconyonghu"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" auto-complete="off"
                        placeholder="密码" @keyup.enter.native="handleLogin">
                        <i slot="prefix" class="iconfont iconmima"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码"
                        style="width: 63%" @keyup.enter.native="handleLogin">
                        <!-- <svg-icon slot="prefix" icon-class="validCode"
                            class="el-input__icon input-icon" /> -->
                        <i slot="prefix" class="iconfont iconchakan"></i>
                    </el-input>
                    <div class="login-code" @click="refreshCode">
                        <SIdentify :identifyCode="identifyCode"></SIdentify>
                    </div>
                </el-form-item>
                <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码
                </el-checkbox>
                <el-form-item style="width:100%;">
                    <el-button :loading="loading" size="medium" type="primary"
                        style="width:100%;margin-top:20px;" @click.native.prevent="handleLogin">
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 录 中...</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate';
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support';
import login_center_bg from '@/assets/images/login_center_bg.png'
import SIdentify from '@/components/Sidentify' //注意引入路径

export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error('密码不能小于3位'))
            } else {
                callback()
            }
        };
        return {
            loginForm: {
                username: "admin",
                password: "macro123",
                rememberMe: false,
                code: "",
                uuid: ""
            },
            loginRules: {
                username: [
                    { required: true, trigger: "blur", message: "用户名不能为空" }
                ],
                password: [
                    { required: true, trigger: "blur", message: "密码不能为空" }
                ],
                code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
            },
            loading: false,
            redirect: undefined,
            identifyCodes: '1234567890',
            identifyCode: '',
            iii: '',
            kkk: ''
        }
    },
    components: {
        SIdentify
    },
    created() {
        // this.loginForm.username = getCookie("username");
        // this.loginForm.password = getCookie("password");
        // if (this.loginForm.username === undefined || this.loginForm.username == null || this.loginForm.username === '') {
        //     this.loginForm.username = 'admin';
        // }
        // if (this.loginForm.password === undefined || this.loginForm.password == null) {
        //     this.loginForm.password = '';
        // }

        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        this.iii = require('@/assets/images/WechatIMG1807.png')
        this.kkk = require('@/assets/images/WechatIMG1809.png')
    },
    methods: {
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    if (this.loginForm.code.toUpperCase() != this.identifyCode.toUpperCase()) {
                        this.$message.error('验证码填写有误');
                        return
                    }

                    // let isSupport = getSupport();
                    // if (isSupport === undefined || isSupport == null) {
                    //     this.dialogVisible = true;
                    //     return;
                    // }
                    this.loading = true;
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        this.loading = false;
                        setCookie("username", this.loginForm.username, 15);
                        setCookie("password", this.loginForm.password, 15);
                        this.$router.push({ path: '/' })
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    console.log('参数验证不合法！');
                    return false
                }
            })
        },
        handleTry() {
            this.dialogVisible = true
        },
        dialogConfirm() {
            this.dialogVisible = false;
            setSupport(true);
        },
        dialogCancel() {
            this.dialogVisible = false;
            setSupport(false);
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
            console.log(this.identifyCode);
        },
    }
}
</script>

<style scoped>
.login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409eff;
}

.login-title {
    text-align: center;
}

.login-center-layout {
    background: #409eff;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
}
</style>

<style lang="scss" scoped>
.screenv {
    display: flex;
    align-items: center;
    height: 100%;
    background: white;
}

.loginimg {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    flex: 1;
    height: 100%;
    position: relative;
    // background-image: url('@/assets/images/WechatIMG1807.png');
    // background-size: cover;
    .islgn {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
    .cksd {
        position: absolute;
        width: 380px;
        left: 50%;
        top: 50%;
        margin-left: -190px;
        margin-top: -190px;
        .the_title1 {
            color: white;
            font-size: 55px;
            font-weight: 400;
        }
        .hengxianv {
            margin: 10px 0px;
            width: 100px;
            height: 5px;
            background: #f7ba2a;
        }
        .the_title2 {
            padding-top: 15px;
            color: white;
            font-size: 40px;
            font-weight: 600;
        }
    }
}

.title {
    margin: 30px auto 30px auto;
    text-align: center;
    color: #707070;
}

.login-form {
    border-radius: 6px;
    background: #ffffff;
    // width: 400px;
    min-width: 550px;
    padding: 25px 25px 5px 25px;
    box-sizing: border-box;
    .logoimng {
        margin: 0px auto;
        display: block;
        width: 70%;
        padding-bottom: 30px;
    }
    .formtitle {
        font-size: 30px;
        text-align: center;
        color: #707070;
        padding-bottom: 40px;
    }
    .el-input {
        height: 38px;
        input {
            height: 38px;
        }
    }
    .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
    }
}
.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}
.login-code {
    width: 112px;
    height: 38px;
    float: right;
    vertical-align: middle;
    cursor: pointer;
    // img {
    //     cursor: pointer;
    //     vertical-align: middle;
    // }
}
.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}

@media (max-width: 768px) {
    .loginimg {
        width: 0px;
    }
    .login-form {
        width: 100%;
        min-width: 100%;
    }
}
</style>
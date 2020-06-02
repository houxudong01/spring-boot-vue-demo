<template>
    <div class="home-container">
        <div class="login-button">
            <h1>Welcome!</h1>
            <h1>{{ username }}</h1>

            <!-- <router-link to="/register">
                <el-button type="primary">注册</el-button>
            </router-link>
            <router-link to="/login">
                <el-button type="primary">登录</el-button>
            </router-link> -->

            <router-link to="/userInfo">
                个人中心
            </router-link> 
            <div v-if="username == '' ">
                <el-button type="primary" @click="changeIsRegister">去注册</el-button>
                <el-button type="primary" @click="changeIsLogin">去登录</el-button>
            </div>
            
            <hr>

        </div>
        <div class="son-cmt" v-if="username == undefined || username == ''">

            <div v-if="isLogin">
                <login-vue @func="getMsgFormSon"></login-vue>
            </div>
            <div v-if="isRegister">
                <register-vue @func="getMsgFormSon"></register-vue>
            </div>
        </div>

    </div>

</template>

<script>
    import loginVue from './Login.vue'
    import registerVue from './Regist.vue'
    export default {
        name: 'home',
        data() {
            return {
                username: '',
                isLogin: false,
                isRegister: false,
            }
        },
        methods: {
            changeIsLogin() {
                this.isLogin = true;
                this.isRegister = false;
            },
            changeIsRegister() {
                this.isLogin = false;
                this.isRegister = true;
            },
            getMsgFormSon(data) {
                console.log('父组件')
                console.log(data)
                this.username = data
                console.log(this.username)
            }
        },
        components: { loginVue, registerVue }
    }

</script>

<style scoped>
    .home-container {
        background-color: rgba(10, 87, 110, 0.25);
        height: 800px;
        width: 100%;
    }

    .login-button {
        padding-top: 250px;
        text-align: center;
    }

    .son-cmt {
        padding-left: 450px;
        width: 500px;
        text-align: center;
    }
</style>
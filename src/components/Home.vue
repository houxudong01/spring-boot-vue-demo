<template>
    <div class="home-container">
        <div class="login-button">
            <h1>Welcome!</h1>
            
            <router-link to="/register">
                <el-button type="primary">注册</el-button>
            </router-link> 
            <router-link to="/login">
                <el-button type="primary">登录</el-button>
            </router-link> 

            
        </div>

       
    </div>

</template>

<script>
    export default {
        data() {
            return {

            }
        },
        updated(){
            getLocalStroge()
        },
        methods: {
            getLocalStroge:function(){
                var v = localStorage.getItem('user');
                console.log(v)
            }
        }
    }

</script>

<style scoped>
    .home-container{
        background-color:rgba(10, 87, 110, 0.25);
        height: 800px;
        width: 100%;
    }

    .login-button{
        padding-top:250px;
        text-align: center;
    }
   
</style>
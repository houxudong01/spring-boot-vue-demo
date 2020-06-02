<template>
    <div class="user-container">
        <div class="login-container">
            <!-- <h3>登录</h3>
            名字：<input type="text" v-model="loginName"> <br>
            密码：<input type="text" v-model="loginPassword"> <br>
            <button @click="login">Button</button> -->

            <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="账户" prop="loginname">
                    <el-input type="text" v-model="ruleForm.loginname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>

</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: 'login',
        data() {
            var validateLoginname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    // if (this.ruleForm.loginname !== '') {
                    //     console.log(this.$refs)
                    //     this.$refs.ruleForm.validateField('loginname');
                    //     return
                    // }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    // if (this.ruleForm.checkPass !== '') {
                    //     this.$refs.ruleForm.validateField('checkPass');
                    // }
                    callback();
                }
            };

            return {
                name: '',
                password: '',
                user: { username: 'zhangsan' },
                userList: [],
                loginName: '',
                loginPassword: '',
                userToken: '',
                ruleForm: {
                    loginname: '',
                    pass: '',
                },

                rules: {
                    loginname: [
                        { validator: validateLoginname, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
           // this.listAll()
        },
        methods: {
            ...mapMutations(['changeLogin']),
            login: function () {
                var that = this
                var params = new URLSearchParams();
                params.append('username', this.ruleForm.loginname);
                params.append('password', this.ruleForm.pass);
                console.log(this.ruleForm.loginname)
                console.log(this.ruleForm.pass)
                that.$axios.post('/api/user/login', params).then(response => {
                    console.log(response.data)
                    if (response.data.code == 200) {
                        console.log('登录成功')
                        console.log(response.data.data)
                        // console.log(response.data.data.id)
                        // console.log(response.data.data.username)
                        // 将用户token保存到vuex中
                        that.userToken = response.data.data.token;
                        // console.log(that.userToken)
                        //that.changeLogin({ Authorization: that.userToken });
                        // that.$store.commit('changeLogin',JSON.stringify(that.userToken))
                        localStorage.setItem("USER_TOKEN_KEY", that.userToken)
                        that.loginName = response.data.data.username;
                        that.sendMsg();
                        that.$router.push({ path: decodeURIComponent('/') });
                        alert('登录成功')
                    } else {
                        alert(response.data.message)
                    }
                }, error => {

                })
            },
            listAll: function () {
                var that = this;
                that.$axios.get('/api/user/listAll').then(function (response) {
                    that.userList = response.data.data;
                }, function (error) {

                })
            },
            add: function () {
                var that = this;
                var params = new URLSearchParams();
                params.append('username', this.name);
                params.append('password', this.password);
                this.$axios.post('/api/user/register', params).then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        that.listAll()
                    }

                }, error => {
                    alert(response.data.message)
                })
            },
            get: function (id) {
                var that = this;
                this.$axios.get('/api/user/getUser?id=' + id).then(response => {
                    that.user = response.data.data;
                }, error => {

                })
            },
            sendMsg() {
                //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
                this.$emit('func', this.loginName)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }

</script>

<style scoped>
    /* .demo-ruleForm {
        width: 500px;
    }

    .login-container {
        padding-top: 250px;
        text-align: center;
        padding-left: 500px;
    } */
</style>
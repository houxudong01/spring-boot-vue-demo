<template>
    <div class="user-container">
        <div class="register-container">

            <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="loginname">
                    <el-input type="text" v-model="ruleForm.loginname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>

</template>

<script>
    export default {
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
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                name: '',
                password: '',
                user: {},
                userList: [],
                loginName: '',
                loginPassword: '',
                ruleForm: {
                    loginname: '',
                    pass: '',
                    checkPass: '',
                },

                rules: {
                    loginname: [
                        { validator: validateLoginname, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.listAll()
        },
        methods: {
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
                params.append('username', this.ruleForm.loginname);
                params.append('password', this.ruleForm.pass);
                this.$axios.post('/api/user/register', params).then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        that.listAll()
                        that.$router.push({ path: decodeURIComponent('/login') });
                    }

                }, error => {
                    
                })
            },
            // submitForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             alert('submit!');
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // }
        }

    }

</script>

<style scoped>
    .demo-ruleForm {
        width: 500px;
    }

    .register-container {
        padding-top: 250px;
        text-align: center;
        padding-left: 500px;
    }
</style>
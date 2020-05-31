<template>
    <div class="user-container">
        <div class="add-user">
            <h3>添加用户</h3>
            名字：<input type="text" v-model="name">
            密码：<input type="text" v-model="password">
            生日：<input type="date" v-model="birthday">
            <button @click="add">增加</button>
        </div>
        <div class="user-list">
            <table class="table" border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>BIRTHDAY</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userList" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ new Date() | dateFormat }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                name: '',
                password: '',
                birthday: undefined,
                user: {},
                userList: []
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
                params.append('username', this.name);
                params.append('password', this.password);
                params.append('birthday',this.birthday);
                this.$axios.post('/api/user/register', params).then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        that.listAll()
                    }

                }, error => {

                })
            },
            get: function (id) {
                var that = this;
                this.$axios.get('/api/user/getUser?id=' + id).then(response => {
                    that.user = response.data.data;
                }, error => {

                })
            }
        }
    }

</script>

<style scoped>
    ul {
        list-style: none;
    }
</style>
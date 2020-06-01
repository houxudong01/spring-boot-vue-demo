import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from "@/components/Home"
import Regist from "@/components/Regist"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home.vue',
      component: Home
    },
    {
      path: '/login',
      name: 'Login.vue',
      component: Login
    },
    {
      path: '/register',
      name: 'Regist.vue',
      component: Regist
    }
  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  console.log('路由')
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('USER_TOKEN_KEY');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;

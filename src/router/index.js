import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Questions from '@/components/Questions'
import Admin from '@/components/Admin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
{
      path: '/register',
      name: 'Register',
      component: Register
    },
{
      path: '/questions',
      name: 'Questions',
      component: Questions
    },
{
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

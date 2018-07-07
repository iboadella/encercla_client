import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import RegisterCompany from '@/components/RegisterCompany'
import Questions from '@/components/Questions'
import Admin from '@/components/Admin'
import UsersManagement from '@/components/UsersManagement'
import UserPage from '@/components/UserPage'
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
      path: '/registercompany',
      name: 'RegisterCompany',
      component: RegisterCompany
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
,
{
      path: '/admin/users',
      name: 'UsersManagement',
      component: UsersManagement
    }
,
{
      path: '/user',
      name: 'UserPage',
      component: UserPage
    }
  ]
})

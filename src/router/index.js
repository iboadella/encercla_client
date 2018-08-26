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
import Results from '@/components/Results'
import UpdateUser from '@/components/UpdateUser'
import EditSurvey from '@/components/EditSurvey'
import ManageSurvey from '@/components/ManageSurvey'
import quisom from '@/components/quisom'
import auth from '../auth/index.js'
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
        {
      path: '/quisom',
      name: 'quisom',
      component: quisom
    },
{
      path: '/registerAdmin',
      name: 'Register',
      component: Register,
      secure: true,
    },
 {
      path: '/admin/surveys',
      name: 'ManageSurvey',
      component: ManageSurvey,
      secure: true,
    }, 
     {
      path: '/register',
      name: 'Register',
      component: Register,
      secure: false,
    },  
       {
      path: '/updatesurvey/:id',
      name: 'EditSurvey',
      component: EditSurvey,
      secure: true,
    }, 
   {
      path: '/updateuser',
      name: 'UpdateUser',
      component: UpdateUser,
      secure: true,
    },
       {
      path: '/updateuseradmin',
      name: 'UpdateUser',
      component: UpdateUser,
      secure: true,
    },  
{
      path: '/registercompany',
      name: 'RegisterCompany',
      component: RegisterCompany,
      secure: true,
    },
{
      path: '/registercompany/:id',
      name: 'RegisterCompany',
      component: RegisterCompany,
      secure: true,
    },
{
      path: '/questions/:id',
      name: 'Questions',
      component: Questions,
      secure: true,
    },
    {
      path: '/results/:id',
      name: 'Results',
      component: Results,
      secure: true,
    },
{
      path: '/admin',
      name: 'Admin',
      component: Admin,
      secure: true,
    }
,
{
      path: '/admin/users',
      name: 'UsersManagement',
      component: UsersManagement,
      secure: true,
    }
,
{
      path: '/user',
      name: 'UserPage',
      component: UserPage,
      secure: true,
    }
  ]
})

console.log("interce")
/*Vue.http.interceptors.push((request, next)  => {
  request.headers['Authorization'] = auth.getAuthHeader()
  next((response) => {
    if(response.status == 401 ) {
      auth.logout();
      router.go('/login?unauthorized=1');
    }
  });
});*/
router.beforeEach((to, from, next) => {
  // Look at all routes

  router.options.routes.forEach((route) => {
    // If this is the current route and it's secure
    if (to.matched[0].path === route.path && route.secure) {
      // Verify that the user isn't logged in
      router.app.$http.post('http://localhost:5000/auth/loggedin', 'data',{
   headers: auth.getAuthHeader()
}).catch((response) => {
        // Kill the session
        if (response.response.status!=200)
            return next('/');

      });
    }
  });
  // Proceed as normal
  next();
});

export default router

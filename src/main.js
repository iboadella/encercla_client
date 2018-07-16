// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './backend/vue-axios'
import auth from './auth/index.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import VueResource from 'vue-resource';

//Vue.use(VueResource);
Vue.config.productionTip = false
Vue.use(BootstrapVue);
//Vue.use(Resource)
//Vue.http.options.root = 'http://localhost:5000'
/*Vue.http.interceptors.push(function(request) {

  // modify method
  request.method = 'POST';

  // modify headers
  request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  request.headers.set('Authorization', 'Bearer TOKEN');

});*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>',
  http:{root:'http://localhost:5000'}
})


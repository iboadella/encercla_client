// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './backend/vue-axios'
import auth from './auth/index.js'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import translate from './translations/index.js'
//import VueResource from 'vue-resource';

//Vue.use(VueResource);
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuex)
const store = new Vuex.Store();
Vue.use(vuexI18n.plugin,store);



// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
const translationsEs = translate

// add translations directly to the application

Vue.i18n.add('es', translationsEs);

//Vue.i18n.set('cat');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>',
  http:{root:'http://localhost:5000'}
})


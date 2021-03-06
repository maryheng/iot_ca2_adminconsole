// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VeeValidate, { Validator } from 'vee-validate'

Vue.prototype.$http = axios
Vue.axios = axios

Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

// Enable devtools
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

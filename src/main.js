import Vue from 'vue';
import vuetify from '@/plugins/vuetify'

import router from './router';

import { store } from './store/store';

import App from './App.vue';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router, 
  render: h => h(App),
}).$mount('#app')

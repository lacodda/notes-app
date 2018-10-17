import Vue from 'vue';

import store from 'store';
import 'components';
import router from './router';
import 'styles/main.scss';
import App from './App';
/* eslint-disable no-unused-vars */
import lyrn from './assets/images/lyrn.svg';

// Import all svg icons from assets/svg
const req = require.context('./assets/svg', true, /\.svg$/);

req.keys().forEach(key => {
  req(key);
});

// Disable warnings about dev mode
Vue.config.productionTip = false;

// Initialize Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
});

// Initialize Event Bus
const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: () => EventBus,
  },
});

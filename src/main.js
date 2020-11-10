import 'babel-polyfill';
import Vue from 'vue';
import Cookies from 'js-cookie';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';

import i18n from './lang'; // Internationalization
import './permission'; // permission control

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

import oneClick from '@/directive/button';
Vue.use(oneClick);

Vue.config.productionTip = false;

export const bus = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App),
});

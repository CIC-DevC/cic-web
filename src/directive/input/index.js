import numberic from './numberic';

const install = function(Vue) {
  Vue.directive('numberic', numberic);
};

if (window.Vue) {
  window['numberic'] = numberic;
  Vue.use(install); // eslint-disable-line
}

numberic.install = install;
export default numberic;

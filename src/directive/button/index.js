import oneClick from './oneClickButton';

const install = function(Vue) {
  Vue.directive('one-click', oneClick);
};

if (window.Vue) {
  window['one-click'] = oneClick;
  Vue.use(install); // eslint-disable-line
}

oneClick.install = install;
export default oneClick;

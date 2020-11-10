import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // getToken from cookie
import { Message } from 'element-ui';
import { bus } from './main';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true;
  return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login', '/forgot', '/resetPassword']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // request.clear() // clear all pending request
  NProgress.start(); // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      const roles = store.getters.roles;
      if (roles && roles.length > 0) {
        // There is no need to dynamically change permissions can be directly next () delete the following permission judgment ↓
        if (hasPermission(roles, to.meta.roles)) {
          next();
        } else {
          next({ path: '/401', replace: true, query: {} });
        }
      } else {
        try {
          const roles = await store.dispatch('getInfo');

          // generate accessible routes map based on roles
          const accessedRouters = await store.dispatch('generateRoutes', roles);

          // dynamically add accessible routes
          router.addRoutes(accessedRouters);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });

          // There is no need to dynamically change permissions can be directly next () delete the following permission judgment ↓
          if (hasPermission(roles, to.meta.roles)) {
            next();
          } else {
            next({ path: '/401', replace: true, query: {} });
          }
          // Can be deleted ↑
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('resetToken');
          Message.error(error || bus.$t('error.noMessage'));
          if (to.fullPath === '/') {
            next(`/login`);
          } else {
            next(`/login?redirect=${to.fullPath}`); // Otherwise redirect all to the login page
          }
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next();
    } else {
      if (to.fullPath === '/') {
        next(`/login`);
      } else {
        next(`/login?redirect=${to.fullPath}`); // Otherwise redirect all to the login page
      }
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

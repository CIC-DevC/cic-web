import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

import accountRouter from './modules/account';
import viewReportRouter from './modules/viewReport';
import searchInfoRouter from './modules/searchInfo';
import manageFeedbackRouter from './modules/manageFeedback';
import contactRouter from './modules/contact';
/** note: Submenu only appear when children.length>=1
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouters = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/resetPassword',
    component: () => import('@/views/login/reset'),
    hidden: true,
  },
  {
    path: '/forgot',
    component: () => import('@/views/login/forgot'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'home',
          noCache: true,
          roles: [userRole.ADMIN],
        },
      },
    ],
  },
];

export const asyncRouters = [
  accountRouter,
  viewReportRouter,
  searchInfoRouter,
  manageFeedbackRouter,
  contactRouter,
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouters,
    mode: 'history',
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

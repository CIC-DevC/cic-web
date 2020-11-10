import { asyncRouters, constantRouters } from '@/router';

/**
 * Determine whether to match the current user right by meta.role
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (Array.isArray(roles) && route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return !!Array.isArray(roles);
  }
}

/**
 * Recursively filter asynchronous routing tables and return routing tables that match user role permissions
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = constantRouters.concat(routers);
    },
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        let accessedRouters = filterAsyncRouter(asyncRouters, data);
        commit('SET_ROUTERS', accessedRouters);
        resolve(accessedRouters);
      });
    },
  },
};

export default permission;

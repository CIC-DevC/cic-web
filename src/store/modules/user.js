import { login, getUserInfo } from '@/api/login';
import { resetRouter } from '@/router';
import router from '@/router';
import { getToken, setToken, removeToken } from '@/utils/auth';
import objUserType from '@/constants/userType';
import { Message } from 'element-ui';
const user = {
  state: {
    id: undefined,
    token: getToken(),
    user: undefined,
    roles: [],
  },

  mutations: {
    SET_ID: (state, userId) => {
      state.id = userId;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },
  actions: {
    login({ commit }, userinfo) {
      return new Promise((resolve, reject) => {
        if (
          userinfo &&
          userinfo.email === 'cic@gmail.com' &&
          userinfo.password === 'admin@123'
        ) {
          const response = {
            data: {
              access_token: 'token123',
              user: {
                user_id: '123',
                phoneNumber: '0123456789',
                name: 'Admin',
                user_type: objUserType.ADMIN,
                roles: [1],
              },
            },
          };
          this.dispatch('grantToken', response.data)
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        } else {
          Message({
            message: 'Email hoặc mật khẩu không đúng.',
            type: 'error',
            duration: 2 * 1000,
          });
          reject();
        }

        // login(userinfo.email, userinfo.password)
        //   .then((response) => {
        //     if (response) {
        //       if (response.data && response.data.access_token) {
        //         this.dispatch('grantToken', response.data)
        //           .then(() => {
        //             resolve();
        //           })
        //           .catch(() => {
        //             reject();
        //           });
        //       } else {
        //         reject();
        //       }
        //     }
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });
      });
    },
    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const response = {
          data: {
            user: {
              user_id: '123',
              phoneNumber: '0123456789',
              name: 'Admin',
              user_type: objUserType.ADMIN,
              roles: [1],
            },
          },
        };
        const user = response.data.user;
        // Set user info
        commit('SET_ID', user.user_id);
        commit('SET_USER', user);
        // Set Role
        commit('SET_ROLES', user.roles);
        resolve(user.roles);

        // getUserInfo()
        //   .then((response) => {
        //     if (!response.data) {
        //       reject();
        //     } else {
        //       const user = response.data.user;

        //       // roles must be a non-empty array
        //       if (
        //         user.user_type !== objUserType.ADMIN ||
        //         !user.roles ||
        //         user.roles.length <= 0
        //       ) {
        //         reject();
        //       } else {
        //         user.info = response.data.info;
        //         // Set user info
        //         commit('SET_ID', user.user_id);
        //         commit('SET_USER', user);
        //         // Set Role
        //         commit('SET_ROLES', user.roles);
        //         resolve(user.roles);
        //       }
        //     }
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });
      });
    },
    grantToken({ commit }, response) {
      return new Promise((resolve, reject) => {
        const user = response.user;
        // roles must be a non-empty array
        if (
          user.user_type !== objUserType.ADMIN ||
          !user.roles ||
          user.roles.length <= 0
        ) {
          reject();
        } else {
          // Set token
          const token = response.access_token;
          commit('SET_TOKEN', token);
          setToken(token);
          user.info = response.info;
          // Set user info
          commit('SET_ID', user.user_id);
          commit('SET_USER', user);
          // Set Role
          commit('SET_ROLES', user.roles);
          //add router
          this.dispatch('generateRoutes', user.roles)
            .then((accessedRouters) => {
              router.addRoutes(accessedRouters);
            })
            .catch(() => {});
          resolve();
        }
      });
    },
    // remove token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        resolve();
      });
    },
    // Sign out
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        resetRouter();
        resolve();
      });
    },
  },
};

export default user;

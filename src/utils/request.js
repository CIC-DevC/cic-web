import axios from 'axios';
import { Message } from 'element-ui';
import { bus } from '@/main.js';
import store from '@/store';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api base_url
  timeout: 120000, // request timeout
});

// abort duplicate request
const pending = {};

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers['Authorization'] = 'Bearer ' + getToken();
    // }
    // config.cancelToken = new CancelToken((c) => {
    // need to implement
    // removePending(config, c)
    // })

    // config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * The following comment indicates that the request status is indicated by custom code in the response.
   * When the code returns the following, it indicates that there is a problem with the permissions, log out and return to the login page.
   * If you want to use xmlhttprequest to identify the status code, the logic can be written in the following error
   * The following codes are examples, please modify them in combination with self-generated requirements, if you don't need them, you can delete them.
   */
  function(response) {
    // removePending(response.config)
    return response;
  },
  function(error) {
    // removePending(error.config)
    if (!axios.isCancel(error)) {
      let mess = bus.$t('error.connectionlost');

      if (error.response && error.response.status === 401) {
        if (
          !error.response.data ||
          error.response.data.code === null ||
          error.response.data.code === undefined
        ) {
          bus.$store.dispatch('logOut');
          bus.$router.push({ name: 'login', params: { sessionExpired: true } });
          return Promise.reject(error);
        }
      }

      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.message) {
          mess = data.message;
        } else {
          mess = bus.$t('error.noMessage');
        }
      }
      Message({
        message: mess,
        type: 'error',
        duration: 2 * 1000,
      });
      return Promise.reject(error);
    } else {
      // return empty object for aborted request
      return Promise.resolve({});
    }
  }
);

service.clear = () => {
  Object.keys(pending).map((e) => {
    if (pending[e]) {
      pending[e]();
      delete pending[e];
    }
  });
};

export default service;

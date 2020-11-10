import request from '@/utils/request';

export function login(email, password) {
  const data = {
    email,
    password,
  };
  return request({
    url: '/user/signin/company/',
    method: 'post',
    data,
  });
}

export function getUserInfo() {
  return request({
    url: '/auth/user/owner/user/',
    method: 'get',
  });
}

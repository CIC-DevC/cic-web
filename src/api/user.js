import request from '@/utils/request';

// export function updateUserOwner(data) {
//   return request({
//     url: '/auth/user/owner/user/',
//     method: 'put',
//     data: data,
//   });
// }

export function getUserDetail(phoneNumber) {
  return request({
    url: `/api/search/${phoneNumber}`,
    method: 'get',
  });
}

export function filterUser(keyword) {
  return request({
    url: `/api/filter/${keyword}`,
    method: 'get',
  });
}

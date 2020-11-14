import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const searchInfoRouter = {
  path: '/search_info',
  component: Layout,
  redirect: '/search_info',
  name: 'searchInfo',
  meta: {
    title: 'searchInfo.title',
    icon: 'search',
    roles: [userRole.ADMIN],
  },
  children: [
    {
      path: '',
      component: () => import('@/router/nested'),
      redirect: '/search_info',
      hidden: true,
      children: [
        {
          path: '',
          component: () => import('@/views/searchInfo/index'),
          meta: {
            noCache: true,
          },
        },
        {
          path: 'user_detail/:phoneNumber',
          name: 'searchInfo.userDetail',
          component: () => import('@/views/userDetail/index'),
          meta: {
            title: 'searchInfo.userDetail',
            noCache: true,
          },
        },
      ],
    },
  ],
};

export default searchInfoRouter;

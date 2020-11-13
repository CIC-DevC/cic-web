import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const searchInfoRouter = {
  path: '/search_info',
  component: Layout,
  redirect: '/search_info',
  name: 'search_info',
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
          path: 'result',
          component: () => import('@/views/searchInfo/result'),
          meta: {
            title: 'searchInfo.result',
            noCache: true,
          },
        },
      ],
    },
  ],
};

export default searchInfoRouter;

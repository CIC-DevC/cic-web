/* Layout */
import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const accountRouter = {
  path: '/account',
  component: Layout,
  redirect: '/account/profile',
  name: 'account',
  meta: {
    title: 'account.title',
    roles: [userRole.ADMIN],
  },
  hidden: true,
  children: [
    {
      path: 'profile',
      component: () => import('@/views/profile'),
      name: 'account.profile',
      meta: {
        title: 'account.profile',
        noCache: true,
      },
    },
  ],
};

export default accountRouter;

/* Layout */
import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const manageContentRouter = {
  path: '/manage_content',
  component: Layout,
  redirect: '/manage_content',
  name: 'manageContent.index',
  meta: {
    title: 'manageContent.title',
    icon: 'tasks',
    roles: [userRole.ADMIN],
  },
  children: [
    {
      path: '',
      component: () => import('@/router/nested'),
      redirect: '/manage_content',
      hidden: true,
      children: [
        {
          path: '',
          component: () => import('@/views/manageContent/index'),
          meta: {
            noCache: true,
          },
        },
      ],
    },
  ],
};

export default manageContentRouter;

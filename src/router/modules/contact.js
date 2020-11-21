import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const contactRouter = {
  path: '/contact',
  component: Layout,
  name: 'contact',
  redirect: '/contact',
  meta: {
    roles: [userRole.ADMIN],
    title: 'contact.title',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/contact/index.vue'),
      meta: {
        title: 'contact.title',
        icon: 'phone-alt',
      },
    },
  ],
};

export default contactRouter;

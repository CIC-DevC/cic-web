import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const manageFeedbackRouter = {
  path: '/manage_feedback',
  component: Layout,
  name: 'manageFeedback',
  redirect: '/manage_feedback',
  meta: {
    roles: [userRole.ADMIN],
    title: 'manageFeedback.title',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/manageFeedback/index.vue'),
      meta: {
        title: 'manageFeedback.title',
        icon: 'comments',
      },
    },
  ],
};

export default manageFeedbackRouter;

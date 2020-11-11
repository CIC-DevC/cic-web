import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const viewReportRouter = {
  path: '/view_report',
  component: Layout,
  redirect: '/view_report',
  meta: {
    roles: [userRole.ADMIN],
  },
  children: [
    {
      path: '',
      name: 'viewReport',

      component: () => import('@/views/viewReport/index.vue'),
      meta: {
        title: 'viewReport.title',
        icon: 'tasks',
      },
    },
  ],
};

export default viewReportRouter;

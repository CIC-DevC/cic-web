import Layout from '@/views/layout/Layout';
import userRole from '@/constants/userRole';

const viewReportRouter = {
  path: '/view_report',
  component: Layout,
  name: 'viewReport',
  redirect: '/view_report',
  meta: {
    roles: [userRole.ADMIN],
    title: 'viewReport.title',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/viewReport/index.vue'),
      meta: {
        title: 'viewReport.title',
        icon: 'chart-area',
      },
    },
  ],
};

export default viewReportRouter;

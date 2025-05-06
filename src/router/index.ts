import { createRouter, createWebHistory } from 'vue-router';

import AutoSchedule from '../pages/AutoSchedule.vue';
import ManualAdjust from '../pages/ManualAdjust.vue'; // 教师申请审核
import AdminManualAdjust from '../pages/AdminManualAdjust.vue'; // 管理员手动调整
import ResourceManage from '../pages/ResourceManage.vue';
import ResultQuery from '../pages/ResultQuery.vue';

const routes = [
  { path: '/', redirect: '/resource-manage' },
  { path: '/auto-schedule', name: 'AutoSchedule', component: AutoSchedule },
  {
    path: '/manual-adjust',
    name: 'ManualAdjust',
    redirect: '/manual-adjust/teacher-review',
    children: [
      {
        path: 'teacher-review',
        name: 'TeacherReview',
        component: ManualAdjust,
      },
      {
        path: 'admin-adjust',
        name: 'AdminManualAdjust',
        component: AdminManualAdjust,
      }
    ]
  },
  { path: '/resource-manage', name: 'ResourceManage', component: ResourceManage },
  { path: '/result-query', name: 'ResultQuery', component: ResultQuery },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
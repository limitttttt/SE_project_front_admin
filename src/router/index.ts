import { createRouter, createWebHistory } from 'vue-router';
import AutoSchedule from '../pages/AutoSchedule.vue';
import ManualAdjust from '../pages/ManualAdjust.vue';
import ResourceManage from '../pages/ResourceManage.vue';
import ResultQuery from '../pages/ResultQuery.vue';

const routes = [
  { path: '/', redirect: '/resource-manage' },
  { path: '/auto-schedule', name: 'AutoSchedule', component: AutoSchedule },
  { path: '/manual-adjust', name: 'ManualAdjust', component: ManualAdjust },
  { path: '/resource-manage', name: 'ResourceManage', component: ResourceManage },
  { path: '/result-query', name: 'ResultQuery', component: ResultQuery },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: 'home', icon: 'home' },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/form',
        name: 'form',
        meta: { title: 'form', icon: 'form' },
        component: () => import('@/views/form/index.vue'),
      },
      {
        path: '/table',
        name: 'table',
        meta: { title: 'table', icon: 'table' },
        component: () => import('@/views/table/index.vue'),
        redirect: '/table/first',
        children: [
          {
            path: '/table/first',
            name: 'tableFirst',
            meta: { title: 'table', subTitle: 1 },
            component: () => import('@/views/table/first.vue'),
          },
          {
            path: '/table/secound',
            name: 'tableSecound',
            meta: { title: 'table', subTitle: 2, isHidden: true },
            component: () => import('@/views/table/secound.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

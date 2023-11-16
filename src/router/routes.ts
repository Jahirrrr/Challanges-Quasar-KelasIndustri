import { addEmitHelper } from 'typescript';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Dashboard.vue') }],
  },

  {
    path: '/help',
    name: 'help',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Help.vue') }],
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Dashboard.vue') }],
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

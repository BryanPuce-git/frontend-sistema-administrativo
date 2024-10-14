import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/perfiles',
    name: 'perfiles',
    component: () => import('./pages/PerfilesPage.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/perfil-settings/:perfilId',
    name: 'perfil-settings',
    component: () => import('./pages/PerfilSettings.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/perfil-settings', // Ruta sin perfilId
    name: 'perfil-settings-no-id',
    component: () => import('./pages/PerfilSettings.vue'), // Mismo componente o uno diferente si es necesario
    meta: { requiresAuth: true },
  },
  {
    path: '/perfil-launch',
    name: 'perfil-launch',
    component: () => import('./pages/LaunchPage.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/perfil-summary',
    name: 'perfil-summary',
    component: () => import('./pages/PerfilSummary.vue'),
    meta: { requiresAuth: true }, 
  },
];

export default routes;

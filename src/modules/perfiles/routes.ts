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
  {
    path: '/curriculum/:id',
    name: 'curriculum',
    component: () => import("@/modules/curriculum/componentes/PersonalInfoSection.vue") // Asegúrate de tener este componente
  },
  // {
  //   path: '/conocimiento/:id',
  //   name: 'Conocimiento',
  //   component: () => import('@/views/Conocimiento.vue')  // Asegúrate de tener este componente
  // },
  // {
  //   path: '/video-entrevista/:id',
  //   name: 'VideoEntrevista',
  //   component: () => import('@/views/VideoEntrevista.vue')  // Asegúrate de tener este componente
  // },
  // {
  //   path: '/disc/:id',
  //   name: 'Disc',
  //   component: () => import('@/views/Disc.vue')  // Asegúrate de tener este componente
  // },
  // {
  //   path: '/competencias/:id',
  //   name: 'Competencias',
  //   component: () => import('@/views/Competencias.vue')  // Asegúrate de tener este componente
  // }









  // {
  //   path: '/perfil-settings/:perfilId',
  //   name: 'PerfilSettings',
  //   component: () => import('./pages/PerfilSettings.vue'),
  //   beforeEnter: async (to, from, next) => {
  //     const perfilStore = usePerfilStore();
  //     const consultarPerfil = useConsultarPerfil();
      
  //     const perfilId = Number(to.params.perfilId);

  //     try {
  //       // Cargar datos de perfil
  //       await consultarPerfil.mutateAsync({ perfilId });
  //       await perfilStore.obtenerComponentesPorPerfilId(perfilId);
  //       await perfilStore.agregarComponente(perfilId);

  //       // Después de cargar todo, permite la navegación
  //       next();
  //     } catch (error) {
  //       console.error('Error al cargar el perfil:', error);
  //       next(false); // Evita navegación si hay un error
  //     }
  //   },
  // },
];

export default routes;

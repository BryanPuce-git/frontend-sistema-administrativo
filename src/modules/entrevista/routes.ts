import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/videoEntrevista/:id',
        name: 'videoEntrevista',
        component: () => import('./pages/videoEntrevista.vue'),
        meta: {
            requiresAuth: true,
        },
        props: true
    },
];

export default routes;
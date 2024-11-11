import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/competencia/:id',
        name: 'competencia',
        component: () => import('./pages/CompetenciasPage.vue'),
        meta: { requiresAuth: true }, 
        props: true
    },
    
];

export default routes;

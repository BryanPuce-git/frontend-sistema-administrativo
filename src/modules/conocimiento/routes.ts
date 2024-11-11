import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/conocimiento/:id',
        name: 'conocimiento',
        component: () => import('./pages/KnowledgePage.vue'),
        meta: { requiresAuth: true },
        props: true 
    },
    
];

export default routes;

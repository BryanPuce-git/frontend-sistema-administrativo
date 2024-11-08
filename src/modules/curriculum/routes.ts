import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/curriculum/:id',
        name: 'curriculum',
        component: () => import('./pages/CurriculumPage.vue'),
        meta: { requiresAuth: true }, 
        props: true
    },
    
];

export default routes;

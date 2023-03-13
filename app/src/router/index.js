import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/ProfileView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;


import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import store from '@/store'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            requireAuth: false,
            authToken: true,
        },
        component: HomeView,
    },
    {
        path: '/shopping-basket',
        name: 'shopping-basket',
        meta: {
            requireAuth: true,
            authToken: true,
        },
        component: () => import('@/views/ShoppingBasketView/index'),
    },
    {
        path: '/favorite',
        name: 'favorite',
        meta: {
            requireAuth: true,
            authToken: true,
        },
        component: () => import('@/views/FavoriteView'),
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            requireAuth: false,
            authToken: true,
        },
        component: () => import('@/views/LoginView/index'),
    },
    {
        path: '/admin_add/:id?',
        name: 'admin_add',
        meta: {
            requireAuth: true,
            authToken: true,
        },
        component: () => import('@/views/AdminAddProdView/index'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () => import('@/views/PageNotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    if (to.meta?.authToken) {
        let isAuthenticated = store.state.auth.user
        if (!isAuthenticated) isAuthenticated = await store.dispatch('auth/loginWithCredential')
        if (to.meta?.requireAuth) {
            if (!isAuthenticated)
                //  return {
                //      name: 'register',
                //  }
                return { name: 'register', query: { redirect: to.fullPath ? to.fullPath : 'home' } }
        }
    }
})

export default router

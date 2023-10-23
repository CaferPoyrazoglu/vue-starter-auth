import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginPage.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores'
import AccountsPage from '@/views/AccountsPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import UsersPage from '@/views/UsersPage.vue'
import CompaniesPage from '@/views/CompaniesPage.vue'
import AccountListPage from '@/views/AccountListPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            title: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            title: 'login',
            component: Login,
            beforeEnter: redirectIfAuthenticated,
        },
        {
            path: '/accounts',
            title: '/accounts',
            component: AccountsPage,
            beforeEnter: authenticatedGuard,
        },
        {
            path: '/account-list',
            title: '/account-list',
            component: AccountListPage,
            beforeEnter: authenticatedGuard,
        },
        {
            path: '/users',
            title: '/users',
            component: UsersPage,
            beforeEnter: authenticatedGuard,
        },
        {
            path: '/companies',
            title: '/companies',
            component: CompaniesPage,
            beforeEnter: authenticatedGuard,
        },
        {
            path: '/admin',
            title: '/admin',
            component: AdminPage,
            beforeEnter: authenticatedGuard,
        },
        {
            path: '/profile',
            title: '/profile',
            component: ProfilePage,
            beforeEnter: authenticatedGuard,
        },
        {
            path: '/404',
            title: 'not-found',
            component: NotFoundView,
        },
        //404
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404',
        },
    ],
})

function redirectIfAuthenticated(to, from, next) {
    const authStore = useAuthStore()
    if (authStore.isUserAuthenticated) {
        console.warn('Zaten giriş yapılmış.')
        next({ name: 'home' })
    } else {
        next()
    }
}

function authenticatedGuard(to, from, next) {
    const authStore = useAuthStore()

    const isUserAuthenticated = authStore.isUserAuthenticated
    if (!isUserAuthenticated) {
        console.warn('Giriş yapılmamış.')
        next({ name: 'login' })
    } else next()
}

export default router

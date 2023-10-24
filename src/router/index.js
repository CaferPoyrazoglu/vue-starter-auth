import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores'
import AccountsPage from '@/views/AccountsPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import UsersPage from '@/views/UsersPage.vue'
import CompaniesPage from '@/views/CompaniesPage.vue'
import AccountListPage from '@/views/AccountListPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            title: 'home',
            component: HomeView,
            beforeEnter: authenticatedGuard,
        },
        {
            path: '/login',
            title: 'login',
            component: LoginPage,
            beforeEnter: redirectIfAuthenticated,
        },
        {
            path: '/register',
            title: 'register',
            component: RegisterPage,
        },
        {
            path: '/accounts',
            title: '/accounts',
            component: AccountsPage,
            beforeEnter: userGuard,
        },
        {
            path: '/account-list',
            title: '/account-list',
            component: AccountListPage,
            beforeEnter: adminGuard,
        },
        {
            path: '/users',
            title: '/users',
            component: UsersPage,
            beforeEnter: adminGuard,
        },
        {
            path: '/companies',
            title: '/companies',
            component: CompaniesPage,
            beforeEnter: adminGuard,
        },
        {
            path: '/admin',
            title: '/admin',
            component: AdminPage,
            beforeEnter: adminGuard,
        },
        {
            path: '/profile',
            title: '/profile',
            component: ProfilePage,
            beforeEnter: userGuard,
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
    } else next()
}

function userGuard(to, from, next) {
    const authStore = useAuthStore()
    const isUserAuthenticated = authStore.isUserAuthenticated

    //const isUser = authStore.isUser;
    //const isUserAuthenticatedAndAuthorized = isUserAuthenticated && isUser;
    //const isUserAuthenticatedAndNotAuthorized = isUserAuthenticated && !isUser;

    if (!isUserAuthenticated) {
        console.warn('You are not authenticated.')
        next({ name: 'login' })
    }
    if (isUserAuthenticated) {
        next()
    }
}

function adminGuard(to, from, next) {
    const authStore = useAuthStore()

    const isUserAuthenticated = authStore.isUserAuthenticated
    const isAdmin = authStore.isAdmin

    const isUserAuthenticatedAndAuthorized = isUserAuthenticated && isAdmin
    const isUserAuthenticatedAndNotAuthorized = isUserAuthenticated && !isAdmin

    if (!isUserAuthenticated) {
        next({ name: 'login' })
    }
    if (isUserAuthenticatedAndAuthorized) next()
    if (isUserAuthenticatedAndNotAuthorized) {
        next({ name: 'home' })
    }
}

export default router

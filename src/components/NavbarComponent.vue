<script setup>
import axiosInstance from '@/api/axiosInstance'
import router from '@/router'
import { useAuthStore } from '@/stores'
import { computed, onMounted, onUnmounted } from 'vue'

const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isUserAuthenticated)

function checkAuthenticationStateAndUpdateStore() {
    if (!localStorage.getItem('access_token') && !localStorage.getItem('refresh_token')) {
        authStore.logout()
        router.push('/login')
    } else if (!authStore.isUserAuthenticated) {
        const accessToken = localStorage.getItem('access_token')
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]))
        const userRole = decodedToken.role
        authStore.login(userRole)

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        router.push('/')
    }
}

onMounted(() => {
    window.addEventListener('storage', checkAuthenticationStateAndUpdateStore)
})

onUnmounted(() => {
    window.removeEventListener('storage', checkAuthenticationStateAndUpdateStore)
})

const logout = async () => {
    try {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        authStore.logout()

        window.dispatchEvent(new Event('localStorage'))

        await router.push('/login')
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <nav
        id="mainNav"
        class="navbar bg-gradient-to-r from-blue-950 via-blue-950 to-blue-950 navbar-light navbar-expand-md fixed-top navbar-shrink py-2 px-10 shadow-2xl">
        <div class="flex flex-wrap items-center justify-between mx-auto p-2">
            <router-link class="btn" to="/">
                <a class="flex items-center">
                    <img
                        alt="image description"
                        class="h-auto max-w-full scale-75"
                        src="src/assets/img/logo-white.png" />
                </a>
            </router-link>

            <button
                aria-controls="navbar-default"
                aria-expanded="false"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                data-collapse-toggle="navbar-default"
                type="button">
                <span class="sr-only">Open main menu</span>
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 17 14"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 1h15M1 7h15M1 13h15"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2" />
                </svg>
            </button>
            <div id="navbar-default" class="hidden w-full md:block md:w-auto">
                <ul
                    class="text-lg flex flex-col p-4 md:p-0 mt-4 border text-white md:flex-row md:space-x-4 md:mt-0 md:border-0">
                    <li v-if="isAuthenticated" class="nav-item">
                        <router-link class="nav-link" to="/accounts">Hesaplar </router-link>
                    </li>
                    <li v-if="isAuthenticated" class="nav-item">
                        <router-link class="nav-link" to="/admin">Yönetim </router-link>
                    </li>
                    <li v-if="isAuthenticated" class="nav-item">
                        <router-link class="nav-link" to="/profile">Profil </router-link>
                    </li>
                    <li>
                        <router-link v-if="isAuthenticated" class="btn" to="/login" @click="logout">
                            Çıkış
                        </router-link>
                    </li>
                    <li>
                        <router-link v-if="!isAuthenticated" class="btn" to="/login"> Giriş </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>

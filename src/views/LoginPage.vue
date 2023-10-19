<script setup>
import { ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { useAuthStore, useLoadingStateStore } from '@/stores'
import { useRouter } from 'vue-router'
import LoadingPage from '@/views/LoadingPage.vue'

const loginRequest = ref({
    email: '',
    password: '',
})

const authStore = useAuthStore()
const loadingStatus = useLoadingStateStore()
const router = useRouter()

async function login() {
    try {
        loadingStatus.isLoading = true

        const response = await axiosInstance.post('auth/signin', loginRequest.value, { withCredentials: true })
        const accessToken = response.data.token
        localStorage.setItem('access_token', accessToken)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        authStore.login('ROLE_USER')
        await router.push('/')

        loadingStatus.isLoading = false
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <section v-if="!loadingStatus.isLoading" class="py-10 center">
        <div
            class="center w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-2xl">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Hesabınıza giriş yapın
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="login">
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-control"
                            for="email">
                            E-Mail
                        </label>
                        <input
                            v-model="loginRequest.email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="email"
                            required="required"
                            type="email" />
                    </div>
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-control"
                            for="password">
                            Şifre
                        </label>
                        <input
                            v-model="loginRequest.password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="password"
                            type="password" />
                    </div>
                    <button
                        class="w-full text-white bg-emerald-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit">
                        Giriş
                    </button>
                </form>
            </div>
        </div>
    </section>
    <LoadingPage v-else />
</template>

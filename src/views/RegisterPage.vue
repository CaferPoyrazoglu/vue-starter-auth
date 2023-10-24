<script setup>
import { ref } from 'vue'
import { useLoadingStateStore, useMessageStore } from '@/stores'

import LoadingPage from '@/views/LoadingPage.vue'
import axiosInstance from '@/api/axiosInstance'
import { useRouter } from 'vue-router'

const messageStore = useMessageStore()
const router = useRouter()

const registerRequest = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
})

const loadingStatus = useLoadingStateStore()

async function register() {
    try {
        loadingStatus.isLoading = true

        await axiosInstance.post('auth/signup', registerRequest.value, { withCredentials: true })
        await router.push('/login')
        messageStore.status = false
        loadingStatus.isLoading = false
    } catch (error) {
        messageStore.status = true
        loadingStatus.isLoading = false
        if (error.response) {
            messageStore.message = error.response.data.toString()
        } else if (error.request) {
            messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
        } else {
            messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
        }
    }
}
</script>

<template>
    <section v-if="!loadingStatus.isLoading" class="py-10 center">
        <div
            class="center w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-2xl">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Kayıt
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="register">
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-control"
                            for="email">
                            Ad
                        </label>
                        <input
                            v-model="registerRequest.firstName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="firstName"
                            required="required"
                            type="text" />
                    </div>
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-control"
                            for="email">
                            Soyad
                        </label>
                        <input
                            v-model="registerRequest.lastName"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="lastName"
                            required="required"
                            type="text" />
                    </div>
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-control"
                            for="email">
                            E-Mail
                        </label>
                        <input
                            v-model="registerRequest.email"
                            autocomplete="username"
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
                            v-model="registerRequest.password"
                            autocomplete="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="password"
                            type="password" />
                    </div>
                    <button
                        class="w-full text-white bg-emerald-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit">
                        Kayıt
                    </button>
                </form>
            </div>
        </div>
    </section>
    <LoadingPage v-else />
</template>

<script setup>
import axiosInstance from '@/api/axiosInstance'
import { ref } from 'vue'
import { useAuthStore, useMessageStore } from '@/stores'
import router from '@/router'

let userInfo = ref(null)
const messageStore = useMessageStore()
const authStore = useAuthStore()

const newPasswordRequest = ref({
    newPassword: '',
})

await fetchUserInfo()

async function fetchUserInfo() {
    try {
        const response = await axiosInstance.get('auth/info', {
            withCredentials: true,
        })

        userInfo.value = response.data
        messageStore.status = false
    } catch (error) {
        messageStore.status = true
        if (error.response) {
            messageStore.message = error.response.data.message
        } else if (error.request) {
            messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
        } else {
            messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
        }
    }
}

async function changePassword() {
    try {
        await axiosInstance.post(
            'auth/change-password',
            {
                newPassword: newPasswordRequest.value.newPassword,
            },
            {
                withCredentials: true,
            }
        )

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        authStore.logout()

        window.dispatchEvent(new Event('localStorage'))

        await router.push('/login')
    } catch (error) {
        messageStore.status = true
        if (error.response) {
            messageStore.message = error.response.data.toString()
        } else if (error.request) {
            messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
        } else {
            messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
        }
    }
}

function getDate(date) {
    return new Date(date).toLocaleString('tr-TR')
}
</script>

<template>
    <section class="py-10 center">
        <div class="grid">
            <h2 class="text-4xl font-extrabold">Profil</h2>
            <hr class="h-px bg-transparent border-0" />

            <div class="columns-2 py-5">
                <form @submit.prevent="changePassword">
                    <input
                        id="helper-text"
                        v-model="newPasswordRequest.newPassword"
                        aria-describedby="helper-text-explanation"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Yeni Şifre"
                        type="password" />

                    <button
                        class="full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit">
                        Şifremi Değiştir
                    </button>
                </form>
            </div>

            <div class="bg-white">
                <div class="text-gray-700">
                    <div class="grid md:grid-cols-1 text-md">
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Ad</div>
                            <div class="px-4 py-2">{{ userInfo.firstName }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Soyad</div>
                            <div class="px-4 py-2">{{ userInfo.lastName }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">E-Mail</div>
                            <div class="px-4 py-2">{{ userInfo.email }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Oluşturma Tarihi</div>
                            <div class="px-4 py-2">{{ getDate(userInfo.createdDate) }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Değiştirilme Tarihi</div>
                            <div class="px-4 py-2">{{ getDate(userInfo.lastModifiedDate) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import axiosInstance from '@/api/axiosInstance'
import { ref } from 'vue'
import { useMessageStore } from '@/stores'

let userInfo = ref(null)
const messageStore = useMessageStore()

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

function getDate(date) {
    return new Date(date).toLocaleString('tr-TR')
}
</script>

<template>
    <section class="py-10 center">
        <div class="grid">
            <h2 class="text-4xl font-extrabold">Profil</h2>
            <hr class="h-px bg-transparent border-0" />

            <div class="bg-white py-7">
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

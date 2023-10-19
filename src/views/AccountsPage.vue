<script setup>
import axiosInstance from '@/api/axiosInstance'
import { useMessageStore } from '@/stores'
import { ref } from 'vue'

const messageStore = useMessageStore()
let accountList = ref(null)

await fetchAccounts()

async function fetchAccounts() {
    try {
        const response = await axiosInstance.get('account/all', {
            withCredentials: true,
        })

        accountList.value = response.data
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
    return new Date(date * 1000).toLocaleString('tr-TR')
}
</script>

<template>
    <section class="py-10 center">
        <div class="grid">
            <h2 class="text-4xl font-extrabold">Hesaplar</h2>
            <hr class="h-px bg-transparent border-0" />

            <div class="py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <div
                    v-for="account in accountList"
                    :key="account"
                    class="overflow-hidden shadow-2xl bg-white rounded-xl border border-gray-100">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">
                            {{ account.username }}
                        </div>
                        <p class="text-gray-900 text-base">
                            <span class="font-bold">Kullanıcı Adı:</span>
                            {{ account.username }}
                        </p>
                        <p class="text-gray-900 text-base">
                            <span class="font-bold">Şifre:</span>
                            {{ account.password }}
                        </p>
                        <p class="text-gray-900 text-base">
                            <span class="font-bold">Firma:</span>
                            {{ account.company.name }}
                        </p>
                        <p class="text-gray-900 text-base">
                            <span class="font-bold">Oluşturulma Tarihi:</span>
                            {{ getDate(account.createdDate) }}
                        </p>
                        <p class="text-gray-900 text-base">
                            <span class="font-bold">Son Değiştirilme Tarihi:</span>
                            {{ getDate(account.lastModifiedDate) }}
                        </p>
                        <p class="text-gray-900 text-base">
                            <span class="font-bold">Bilgi:</span>
                            {{ account.details }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

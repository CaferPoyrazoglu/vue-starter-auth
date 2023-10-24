<script setup>
import { ref } from 'vue'
import { Modal } from 'flowbite-vue'
import axiosInstance from '@/api/axiosInstance'
import { useMessageStore } from '@/stores'

const messageStore = useMessageStore()

const isShowModal = ref(false)
let userList = ref(null)

const selectedUser = ref({
    id: '',
    firstName: '',
    lastName: '',
})

await fetchUsers()
function closeModal() {
    isShowModal.value = false
}

function showModal(user) {
    isShowModal.value = true
    selectedUser.value.id = user.id
    selectedUser.value.firstName = user.firstName
    selectedUser.value.lastName = user.lastName
}

async function fetchUsers() {
    try {
        const response = await axiosInstance.get('auth/all-users', {
            withCredentials: true,
        })

        userList.value = response.data
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

async function deleteUser() {
    try {
        const response = await axiosInstance.delete('auth/delete/' + selectedUser.value.id, {
            withCredentials: true,
        })

        await fetchUsers()
        closeModal()
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
</script>

<template>
    <section class="py-10 center">
        <div class="grid">
            <h2 class="text-4xl font-extrabold">Kullanıcı Ayarları</h2>
            <hr class="h-px bg-transparent border-0" />

            <div class="relative overflow-x-auto sm:rounded-lg py-6">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th class="px-6 py-3" scope="col">Ad-soyad</th>
                            <th class="px-6 py-3" scope="col">E-Mail</th>
                            <th class="px-6 py-3" scope="col">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="user in userList"
                            :key="user"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                scope="row">
                                {{ user.firstName }} {{ user.lastName }}
                            </th>
                            <td class="px-6 py-4">{{ user.email }}</td>
                            <td class="px-6 py-4">
                                <a
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    href="#"
                                    @click="showModal(user)">
                                    Sil
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <Modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">Uyarı</div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {{ selectedUser.firstName }} {{ selectedUser.lastName }} adlı kullanıcıyı silmek istediğinize emin
                misiniz?
            </p>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <button
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    @click="closeModal">
                    İptal
                </button>
                <button
                    class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    @click="deleteUser">
                    Sil
                </button>
            </div>
        </template>
    </Modal>
</template>

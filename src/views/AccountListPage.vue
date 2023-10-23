<script setup>
import { ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { Modal } from 'flowbite-vue'
import { useMessageStore } from '@/stores'

const selectedAccount = ref({
    id: '',
    title: '',
    username: '',
    password: '',
    company: '',
    details: '',
})

const messageStore = useMessageStore()
const isUpdateModal = ref(false)
let accountList = ref(null)
let companyList = ref(null)

await fetchAccounts()
await fetchCompanies()

function closeUpdateModal() {
    isUpdateModal.value = false
}

function showUpdateModal(account) {
    isUpdateModal.value = true
    selectedAccount.value.id = account.id
    selectedAccount.value.title = account.title
    selectedAccount.value.username = account.username
    selectedAccount.value.company = account.company
    selectedAccount.value.details = account.details
}

async function updateAccount() {
    try {
        await axiosInstance.put(
            'account/update/' + selectedAccount.value.id,
            {
                targetCompanyId: selectedAccount.value.company.id,
                accountTitle: selectedAccount.value.title,
                accountName: selectedAccount.value.username,
                accountDetails: selectedAccount.value.details,
            },
            {
                withCredentials: true,
            }
        )

        await fetchAccounts()
        closeUpdateModal()
    } catch (error) {
        messageStore.status = true
        if (error.response) {
            messageStore.message = error.response.data.toString()
        } else if (error.request) {
            messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
        } else {
            messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
        }
        closeUpdateModal()
    }
}

async function fetchAccounts() {
    try {
        const response = await axiosInstance.get('account/all', {
            withCredentials: true,
        })

        accountList.value = response.data
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

async function fetchCompanies() {
    try {
        const response = await axiosInstance.get('company/all', {
            withCredentials: true,
        })

        companyList.value = response.data
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

async function deleteAccount() {
  try {
    await axiosInstance.delete('account/remove/' + selectedAccount.value.id, {
      withCredentials: true,
    })

    await fetchAccounts()
    closeUpdateModal()
  } catch (error) {
    messageStore.status = true
    if (error.response) {
      messageStore.message = error.response.data.toString()
    } else if (error.request) {
      messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
    } else {
      messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
    }
    closeUpdateModal()
  }
}
</script>

<template>
    <section class="py-10 center">
        <div class="">
            <h2 class="text-4xl font-extrabold">Hesap Ayarları</h2>
            <hr class="h-px bg-transparent border-0" />

            <div class="columns-2 py-5"></div>

            <div class="relative overflow-x-auto sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th class="px-6 py-3" scope="col">Başlık</th>
                            <th class="px-6 py-3" scope="col">Kullanıcı Adı</th>
                            <th class="px-6 py-3" scope="col">Şirket</th>
                            <th class="px-6 py-3" scope="col">Açıklama</th>
                            <th class="px-6 py-3" scope="col">İşlem</th>
                        </tr>
                    </thead>
                    <tbody v-for="account in accountList" :key="account">
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                scope="row">
                                {{ account.title }}
                            </th>
                            <th
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                scope="row">
                                {{ account.username }}
                            </th>
                            <th
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                scope="row">
                                {{ account.company.name }}
                            </th>
                            <th
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                scope="row">
                                {{ account.details }}
                            </th>
                            <td class="px-6 py-4">
                                <a
                                    class="font-medium text-blue-600 dark:text-red-500 hover:underline"
                                    href="#"
                                    @click="showUpdateModal(account)">
                                    Düzenle
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <Modal v-if="isUpdateModal" @close="closeUpdateModal">
        <template #header>
            <div class="flex items-center text-lg">Düzenle</div>
        </template>
        <template #body>
            <form>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Başlık</label>
                    <input
                        id="title"
                        v-model="selectedAccount.title"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        type="text" />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kullanıcı adı</label>
                    <input
                        id="username"
                        v-model="selectedAccount.username"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        type="text" />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bilgi</label>
                    <input
                        id="username"
                        v-model="selectedAccount.details"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        type="text" />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Şirket</label>

                    <select
                        id="companies"
                        v-model="selectedAccount.company.id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="company in companyList" :value="company.id">{{ company.name }}</option>
                    </select>
                </div>
            </form>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <button
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    @click="closeUpdateModal">
                    İptal
                </button>
                <div class="flex justify-between">
                    <div class="px-2">
                        <button
                            class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            @click="deleteAccount(selectedAccount)">
                            Bu hesabı sil
                        </button>
                    </div>
                    <div class="px-2">
                        <button
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            @click="updateAccount(selectedAccount)">
                            Değişiklikleri kaydet
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>
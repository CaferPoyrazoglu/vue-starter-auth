<script setup>
import { ref } from 'vue'
import axiosInstance from '@/api/axiosInstance'
import { Modal } from 'flowbite-vue'
import { useMessageStore } from '@/stores'

const messageStore = useMessageStore()
const isUpdateModal = ref(false)
const isCreateModal = ref(false)
const isAssignModal = ref(false)
let accountList = ref(null)
let companyList = ref(null)
let userList = ref(null)
let selectedUserList = ref([])

const selectedAccount = ref({
    id: '',
    title: '',
    username: '',
    password: '',
    company: '',
    details: '',
})

const newAccount = ref({
    targetCompanyId: '',
    accountTitle: '',
    accountName: '',
    accountDetails: '',
    accountPassword: '',
})

await fetchAccounts()
await fetchCompanies()
await fetchUsers()

function showCreateNewAccountModal() {
    isCreateModal.value = true
}

function showAssignUser(account) {
    isAssignModal.value = true
    selectedAccount.value.id = account.id
    selectedAccount.value.title = account.title
    selectedAccount.value.username = account.username
    selectedAccount.value.company = account.company
    selectedAccount.value.details = account.details
}

function showUpdateModal(account) {
    isUpdateModal.value = true
    selectedAccount.value.id = account.id
    selectedAccount.value.title = account.title
    selectedAccount.value.username = account.username
    selectedAccount.value.company = account.company
    selectedAccount.value.details = account.details
}

function closeUpdateModal() {
    isUpdateModal.value = false
}

function closeCreateModal() {
    isCreateModal.value = false
}

function closeAssignModal() {
    isAssignModal.value = false
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

async function assignUser() {
    try {
        const userStringList = selectedUserList.value.map((user) => user.toString())
        const response = await axiosInstance.put('account/addUsers/' + selectedAccount.value.id, userStringList, {
            withCredentials: true,
        })

        closeAssignModal()
    } catch (error) {
        messageStore.status = true
        if (error.response) {
            messageStore.message = error.response.data.toString()
        } else if (error.request) {
            messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
        } else {
            messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
        }
        closeAssignModal()
    }
}
async function fetchAccounts() {
    try {
        const response = await axiosInstance.get('account/manage', {
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

async function createAccount() {
    try {
        await axiosInstance.post(
            'account/new',
            {
                targetCompanyId: newAccount.value.targetCompanyId,
                accountTitle: newAccount.value.accountTitle,
                accountName: newAccount.value.accountName,
                accountDetails: newAccount.value.accountDetails,
                accountPassword: newAccount.value.accountPassword,
                userIdList: [],
            },
            {
                withCredentials: true,
            }
        )

        await fetchAccounts()
        closeCreateModal()
    } catch (error) {
        messageStore.status = true
        if (error.response) {
            messageStore.message = error.response.data.toString()
        } else if (error.request) {
            messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
        } else {
            messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
        }
        closeCreateModal()
    }
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

            <div class="columns-2 py-5">
                <button
                    class="full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="submit"
                    @click="showCreateNewAccountModal()">
                    Yeni Hesap Ekle
                </button>
            </div>

            <div class="relative overflow-x-auto sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th class="px-6 py-3" scope="col">Başlık</th>
                            <th class="px-6 py-3" scope="col">Kullanıcı Adı</th>
                            <th class="px-6 py-3" scope="col">Şirket</th>
                            <th class="px-6 py-3" scope="col">Açıklama</th>
                            <th class="px-6 py-3" scope="col">İşlem</th>
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
                            <td class="px-6 py-4">
                                <a
                                    class="font-medium text-blue-600 dark:text-red-500 hover:underline"
                                    href="#"
                                    @click="showAssignUser(account)">
                                    Kişi Ata
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
                        id="details"
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
    <Modal v-if="isCreateModal" @close="closeCreateModal">
        <template #header>
            <div class="flex items-center text-lg">Yeni</div>
        </template>
        <template #body>
            <form>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Başlık</label>
                    <input
                        id="title"
                        v-model="newAccount.accountTitle"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        type="text" />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kullanıcı adı</label>
                    <input
                        id="username"
                        v-model="newAccount.accountName"
                        autocomplete="username"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        type="text" />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Şifre</label>
                    <input
                        id="password"
                        v-model="newAccount.accountPassword"
                        autocomplete="new-password"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        type="password" />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bilgi</label>
                    <input
                        id="details"
                        v-model="newAccount.accountDetails"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        type="text" />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Şirket</label>

                    <select
                        id="companies"
                        v-model="newAccount.targetCompanyId"
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
                    @click="closeCreateModal">
                    İptal
                </button>
                <div class="flex justify-between">
                    <div class="px-2">
                        <button
                            class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            @click="createAccount(newAccount)">
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
    <Modal v-if="isAssignModal" @close="closeAssignModal">
        <template #header>
            <div class="flex items-center text-lg">Kiş Ata</div>
        </template>
        <template #body>
            <form>
                <ul
                    class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownSearchButton">
                    <li v-for="user in userList" :key="user.id">
                        <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                :value="user.id"
                                type="checkbox"
                                v-model="selectedUserList"
                                id="checkbox" />
                            <label
                                class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                for="checkbox-item-11"
                                >{{ user.firstName }} {{ user.lastName }}</label
                            >
                        </div>
                    </li>
                </ul>
            </form>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <button
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    @click="closeAssignModal">
                    İptal
                </button>
                <div class="flex justify-between">
                    <div class="px-2">
                        <button
                            class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            @click="assignUser()">
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { Modal } from 'flowbite-vue'
import axiosInstance from '@/api/axiosInstance'
import { useMessageStore } from '@/stores'

const selectedCompany = ref({
    id: '',
    name: '',
})

const newCompanyRequest = ref({
    name: '',
})

const messageStore = useMessageStore()
const isDeleteShowModal = ref(false)
const isUpdateShowModal = ref(false)

let companyList = ref(null)

await fetchCompanies()

async function showDeleteModal(company) {
    isDeleteShowModal.value = true
    selectedCompany.value.id = company.id
    selectedCompany.value.name = company.name
}

async function showUpdateModal(company) {
    isUpdateShowModal.value = true
    selectedCompany.value.id = company.id
    selectedCompany.value.name = company.name
}

function closeDeleteModal() {
    isDeleteShowModal.value = false
}

function closeUpdateModal() {
    isUpdateShowModal.value = false
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

async function addNewComapny() {
    try {
        await axiosInstance.post('company/new', newCompanyRequest.value, {
            withCredentials: true,
        })

        await fetchCompanies()
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

async function updateCompany() {
    try {
        await axiosInstance.put(
            'company/update/' + selectedCompany.value.id,
            { name: selectedCompany.value.name },
            {
                withCredentials: true,
            }
        )

        await fetchCompanies()
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

async function deleteCompany() {
    try {
        await axiosInstance.delete('company/delete/' + selectedCompany.value.id, {
            withCredentials: true,
        })

        await fetchCompanies()
        closeDeleteModal()
    } catch (error) {
        messageStore.status = true
        if (error.response) {
            messageStore.message = error.response.data.toString()
        } else if (error.request) {
            messageStore.message = 'Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'
        } else {
            messageStore.message = 'İsteğiniz gerçekleştirilirken bir hata ile karşılaşıldı.'
        }
        closeDeleteModal()
    }
}
</script>

<template>
    <section class="py-10 center">
        <div class="">
            <h2 class="text-4xl font-extrabold">Şirket Ayarları</h2>
            <hr class="h-px bg-transparent border-0" />

            <div class="columns-2 py-5">
                <form @submit.prevent="addNewComapny">
                    <input
                        id="helper-text"
                        v-model="newCompanyRequest.name"
                        aria-describedby="helper-text-explanation"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main2 dark:focus:border-main2"
                        placeholder="Şirket adı" />

                    <button
                        class="full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit">
                        Ekle
                    </button>
                </form>
            </div>

            <div class="relative overflow-x-auto sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th class="px-6 py-3" scope="col">Şirket Adı</th>
                            <th class="px-6 py-3" scope="col">İşlem</th>
                            <th class="px-6 py-3" scope="col">İşlem</th>
                        </tr>
                    </thead>
                    <tbody v-for="company in companyList" :key="company">
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                scope="row">
                                {{ company.name }}
                            </th>
                            <td class="px-6 py-4">
                                <a
                                    class="font-medium text-main2 dark:text-red-500 hover:underline"
                                    href="#"
                                    @click="showUpdateModal(company)">
                                    Düzenle
                                </a>
                            </td>
                            <td class="px-6 py-4">
                                <a
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    href="#"
                                    @click="showDeleteModal(company)">
                                    Sil
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <Modal v-if="isDeleteShowModal" @close="closeDeleteModal">
        <template #header>
            <div class="flex items-center text-lg">Uyarı</div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {{ selectedCompany.name }}
                adlı şirketi silmek istediğinize emin misiniz?
            </p>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <button
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-main2 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    @click="closeDeleteModal">
                    İptal
                </button>

                <button
                    class="text-white bg-red-700 hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-main2 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main2 dark:hover:bg-main2 dark:focus:ring-main2"
                    type="button"
                    @click="deleteCompany(selectedCompany.id)">
                    Sil
                </button>
            </div>
        </template>
    </Modal>
    <Modal v-if="isUpdateShowModal" @close="closeUpdateModal">
        <template #header>
            <div class="flex items-center text-lg">Düzenle</div>
        </template>
        <template #body>
            <input
                id="helper-text"
                v-model="selectedCompany.name"
                aria-describedby="helper-text-explanation"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main2 dark:focus:border-main2"
                placeholder="Şirket adı" />
        </template>
        <template #footer>
            <div class="flex justify-between">
                <button
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-main2 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    @click="closeUpdateModal">
                    İptal
                </button>

                <button
                    class="text-white bg-main2 hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-main2 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main2 dark:hover:bg-main2 dark:focus:ring-main2"
                    type="button"
                    @click="updateCompany(selectedCompany)">
                    Kaydet
                </button>
            </div>
        </template>
    </Modal>
</template>

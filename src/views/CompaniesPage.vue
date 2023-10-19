<script setup>
import { ref } from 'vue'
import { Modal } from 'flowbite-vue'
import axiosInstance from '@/api/axiosInstance'

const selectedCompany = ref({
    id: '',
    name: '',
})

const newCompanyRequest = ref({
    name: '',
})

let companyList = ref(null)

await fetchCompanies()

const isShowModal = ref(false)

async function fetchCompanies() {
    try {
        const response = await axiosInstance.get('company/all', {
            withCredentials: true,
        })

        companyList.value = response.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message)
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
        if (error.response) {
            console.log(error.response.data.message)
        }
    }
}

async function showDeleteModal(company) {
    isShowModal.value = true
    selectedCompany.value.id = company.id
    selectedCompany.value.name = company.name
}

async function deleteCompany() {
    try {
        await axiosInstance.delete('company/delete/' + selectedCompany.value.id, {
            withCredentials: true,
        })

        await fetchCompanies()
        closeModal()
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message)
        }
    }
}

function closeModal() {
    isShowModal.value = false
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
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Şirket adı" />

                    <button
                        class="full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                                <a class="font-medium text-blue-600 dark:text-red-500 hover:underline" href="#">
                                    Düzenle
                                </a>
                            </td>
                            <td class="px-6 py-4">
                                <a
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
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
    <Modal v-if="isShowModal" @close="closeModal">
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
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    @click="closeModal">
                    İptal
                </button>

                <button
                    class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    @click="deleteCompany(selectedCompany.id)">
                    Sil
                </button>
            </div>
        </template>
    </Modal>
</template>

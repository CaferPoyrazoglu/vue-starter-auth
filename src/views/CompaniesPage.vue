<script setup>
import {ref} from "vue";
import {Modal} from "flowbite-vue";
import axiosInstance from "@/api/axiosInstance";

let companyList = ref(null);

await fetchCompanies();

const isShowModal = ref(false)

async function fetchCompanies() {
  try {
    const response = await axiosInstance.get(
        "company/all",
        {withCredentials: true},
    );

    companyList.value = response.data;

  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);

    }
  }
}

function closeModal() {
  isShowModal.value = false
}

function showModal() {
  isShowModal.value = true
}
</script>

<template>
  <section class="py-10 center">
    <div class="">
      <h2 class="text-4xl font-extrabold">Şirket Ayarları</h2>
      <hr class="h-px bg-transparent border-0"/>

      <div class="columns-2 py-5">

        <input id="helper-text" aria-describedby="helper-text-explanation"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Şirket adı">

        <button
            class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="button">
          Ekle
        </button>
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg">

        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

          <tr>
            <th class="px-6 py-3" scope="col">
              Şirket Adı
            </th>
            <th class="px-6 py-3" scope="col">
              İşlem
            </th>
            <th class="px-6 py-3" scope="col">
              İşlem
            </th>
          </tr>
          </thead>
          <tbody v-for="company in companyList" :key="company">
          <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
              {{ company.name }}
            </th>
            <td class="px-6 py-4">
              <a class="font-medium text-blue-600 dark:text-red-500 hover:underline" href="#">Düzenle</a>
            </td>
            <td class="px-6 py-4">
              <a class="font-medium text-red-600 dark:text-red-500 hover:underline" @click="showModal" >Sil</a>
            </td>
          </tr>

          </tbody>
        </table>
        <nav aria-label="Table navigation" class="flex items-center justify-between pt-4">
          <ul class="inline-flex -space-x-px text-sm h-8">
            <li>
              <a class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#">Önceki</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#">1</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#">2</a>
            </li>
            <li>
              <a aria-current="page"
                 class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                 href="#">3</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#">4</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#">5</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#">Sonraki</a>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </section>
  <Modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        Uyarı
      </div>
    </template>
    <template #body>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Kullanıcıyı silmek istediğinize emin misiniz?
      </p>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" type="button"
                @click="closeModal">
          İptal
        </button>
        <button class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
                @click="closeModal">
          Sil
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import {ref} from "vue";
import {Modal} from "flowbite-vue";

const isShowModal = ref(false)

function closeModal() {
  isShowModal.value = false
}

function showModal() {
  isShowModal.value = true
}
</script>

<template>
  <section class="py-10 center">
    <div class="grid">
      <h2 class="text-4xl font-extrabold">Kullanıcı Ayarları</h2>
      <hr class="h-px bg-transparent border-0"/>


      <div class="relative overflow-x-auto sm:rounded-lg py-6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="px-6 py-3" scope="col">
              Ad-soyad
            </th>
            <th class="px-6 py-3" scope="col">
              E-Mail
            </th>
            <th class="px-6 py-3" scope="col">
              İşlem
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
              Cafer Poyrazoğlu
            </th>
            <td class="px-6 py-4">
              cafererhan@gmail.com
            </td>
            <td class="px-6 py-4">
              <a class="font-medium text-red-600 dark:text-red-500 hover:underline" @click="showModal">Sil</a>
            </td>
          </tr>

          </tbody>


        </table>

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
        <button
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button"
            @click="closeModal">
          İptal
        </button>
        <button
            class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="closeModal">
          Sil
        </button>
      </div>
    </template>
  </Modal>
</template>

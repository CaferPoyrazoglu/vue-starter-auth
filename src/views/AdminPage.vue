<script setup>
</script>

<template>
  <section class="py-10 center">
    <div class="grid ">
      <h2 class="text-4xl font-extrabold">Yönetim</h2>
      <hr class="h-px bg-transparent border-0">
      <div class="py-5 grid grid-cols-3 gap-5">
        <router-link class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-start dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/users">Kullanıcı Ayarları</router-link>
        <router-link class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-start dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/companies">Şirket Ayarları</router-link>
        <router-link class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-start dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/account-list">Hesap Ayarları</router-link>
      </div>
  </div>
</section></template>

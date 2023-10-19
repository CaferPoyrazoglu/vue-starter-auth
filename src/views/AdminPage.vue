<script setup></script>

<template>
    <section class="py-10 center">
        <div class="grid">
            <h2 class="text-4xl font-extrabold">Ayarlar</h2>
            <hr class="h-px bg-transparent border-0" />
            <div class="py-5 grid grid-cols-3 gap-5">
                <router-link
                    class="px-6 py-3.5 text-base font-medium text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-bg-main rounded-lg text-start dark:bg-bg-main dark:hover:bg-main dark:focus:ring-bg-main"
                    to="/users">
                    Kullanıcı Ayarları
                </router-link>
                <router-link
                    class="px-6 py-3.5 text-base font-medium text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-bg-main rounded-lg text-start dark:bg-bg-main dark:hover:bg-main dark:focus:ring-bg-main"
                    to="/companies">
                    Şirket Ayarları
                </router-link>
                <router-link
                    class="px-6 py-3.5 text-base font-medium text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-bg-main rounded-lg text-start dark:bg-bg-main dark:hover:bg-main dark:focus:ring-bg-main"
                    to="/account-list">
                    Hesap Ayarları
                </router-link>
            </div>
        </div>
    </section>
</template>

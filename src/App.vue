<script setup>
import { RouterView } from 'vue-router'
import NavbarComponentVue from './components/NavbarComponent.vue'
import LoadingPage from '@/views/LoadingPage.vue'
</script>

<template>
    <NavbarComponentVue />
    <router-view v-slot="{ Component }">
        <template v-if="Component">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <suspense>
                        <component :is="Component"></component>
                        <template #fallback>
                            <div>
                                <LoadingPage />
                            </div>
                        </template>
                    </suspense>
                </keep-alive>
            </transition>
        </template>
    </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.32s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

body {
    background-color: rgb(255, 255, 255);
}

.center {
    margin: auto;
    width: 75%;
}
</style>

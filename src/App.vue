<script setup>
import { RouterView } from "vue-router";
import NavbarComponentVue from "./components/NavbarComponent.vue";
</script>

<template>
  <NavbarComponentVue />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
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

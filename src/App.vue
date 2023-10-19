<script setup>
import {RouterView} from "vue-router";
import NavbarComponentVue from "./components/NavbarComponent.vue";
import LoadingPage from "@/views/LoadingPage.vue";
</script>

<template>
  <NavbarComponentVue/>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
        <Suspense timeout="0">
          <component :is="Component"></component>
          <template #fallback>
            <LoadingPage/>
          </template>
        </Suspense>
    </template>
  </RouterView>
</template>


<style>

body {
  background-color: rgb(255, 255, 255);
}

.center {
  margin: auto;
  width: 75%;
}
</style>

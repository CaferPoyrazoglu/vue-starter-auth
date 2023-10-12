<script setup>
import axiosInstance from "@/api/axiosInstance";
import router from "@/router";
import { useAuthStore } from "@/stores";
import { computed, onMounted, onUnmounted } from "vue";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isUserAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
const isUser = computed(() => authStore.isUser);

function checkAuthenticationStateAndUpdateStore() {
  if (
    !localStorage.getItem("access_token") &&
    !localStorage.getItem("refresh_token")
  ) {
    authStore.logout();
    router.push("/login");
  }
  else if (!authStore.isUserAuthenticated) {
    const accessToken = localStorage.getItem("access_token");
    const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
    const userRole = decodedToken.role;
    authStore.login(userRole);

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    router.push("/");
  }
}

onMounted(() => {
  window.addEventListener("storage", checkAuthenticationStateAndUpdateStore);
});

onUnmounted(() => {
  window.removeEventListener("storage", checkAuthenticationStateAndUpdateStore);
});

const logout = async () => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    authStore.logout();

    window.dispatchEvent(new Event("localStorage"));

    await router.push("/login");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <nav
    class="navbar navbar-light navbar-expand-md fixed-top navbar-shrink py-3"
    id="mainNav"
  >
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/"
        ><span>Golive</span></router-link
      >
      <button
        data-bs-toggle="collapse"
        class="navbar-toggler"
        data-bs-target="#navcol-1"
      >
        <span class="visually-hidden">Toggle navigation</span
        ><span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcol-1">
        <ul class="navbar-nav mx-auto">
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/authenticated"
              >Hesaplar</router-link
            >
          </li>
          <li v-if="isAdmin" class="nav-item">
            <router-link class="nav-link" to="/admin">ADMIN</router-link>
          </li>
          <li v-if="isUser" class="nav-item">
            <router-link class="nav-link" to="/user">USER</router-link>
          </li>
        </ul>
        <router-link
          v-if="!isAuthenticated"
          class="btn"
          to="/login"
          >Giriş</router-link
        >
        <router-link
          v-if="isAuthenticated"
          class="btn"
          @click="logout"
          to="/signup"
          >Çıkış
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>

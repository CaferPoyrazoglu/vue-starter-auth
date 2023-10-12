<script setup>
import { ref } from "vue";
import axiosInstance from "@/api/axiosInstance";
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

const loginRequest = ref({
  email: "",
  password: "",
});
const errorMessage = ref("");
const sessionExpired = ref(false);
const authStore = useAuthStore();
const router = useRouter();

async function login() {
  try {
    clearMessages();

    const response = await axiosInstance.post(
      "auth/signin",
      loginRequest.value,
      { withCredentials: true },
    );

    const accessToken = response.data.token;
    const refreshToken = response.data.token;

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const userRole = extractUserRoleFromToken(accessToken);

    authStore.login(userRole);

    await router.push("/");
  } catch (error) {
    if (error.response) {
      showErrorMessage(error.response.data.message);
    } else if (error.request) {
      showErrorMessage(
        "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.",
      );
    } else {
      showErrorMessage("İşlem sırasında bir hata ile karşılaşıldı.");
    }
  }
}

function clearMessages() {
  errorMessage.value = "";
  sessionExpired.value = false;
}

function showErrorMessage(message) {
  errorMessage.value = message;
}

function extractUserRoleFromToken(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  return decodedToken.role;
}

if (router.currentRoute.value.query.sessionExpired) {
  sessionExpired.value = true;
}
</script>

<template>
  <section class="py-10 center">
    <div
      class="center w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Hesabınıza giriş yapın
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="login">
          <div>
            <label for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-control">E-Mail</label>
            <input v-model="loginRequest.email" required="required" type="email" name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com">
          </div>
          <div>
            <label for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white form-control">Şifre</label>
            <input v-model="loginRequest.password" type="password" name="password" placeholder="Şifre"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </div>
          <button type="submit"
            class="w-full text-white  bg-emerald-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Giriş</button>
        </form>
      </div>
    </div>
  </section>
</template>


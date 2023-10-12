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
  <section class="py-4 py-md-5 my-5">
    <div class="container py-md-5">
      <div class="row">
        <div class="col-md-5 col-xl-4 text-center text-md-start">
          <h2 class="display-6 fw-bold mb-5">
              <strong>Giriş</strong>
          </h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <input
                class="shadow form-control"
                v-model="loginRequest.email"
                required="required"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="mb-3">
              <input
                class="shadow form-control"
                v-model="loginRequest.password"
                type="password"
                name="password"
                placeholder="Şifre"
              />
            </div>
            <div class="mb-5">
              <button class="btn btn-primary shadow" type="submit">
                Giriş
              </button>
            </div>
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <div v-if="sessionExpired" class="alert alert-warning">
              Oturumunuz sonlandı.
              <br />
              Lütfen tekrar giriş yapın.
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

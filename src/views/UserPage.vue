<script setup>
import { onMounted, ref } from "vue";
import axiosInstance from "@/api/axiosInstance";

const message = ref("");
onMounted(getMessage);
async function getMessage() {
  try {
    const response = await axiosInstance.get("/user");
    if (response.status === 200) {
      message.value = response.data;
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 403) {
        message.value = e.response.data;
      } else {
        message.value = e.response.data;
      }
    } else if (e.request) {
      console.error(e.request);
      message.value =
        "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.";
    } else {
      message.value = "İşlem sırasında bir hata ile karşılaşıldı.";
    }
  }
}
</script>

<template>
  <section class="py-5 mt-5">
    <div class="container">
      <h1 class="display-4 fw-bold mb-5">
        <span class="underline">User</span> Page
      </h1>
      <div>
        <h2>{{ message }}</h2>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

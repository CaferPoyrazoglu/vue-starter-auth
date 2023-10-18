import {createApp} from "vue";
import {createPinia} from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import './index.css'

import App from "@/App.vue";
import router from "@/router";
import "@/api/interceptor";

import {vue3Spinner} from 'vue3-spinner'

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(vue3Spinner);
app.use(pinia);
app.use(router);

app.mount("#app");

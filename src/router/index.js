import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/Login.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useAuthStore } from "@/stores";
import AccountsPage from "@/views/AccountsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: redirectIfAuthenticated,
    },
    {
      path: "/accounts",
      name: "/accounts",
      component: AccountsPage,
      beforeEnter: authenticatedGuard,
    },
    {
      path: "/404",
      name: "not-found",
      component: NotFoundView,
    },
    //404
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

function redirectIfAuthenticated(to, from, next) {
  const authStore = useAuthStore();
  if (authStore.isUserAuthenticated) {
    console.warn("Zaten giriş yapılmış.");
    next({ name: "home" });
  } else {
    next();
  }
}

function authenticatedGuard(to, from, next) {
  const authStore = useAuthStore();

  const isUserAuthenticated = authStore.isUserAuthenticated;
  if (!isUserAuthenticated) {
    console.warn("Giriş yapılmamış.");
    next({ name: "login" });
  }
  else next();
}

export default router;
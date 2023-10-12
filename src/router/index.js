import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/Login.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useAuthStore } from "@/stores";
import AuthenticatedUserPage from "@/views/AuthenticatedUserPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_URL),
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
      path: "/authenticated",
      name: "authenticated",
      component: AuthenticatedUserPage,
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

function userGuard(to, from, next) {
  const authStore = useAuthStore();

  const isUserAuthenticated = authStore.isUserAuthenticated;
  console.warn(
    "authStore.isUserAuthenticated : ",
    authStore.isUserAuthenticated,
  );
  const isUser = authStore.isUser;
  console.warn("authStore.isUser : ", authStore.isUser);

  const isUserAuthenticatedAndAuthorized = isUserAuthenticated && isUser;
  const isUserAuthenticatedAndNotAuthorized = isUserAuthenticated && !isUser;

  if (!isUserAuthenticated) {
    console.warn("Giriş yapılmamış.");
    next({ name: "login" });
  }
  if (isUserAuthenticatedAndAuthorized)
    next();
  if (isUserAuthenticatedAndNotAuthorized) {
    next({ name: "home" });
    console.warn("Bu sayfayı görüntülemek için yetkiniz yok.");
  }
}

export default router;

import { createRouter, createWebHashHistory } from "vue-router";

const AuthPage = () => import("@/pages/AuthPage.vue");
const MainPage = () => import("@/pages/MainPage.vue");

const routes = [
  { path: "/", component: AuthPage },
  { path: "/main", component: MainPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";

import AuthPage from "@/pages/AuthPage.vue";
import MainPage from "@/pages/MainPage.vue";

const routes = [
  { path: "/", component: AuthPage },
  { path: "/main", component: MainPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

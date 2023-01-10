<template>
  <form @submit.prevent="onSubmit">
    <input v-model="role" type="text" />
    <input type="submit" value="Войти" />
  </form>
</template>

<script lang="ts">
import data from "@/data/data.json";

import router from "@/router";
import store from "@/store";

interface IAuthPageData {
  role: string;
}

export default {
  name: "auth-page",
  data(): IAuthPageData {
    return {
      role: "",
    };
  },
  methods: {
    onSubmit(): void {
      if (data.roles.includes(this.role)) {
        store.commit("auth/setRole", this.role);
        router.push("/main");
      } else alert("Введённой роли не существует!");
    },
  },
};
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-form ref="form" style="width: 500px" @submit.prevent="onSubmit">
        <v-text-field
          v-model="role"
          label="Введите пользователя"
        ></v-text-field>
        <v-btn prepend-icon="mdi-account-check" variant="plain" type="submit">
          Войти
        </v-btn>
      </v-form>
    </v-row>
  </v-container>
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

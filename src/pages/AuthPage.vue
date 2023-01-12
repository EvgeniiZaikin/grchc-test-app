<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-form ref="form" style="width: 500px" @submit.prevent="onSubmit">
        <v-text-field
          variant="outlined"
          v-model="role"
          label="Введите пользователя"
          :rules="[(value: string) => !!value || 'Обязательное поле']"
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
    async onSubmit(): Promise<void> {
      const { valid } = await (this.$refs.form as HTMLFormElement).validate();

      if (valid) {
        if (data.roles.includes(this.role)) {
          this.$store.commit("auth/setRole", this.role);
          this.$router.push("/main");
        } else alert("Введённой роли не существует!");
      }
    },
  },
};
</script>

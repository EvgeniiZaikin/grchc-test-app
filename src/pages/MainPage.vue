<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Текущая роль - {{ role }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-logout" @click="onExit"></v-btn>
      <template v-slot:extension>
        <v-tabs v-model="activeTab">
          <v-tab v-for="tab in tabs" :value="tab">{{ tab }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window v-model="activeTab">
      <v-list lines="one">
        <v-list-item v-for="item in items">{{ item }}</v-list-item>
      </v-list>
    </v-window>
  </v-card>
</template>

<script lang="ts">
import data from "@/data/data.json";

import router from "@/router";
import store from "@/store";

interface IMainPageData {
  activeTab: string;
}

export default {
  data(): IMainPageData {
    return {
      activeTab: "Пункт меню 1",
    };
  },
  computed: {
    role(): string {
      return store.state.auth.role;
    },
    tabs(): string[] {
      return (
        (data["role-tabs"] as Record<string, string[]>)[
          store.state.auth.role
        ] || []
      );
    },
    items(): string[] {
      const items: string[] =
        (data.items as Record<string, string[]>)[this.activeTab] || [];
      return items.filter((item: string) =>
        (data["role-items"] as Record<string, string[]>)[
          store.state.auth.role
        ].includes(item)
      );
    },
  },
  methods: {
    onExit(): void {
      store.commit("auth/setRole", null);
      router.push("/");
    },
  },
};
</script>

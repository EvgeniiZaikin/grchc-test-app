<template>
  <v-app-bar :elevation="0">
    <v-app-bar-title>Текущая роль - {{ role }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-logout" @click="onExit"></v-btn>
    </template>
  </v-app-bar>
  <section>
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.id" :value="tab.title">{{
        tab.title
      }}</v-tab>
    </v-tabs>
  </section>
  <section v-if="activeTab.length">
    <v-list lines="one">
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :title="item.label"
      ></v-list-item>
    </v-list>
  </section>
</template>

<script lang="ts">
import data from "@/data/data.json";

import router from "@/router";
import store from "@/store";

interface ITab {
  id: number;
  title: string;
  roles: string[];
}

interface IItem {
  id: number;
  label: string;
  tabs: string[];
  roles: string[];
}

interface IMainPageData {
  activeTab: string;
}

export default {
  data(): IMainPageData {
    return {
      activeTab: "",
    };
  },
  computed: {
    role(): string | null {
      return store.state.auth.role;
    },
    tabs(): ITab[] {
      return data.tabs.filter((tab: ITab) =>
        tab.roles.includes(store.state.auth.role || "")
      );
    },
    items(): IItem[] {
      return data.items.filter(
        (item: IItem) =>
          item.roles.includes(store.state.auth.role || "") &&
          item.tabs.includes(this.activeTab)
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

<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Текущая роль - {{ role }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-logout" @click="onExit"></v-btn>
      <template v-slot:extension>
        <v-tabs v-model="activeTab">
          <v-tab v-for="(tab, index) in tabs" :key="tab + index" :value="tab">{{
            tab
          }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window v-model="activeTab">
      <v-list lines="one">
        <v-list-item v-for="(item, index) in items" :key="item + index">{{
          item
        }}</v-list-item>
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
      activeTab: "",
    };
  },
  computed: {
    role(): string {
      return store.state.auth.role;
    },
    tabs(): string[] {
      const roleTabs: Record<string, string[]> = data["role-tabs"];
      return data.tabs.filter((tab: string) =>
        roleTabs[store.state.auth.role]?.includes(tab)
      );
    },
    items(): string[] {
      const tabItems: Record<string, string[]> = data["tab-items"];
      const roleItems: Record<string, string[]> = data["role-items"];
      const items: string[] = tabItems[this.activeTab];
      return items.filter((item: string) =>
        roleItems[store.state.auth.role]?.includes(item)
      );
    },
  },
  methods: {
    async onExit(): Promise<void> {
      await router.push("/");
      store.commit("auth/setRole", null);
    },
  },
  created() {
    const roleTabs: Record<string, string[]> = data["role-tabs"];
    if (roleTabs[store.state.auth.role]?.length) {
      this.activeTab = roleTabs[store.state.auth.role][0];
    }
  },
};
</script>

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
      return this.$store.state.auth.role;
    },
    tabs(): string[] {
      const roleTabs: Record<string, string[]> = data["role-tabs"];
      return data.tabs.filter((tab: string) =>
        roleTabs[this.$store.state.auth.role]?.includes(tab)
      );
    },
    items(): string[] {
      const tabItems: Record<string, string[]> = data["tab-items"];
      const roleItems: Record<string, string[]> = data["role-items"];
      const items: string[] = tabItems[this.activeTab];
      return items.filter((item: string) =>
        roleItems[this.$store.state.auth.role]?.includes(item)
      );
    },
  },
  methods: {
    async onExit(): Promise<void> {
      await this.$router.push("/");
      this.$store.commit("auth/setRole", "");
    },
  },
  created() {
    const roleTabs: Record<string, string[]> = data["role-tabs"];
    if (roleTabs[this.$store.state.auth.role]?.length) {
      this.activeTab = roleTabs[this.$store.state.auth.role][0];
    }
  },
};
</script>

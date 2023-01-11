<template>
  <h1>MainPage with role - {{ role }}</h1>
  <section>
    <button v-for="tab in tabs" :key="tab.id" @click="onTabClick(tab.title)">
      {{ tab.title }}
    </button>
  </section>
  <section v-if="activeTab.length">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.label }}</li>
    </ul>
  </section>
</template>

<script lang="ts">
import data from "@/data/data.json";

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
    onTabClick(tabTitle: string): void {
      this.activeTab = tabTitle;
    },
  },
};
</script>

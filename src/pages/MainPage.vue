<template>
  <h1>MainPage with role - {{ role }}</h1>
</template>

<script lang="ts">
import store from "@/store";

export default {
  computed: {
    role(): string | null {
      return store.state.auth.role;
    },
  },
};
</script>

import "@mdi/font/css/materialdesignicons.css";

import { createApp } from "vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "@/App.vue";

import "@/assets/reset.css";

import router from "@/router";
import store from "@/store";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(router);
app.use(store);
app.use(vuetify);

app.mount("#app");

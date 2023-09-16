import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/assets/styles/index.css";

console.log("import.meta.env", import.meta.env);
createApp(App).use(router).mount("#app");

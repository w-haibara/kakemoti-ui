import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

loadFonts();

const app = createApp(App);
app.use(ElementPlus);
app.use(vuetify);
app.mount("#app");

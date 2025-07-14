import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import './assets/main.css'
import '@icon-park/vue-next/styles/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')

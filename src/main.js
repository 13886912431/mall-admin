import Vue from "vue";
import router from "./router";
import store from "./store";
import "./plugins/ant-design-vue";
import "./assets/reset.css";
import App from "./App.vue";

Vue.component(VeIndex.VeLine.name, VeIndex.VeLine);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

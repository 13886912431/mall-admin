import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "./routes";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: process.env.VUE_APP_ENV === "prod" ? "hash" : "history",
});

router.beforeEach(async (to, from, next) => {
    const isRequireLogin = to.matched.some(item => item.meta.requireLogin);
    if (isRequireLogin) {
        const whoAmI = await store.dispatch("user/whoAmI");
        if (!whoAmI) {
            return next("/login");
        }
    }
    return next();
});

export default router;

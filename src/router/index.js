import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
});

router.beforeEach(async (to, from, next) => {
    const isRequireLogin = to.matched.some(item => item.meta.requireLogin);
    if (isRequireLogin) {
        const whoAmI = await store.dispatch('user/whoAmI');
        if (!whoAmI) {
            return next('/login');
        }
        if (!to.meta.roles.includes(whoAmI.role)) {
            return next('/');
        }
    }
    return next();
});

export default router;

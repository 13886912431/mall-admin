export default {
    namespaced: true,
    state: {
        user: {},
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        login({ commit }, userInfo) {
            commit('setUser', userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo));
        },
        logout({ commit }) {
            commit('setUser', null);
            localStorage.removeItem('user');
        },
        whoAmI({ commit }) {
            let user = localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                commit('setUser', user);
                return user;
            }
            return false;
        },
    },
};

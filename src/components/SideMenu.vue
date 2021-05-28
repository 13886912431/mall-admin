<template>
    <menu class="side-menu">
        <a-menu
            :defaultOpenKeys="[$route.matched[0].name]"
            :selectedKeys="[$route.name]"
            mode="inline"
            theme="dark"
            :inlineCollapsed="collapsed"
        >
            <a-sub-menu
                v-for="item in menu"
                :key="item.name"
            >
                <span
                    slot="title"
                    v-if="item.meta.roles.includes(($store.getters['user/getUser'] || {}).role)"
                >
                    <a-icon :type="item.meta.icon" />
                    <span>{{ item.meta.title }}</span>
                </span>
                <template v-for="it in item.children">
                    <a-menu-item
                        :key="it.name"
                        v-if="it.meta.roles.includes(($store.getters['user/getUser'] || {}).role)"
                    >
                        <router-link :to="{ name: it.name }" tag="div">
                            <a-icon :type="it.meta.icon" />
                            <span>{{ it.meta.title }}</span>
                        </router-link>
                    </a-menu-item>
                </template>
            </a-sub-menu>
        </a-menu>
    </menu>
</template>

<script>
import { menu } from '@/router/routes';

export default {
    name: 'Menu',
    model: {
        prop: 'collapsed'
    },
    props: ['collapsed'],
    data() {
        return {
            menu: Object.freeze(menu)
        };
    }
};
</script>

<style lang="less" scoped>
.side-menu {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 999;
    user-select: none;

    .ant-menu {
        height: 100%;
    }
}
</style>

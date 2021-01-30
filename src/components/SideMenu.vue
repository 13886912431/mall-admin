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
                v-for="route in routes"
                :key="route.name"
            >
                <span slot="title">
                    <a-icon :type="route.meta.icon" />
                    <span>{{ route.meta.title }}</span>
                </span>
                <a-menu-item
                    v-for="child in route.children"
                    :key="child.name"
                >
                    <router-link :to="{ name: child.name }" tag="div">
                        <a-icon :type="child.meta.icon" />
                        <span>{{ child.meta.title }}</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </menu>
</template>

<script>
import roleToMenu from "@/utils/roleToMenu";

export default {
    name: "Menu",
    model: {
        prop: "collapsed"
    },
    props: ["collapsed"],
    data() {
        return {
            routes: roleToMenu(this.$store.getters['user/getUser'].role)
        };
    },
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

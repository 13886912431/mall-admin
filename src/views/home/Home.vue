<template>
    <div class="home">
        <SideMenu v-model="collapsed" :style="{
            'width': collapsed ? '80px' : '180px'
        }"/>

        <main :style="{
            'margin-left': collapsed ? '80px' : '180px'
        }">
            <TopNav v-model="collapsed" />
            <router-view />
        </main>
    </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';
import TopNav from '@/components/TopNav.vue';

export default {
    name: 'Home',
    components: {
        SideMenu,
        TopNav
    },
    data() {
        return {
            collapsed: false
        };
    }
};
</script>

<style lang="less" scoped>
.home {
    height: 100%;
}
main {
    transition: margin-left 0.3s cubic-bezier(0.2, 0, 0, 1);
    height: 100%;
}
</style>

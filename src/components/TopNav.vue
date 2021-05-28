<template>
    <header class="top-nav">
        <div class="left">
            <a-button type="primary" @click="$emit('click', !collapsed)">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <div class="breadcrumb">
                <a-breadcrumb>
                    <a-breadcrumb-item
                        v-for="item in $route.matched"
                        :key="item.name"
                    >
                        {{ item.meta.title }}
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </div>
        </div>
        <ul class="user-info">
            <li>
                欢迎 {{ $store.getters['user/getUser'].username }}
                <a-icon type="down" style="margin-left: 5px;" />
            </li>
            <li @click="logout">退出登录</li>
        </ul>
    </header>
</template>

<script>
export default {
    name: 'TopNav',
    model: {
        prop: 'collapsed',
        event: 'click'
    },
    props: ['collapsed'],
    methods: {
        logout() {
            this.$store.dispatch('user/logout');
            this.$router.push('/login');
        }
    },
};
</script>

<style lang="less" scoped>
.top-nav {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    position: relative;
    z-index: 100;

    .left {
        display: flex;
        align-items: center;

        .breadcrumb {
            margin-left: 10px;
        }
    }

    .user-info {
        height: 100%;
        line-height: 50px;
        text-align: center;
        cursor: pointer;

        li {
            height: 100%;
            padding: 0 30px;

            &:not(:first-of-type) {
                display: none;
                background-color: #f5f5f5;
                &:hover {
                    background-color: #1890ff;
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
        &:hover li {
            display: block;
        }
    }
}
</style>

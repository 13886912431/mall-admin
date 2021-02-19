<template>
    <div id="app">
        <a-config-provider :locale="zhCn">
            <router-view />
        </a-config-provider>
    </div>
</template>

<script>
import zhCn from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
    name: "App",
    data() {
        return {
            zhCn
        };
    }
};
</script>

<style>
#app {
    color: #2c3e50;
    height: 100%;
}
</style>

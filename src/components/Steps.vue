<template>
    <div class="steps">
        <div class="steps-area center">
            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item" :title="item" />
            </a-steps>
        </div>
        <div class="steps-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Steps",
    props: ["current", "steps"],
};
</script>

<style lang="less" scoped>
.steps {
    .steps-area {
        height: 70px;
    }
    .ant-steps {
        width: 60%;
    }
    .steps-content {
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 50px;
    }

    .steps-action {
        margin-top: 24px;
    }
}
</style>

<template>
    <div class="search-area">
        <a-form-model
            layout="inline"
            :model="form"
        >
            <div>
                <a-form-model-item label="搜索关键字">
                    <a-input v-model.trim="form.searchWord" placeholder="输入关键字" />
                </a-form-model-item>
                <a-form-model-item label="商品类名">
                    <a-select
                        v-model="form.category"
                        style="width: 194px;"
                        allowClear
                        placeholder="选择商品类名"
                    >
                        <a-select-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :value="item.id"
                        >
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item>
                    <a-button type="primary" @click="$emit('submit', form)">
                        搜索
                    </a-button>
                </a-form-model-item>
            </div>
            <a-form-model-item class="add-product">
                <a-button @click="$router.push({ name: 'ProductAdd' })">
                    添加商品
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
export default {
    name: 'SearchArea',
    data() {
        return {
            form: {
                searchWord: '',
                category: ''
            },
        };
    },
    props: ['categoryList'],
};
</script>

<style lang="less" scoped>
.search-area {
    padding: 10px 20px;

    .ant-form {
        display: flex;
        justify-content: space-between;
    }
}
</style>

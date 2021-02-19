<template>
    <div class="basic-detail">
        <a-form-model
            ref="form"
            :model="form"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 13 }"
        >
            <a-form-model-item label="标题" required prop="title">
                <a-input v-model="form.title"/>
            </a-form-model-item>
            <a-form-model-item label="商品描述" prop="desc">
                <a-input v-model="form.desc" type="textarea"/>
            </a-form-model-item>
            <a-form-model-item label="商品类名" required prop="category" >
                <a-select
                    v-model="form.category"
                    allowClear
                    @change="changeCategory"
                >
                    <a-select-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :value="item.id"
                    >
                        {{ item.name }}
                    </a-select-option>
                </a-select>
                <a-select v-model="form.c_item" allowClear>
                    <a-select-option v-for="item in categoryItems" :key="item" :value="item">
                        {{ item }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="商品标签" required prop="tags">
                <a-select
                    v-model="form.tags"
                    mode="tags"
                >
                    <a-select-option
                        v-for="item in defaultTags"
                        :key="item"
                        :value="item"
                    >
                        {{ item }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="margin-top: 60px;">
                <a-button type="primary" @click="next">
                    下一步
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import categoryApi from "@/api/category";

export default {
    name: "BasicDetail",
    data() {
        return {
            defaultTags: ["包邮，最晚次日送达"],
            categoryList: [],
            categoryItems: [],
            categoryMap: {}
        };
    },
    props: ["form"],
    methods: {
        next() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit("next");
                }
            });
        },
        changeCategory(id) {
            if (!this.$route.query.editid) {
                this.form.c_item = "";
            }
            this.categoryItems = this.categoryMap[id];
        },
        async getCategoryList() {
            const res = await categoryApi.categoryList();
            console.log(res);
            this.categoryList = res.data;
            this.categoryList.forEach(item => {
                this.categoryMap[item.id] = item.c_items;
            });
            if (this.form.category) {
                this.changeCategory(this.form.category);
            }
        },
    },
    created() {
        this.getCategoryList();
    },
};
</script>

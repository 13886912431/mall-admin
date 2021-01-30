<template>
    <div class="product-add">
        <Steps :steps="steps" :current="current">
            <template #content>
                <BasicDetail v-if="current === 0" @next="next" :form="form"/>
                <SaleDetail v-else-if="current === 1" @prev="prev" @next="next" :form="form"/>
            </template>
        </Steps>
    </div>
</template>

<script>
import Steps from "@/components/Steps.vue";
import BasicDetail from "@/components/BasicDetail.vue";
import SaleDetail from "@/components/SaleDetail.vue";
import productApi from "@/api/product";

export default {
    name: "ProductAdd",
    data() {
        return {
            current: 0,
            form: {
                title: "",
                desc: "",
                category: "",
                c_items: "",
                tags: [],

                price: "",
                price_off: "",
                inventory: "",
                unit: "",
                images: [],
                status: true
            },
            steps: [
                "填写商品基本信息",
                "填写商品销售信息"
            ]
        };
    },
    components: {
        Steps,
        BasicDetail,
        SaleDetail
    },
    methods: {
        async next() {
            if (this.current === this.steps.length - 1) {
                const data = {
                    ...this.form,
                    c_items: this.form.c_items && this.form.c_items.split(" "),
                    status: this.form.status ? 1 : 0,
                    images: this.form.images.map(item => item.response.data.url)
                };
                await productApi.add(data);
                this.$modal.confirm({
                    title: "添加成功",
                    mask: true,
                    cancelText: "继续添加",
                    okText: "查看商品列表",
                    icon: "check-circle",
                    onOk: (close) => {
                        close();
                        this.$router.push({ name: "ProductList" });
                    },
                    onCancel: (close) => {
                        close();
                        this.current = 0;
                        const temp = {};
                        for (const key in this.form) {
                            if (Array.isArray(this.form[key])) {
                                temp[key] = [];
                            } else if (typeof this.form[key] === "boolean") {
                                temp[key] = true;
                            } else if (typeof this.form[key] === "string") {
                                temp[key] = "";
                            }
                        }
                        this.form = temp;
                    }
                });
            } else {
                this.current += 1;
            }
        },
        prev() {
            this.current -= 1;
        }
    }
};
</script>

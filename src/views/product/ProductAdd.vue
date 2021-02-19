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
    components: {
        Steps,
        BasicDetail,
        SaleDetail
    },
    data() {
        return {
            current: 0,
            form: {
                title: "",
                desc: "",
                category: "",
                c_item: "",
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
    methods: {
        async next() {
            if (this.current === this.steps.length - 1) {
                const { editid } = this.$route.query;
                console.log(this.form);
                const data = {
                    ...this.form,
                    c_items: this.form.c_item && this.form.c_item.split(" "),
                    status: this.form.status ? 1 : 0,
                    images: this.form.images.map(item => item.url)
                };
                delete data.c_item;
                console.log(data);
                let title = "添加成功";
                if (editid) {
                    title = "修改成功";
                    await productApi.edit(data);
                    sessionStorage.removeItem("editForm");
                    this.$router.replace({
                        name: "ProductAdd"
                    });
                } else {
                    await productApi.add(data);
                }
                this.$modal.success({
                    title,
                    mask: true,
                    okText: "完成",
                    icon: "check-circle",
                    onOk: close => {
                        close();
                        this.$router.push({ name: "ProductList" });
                    },
                });
            } else {
                this.current += 1;
            }
        },
        prev() {
            this.current -= 1;
        }
    },
    created() {
        const { editid } = this.$route.query;
        if (editid) {
            let editForm = sessionStorage.getItem("editForm");
            if (editForm) {
                editForm = JSON.parse(editForm);
                editForm.images = editForm.images.map((item, index) => ({
                    uid: index,
                    name: `image-${index}.png`,
                    status: 'done',
                    url: item
                }));
                editForm.status = editForm.status === 1;
                this.form = editForm;
            }
        }
    },
};
</script>

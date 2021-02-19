<template>
    <div class="sale-detail">
        <a-form-model
            ref="form"
            :model="form"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 13 }"
        >
            <a-form-model-item label="商品售价" required prop="price">
                <a-input v-model.number="form.price"/>
            </a-form-model-item>
            <a-form-model-item label="商品折扣价">
                <a-input v-model.number="form.price_off"/>
            </a-form-model-item>
            <a-form-model-item label="商品库存" required prop="inventory">
            <a-input v-model.number="form.inventory"/>
            </a-form-model-item>
            <a-form-model-item label="计量单位" required prop="unit">
                <a-input v-model="form.unit"/>
            </a-form-model-item>
            <a-form-model-item label="商品相册">
                 <a-upload
                    :action="action"
                    list-type="picture-card"
                    :file-list="form.images"
                    name="avatar"
                    @preview="handlePreview"
                    @change="handleChange"
                >
                    <div v-if="form.images.length < 8">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">上传</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
                    <img style="width: 100%" :src="previewImage" />
                </a-modal>
            </a-form-model-item>
            <a-form-model-item label="是否上架" style="text-align: left;">
                <a-checkbox v-model="form.status"></a-checkbox>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="margin-top: 20px;">
                <a-button @click="prev">
                    上一步
                </a-button>
                <a-button type="primary" @click="next">
                    提交
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export default {
    name: "SaleDetail",
    data() {
        return {
            previewVisible: false,
            previewImage: "",
            action: `https://mallapi.duyiedu.com/upload/images?appkey=${this.$store.getters["user/getUser"].appkey}`
        };
    },
    props: ["form"],
    methods: {
        prev() {
            this.$emit("prev");
        },
        next() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const addFile = this.form.images.filter(item => item.response);
                    if (addFile.length > 0) {
                        const result = addFile.map(item => {
                            const data = {
                                ...item.response.data, uid: item.uid
                            };
                            delete data.thumbUrl;
                            return data;
                        });
                        this.form.images = [
                            ...result,
                            ...this.form.images.filter(item => !item.response)
                        ];
                    }
                    console.log(this.form.images);
                    this.$emit("next", this.form);
                }
            });
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.form.images = fileList;
        },
    },
};
</script>

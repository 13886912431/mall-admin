<template>
    <div class="product-list">
        <SearchArea @submit="submit" :categoryList="categoryList" />
        <ProductTable
            :data="productList"
            :page="page"
            @changePage="changePage"
            @delete="handleDelete"
        />
    </div>
</template>

<script>
import ProductTable from '@/components/ProductTable.vue';
import SearchArea from '@/components/SearchArea.vue';
import productApi from '@/api/product';
import categoryApi from '@/api/category';

export default {
    name: 'ProductList',
    components: {
        SearchArea,
        ProductTable,
    },
    data() {
        return {
            page: {
                current: 1,
                pageSize: 10,
                total: 1,
                showSizeChanger: true,
            },
            searchForm: {},
            productList: [],
            categoryList: [],
            categoryMap: {}
        };
    },
    methods: {
        submit(searchForm) {
            this.searchForm = searchForm;
            this.getProductList();
        },
        async getProductList() {
            const params = {
                page: this.page.current,
                size: this.page.pageSize,
                ...this.searchForm
            };
            const res = await productApi.productList({ params });
            this.productList = res.data.map(item => ({
                ...item,
                categoryName: this.categoryMap[item.category]
            }));
            this.page.total = res.total;
        },
        async getCategoryList() {
            const res = await categoryApi.categoryList();
            this.categoryList = res.data;
            this.categoryList.forEach(item => {
                this.categoryMap[item.id] = item.name;
            });
        },
        changePage(pagination) {
            this.page.current = pagination.current;
            this.page.pageSize = pagination.pageSize;
            this.getProductList();
        },
        handleDelete() {
            this.getProductList();
        }
    },
    async created() {
        await this.getCategoryList();
        this.getProductList();
    }
};
</script>

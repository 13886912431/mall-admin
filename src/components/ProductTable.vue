<template>
    <div class="product-table">
        <a-table
            :columns="columns"
            :data-source="tableData"
            :pagination="page"
            @change="$emit('changePage', $event)"
        >
            <div slot="operate" slot-scope="record" class="operate">
                <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
                <a-button type="danger" @click="handleDelete(record)">删除</a-button>
            </div>
            <div slot="images" slot-scope="record" class="images">
                <img :src="record[0]" width="90" height="90" />
            </div>
        </a-table>
    </div>
</template>

<script>
import productApi from '@/api/product';

export default {
    name: 'ProductTable',
    props: ['data', 'page'],
    data() {
        return {
            columns: [
                {
                    title: 'id',
                    dataIndex: 'id'
                },
                {
                    title: '图片',
                    dataIndex: 'images',
                    scopedSlots: { customRender: 'images' }
                },
                {
                    title: '标题',
                    dataIndex: 'title'
                },
                {
                    title: '描述',
                    dataIndex: 'desc',
                },
                {
                    title: '类目',
                    dataIndex: 'categoryName',
                },
                {
                    title: '预售价格',
                    dataIndex: 'price',
                },
                {
                    title: '折扣价格',
                    dataIndex: 'price_off',
                },
                {
                    title: '标签',
                    dataIndex: 'tags',
                },
                {
                    title: '限制购买数量',
                    dataIndex: 'inventory',
                },
                {
                    title: '上架状态',
                    dataIndex: 'status',
                    customRender: text => (text === 1 ? '上架' : '下架')
                },
                {
                    title: '操作',
                    key: 'operate',
                    scopedSlots: { customRender: 'operate' }
                }
            ]
        };
    },
    computed: {
        tableData() {
            return this.data.map(item => ({ ...item, key: item.id }));
        }
    },
    methods: {
        handleEdit(record) {
            sessionStorage.setItem('editForm', JSON.stringify(record));
            this.$router.push({
                name: 'ProductAdd',
                query: { editid: record.id }
            });
        },
        handleDelete(record) {
            this.$modal.confirm({
                title(h) {
                    return (
                        <div>确定删除 <span style="color: #1890ff;">{ record.title }</span> 吗？</div>
                    );
                },
                mask: true,
                maskClosable: true,
                cancelText: '取消',
                okText: '确定',
                onOk: async close => {
                    await productApi.delete(record.id);
                    close();
                    this.$message.success('删除成功');
                    this.$emit('delete');
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.operate,
/deep/.ant-table-thead {
    white-space: nowrap;
}
.operate {
    .ant-btn {
        &:first-child {
            margin-right: 5px;
        }
    }
}
</style>

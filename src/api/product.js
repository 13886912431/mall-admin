import axios from '@/axios';

export default {
    productList: params => axios.get('/products/all', params),
    delete: id => axios.delete(`/products/${id}`),
    add: params => axios.post('/products/add', params),
    edit: params => axios.put('/products/edit', params)
};

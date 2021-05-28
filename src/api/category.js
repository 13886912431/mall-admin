import axios from '@/axios';

export default {
    categoryList: params => axios.get('/category/all', params),
};

import axios from '@/axios';

export default {
    login: params => axios.post('/passport/login', params),
    logon: params => axios.post('/passport/logon', params),
    getCode: params => axios.post('/passport/getCode', params),
};

import axios from "axios";
import store from "./store";

const instance = axios.create({
    baseURL: "https://mallapi.duyiedu.com/",
    timeout: 10000
});

instance.interceptors.request.use(request => {
    if (request.url.includes("passport")) {
        return request;
    }
    request.params = {
        ...request.params,
        appkey: store.getters["user/getUser"].appkey
    };
    return request;
}, error => Promise.reject(error));

instance.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.status === "fail") {
            return Promise.reject(response.data.msg);
        }
        if (response.data.status === "success") {
            return response.data.data;
        }
    }
    return response;
}, error => Promise.reject(error));

export default instance;

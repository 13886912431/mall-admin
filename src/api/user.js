import axios from "@/axios";

export default {
    login: params => axios.post("/passport/login", params),
};

import axios from "axios";
import { decryptData } from "@/modules/util/cryptoUtils";

const Axios = axios.create({
    baseURL: "https://dev.api.hellodogwhiz.com/api/v1",
    timeout: 180000,
});

Axios.interceptors.request.use(
    function (config) {
        const encodedtoken = localStorage.getItem('token');
        if (encodedtoken) {
            const tokenInfo = decryptData(encodedtoken);
            const accessToken = tokenInfo.accessToken;
            config.headers.Authorization = 'Bearer ' + accessToken;
        }
        return config;
    },
    function (error) {
        return error;
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return error;
    }
)

export default Axios;
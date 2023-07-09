import axios from "axios";

const Axios = axios.create({
    baseURL: "https://dev.api.hellodogwhiz.com/api/v1",
    timeout: 180000,
});

Axios.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('loginInfo');
        if (accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }
        return config;
    },
    function (error) {
        return Promise.reject(`요청 중 오류가 발생 하였습니다.(${error.code})`);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(`잠시 후 다시 이용해 주세요.(${error.code})`);
    }
)

export default Axios;
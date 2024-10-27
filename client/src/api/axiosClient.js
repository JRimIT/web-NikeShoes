import axios from '../../src/utils/axios.customize';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOTNET_API_URL,
    timeout: 300000
});

instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
import axios from "axios";


const api = axios.create({
    baseURL: "https://tastybites-backend-9grq.onrender.com/api"
});


api.interceptors.request.use(function (config) {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});


export default api;

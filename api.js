import axios from "axios";

const api = axios.create({
    baseURL: 'https://backend-production-c547.up.railway.app/floricultura/'
})

export default api;
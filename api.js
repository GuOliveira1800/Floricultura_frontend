import axios from "axios";

const api = axios.create({
    baseURL: 'http://26.199.74.95:8080/'
})

export default api;
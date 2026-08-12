import axios from "axios";

const api = axios.create( {
    baseURL: import.meta.env.VITE_SERVERLINK , // Replace with your backend API URL
    withCredentials: true, // Include credentials (cookies) in requests
})

export default api;

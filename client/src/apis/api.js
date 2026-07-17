import axios from "axios";

const api = axios.create( {
    baseURL: import.meta.env.VITE_SERVERLINK || 'http://localhost:3000', // Replace with your backend API URL
    withCredentials: true, // Include credentials (cookies) in requests
})

export default api;
import axios from "axios";

const API_BASE_URL = "https://silent-cipher.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;

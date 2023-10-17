import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL + "/api";

const axiosInstance = axios.create({
    baseURL,
});

const token = localStorage.getItem("access_token");
if (token != null) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;

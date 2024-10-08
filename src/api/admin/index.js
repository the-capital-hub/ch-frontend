import axios from "axios";
import { environment } from "../../environments/environment";

const adminInstance = axios.create({
  baseURL: `${environment.baseUrl}/api/v1/admin/`,
  withCredentials: true,
});

// Request interceptor
adminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tchAdminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
adminInstance.interceptors.response.use(
  (response) => {
    return response?.data || response;
  },
  (error) => {
    return Promise.reject(error?.response?.data || error);
  }
);

export default adminInstance;

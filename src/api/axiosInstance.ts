import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",  // change for production
  timeout: 15000,
});

// Add Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("📤 API Request:", config.method?.toUpperCase(), config.url);

    // Add JWT Token automatically
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("📥 API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

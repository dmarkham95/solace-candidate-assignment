import axios from "axios";

const BaseService = axios.create({
  timeout: 60000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

BaseService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    return Promise.reject(error);
  }
);

export default BaseService;

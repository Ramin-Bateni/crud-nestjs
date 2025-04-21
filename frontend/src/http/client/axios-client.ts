import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://192.168.1.52:3000";
const API_TIMEOUT = 30000; // 30 seconds

const createAxiosClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      const { response } = error;

      if (response) {
        const status = response.status;

        if (status === 401) {
          localStorage.removeItem("accessToken");
        } else if (status === 403) {
          toast.error("You do not have permission to perform this action");
        } else if (status === 404) {
          toast.error("Resource not found");
        } else if (status >= 500) {
          toast.error("Server error. Please try again later");
        } else {
          const errorMessage =
            (response.data as any)?.message || "An error occurred";
          toast.error(errorMessage);
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error("An error occurred. Please try again");
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const axiosClient = createAxiosClient();

export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosClient
      .get<T, AxiosResponse<T>>(url, config)
      .then((response) => response.data);
  },

  post: <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosClient
      .post<T, AxiosResponse<T>, D>(url, data, config)
      .then((response) => response.data);
  },

  put: <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosClient
      .put<T, AxiosResponse<T>, D>(url, data, config)
      .then((response) => response.data);
  },

  patch: <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosClient
      .patch<T, AxiosResponse<T>, D>(url, data, config)
      .then((response) => response.data);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosClient
      .delete<T, AxiosResponse<T>>(url, config)
      .then((response) => response.data);
  },
};

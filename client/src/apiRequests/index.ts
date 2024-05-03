import axios from "axios";

export interface IDefaultResponse<TData> {
  success: boolean;
  statusCode: number;
  errors?: string[];
  data: TData;
}

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

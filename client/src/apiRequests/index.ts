import axios from "axios";

const SERVER_BASE_URL = "http://localhost:5000/api/v1";

export interface IDefaultResponse<TData> {
  success: boolean;
  status_code: number;
  errors?: string[];
  data: TData | null;
}

export const axiosPublic = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

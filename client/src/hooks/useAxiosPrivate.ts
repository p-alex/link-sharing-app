import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivate } from "../apiRequests";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import useRefreshToken from "./useRefreshToken";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  sent: boolean;
}

const useAxiosPrivate = () => {
  const { authState } = useAuth();
  const handleRefreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authState.accessToken}`;
        }
        if (!config.withCredentials) {
          config.withCredentials = true;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config as CustomInternalAxiosRequestConfig;
        if (error.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await handleRefreshToken();
          prevRequest!.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest!);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [authState, handleRefreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;

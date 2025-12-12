import axiosInstance from "./axiosInstance";

export const apiGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params });

export const apiPost = (url: string, data?: any) =>
  axiosInstance.post(url, data);

export const apiPut = (url: string, data?: any) =>
  axiosInstance.put(url, data);

export const apiDelete = (url: string) =>
  axiosInstance.delete(url);

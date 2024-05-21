import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getAllBrand = () =>
  request<any>("get", `${API}/${endpoints.brand.getAll}`);

export const createBrand = (body: any) =>
  request<any>("post", `${API}/${endpoints.brand.create}`, body);

export const deleteBrand = (id: string) =>
  request<any>("delete", `${API}/${endpoints.brand.delete}/${id}`);

export const updateBrand = (id: string, body: any) =>
  request<any>("put", `${API}/${endpoints.brand.update}/${id}`, body);

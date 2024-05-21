import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getAllProductType = () =>
  request<any>("get", `${API}/${endpoints.productType.getAll}`);

export const createProductType = (body: any) =>
  request<any>("post", `${API}/${endpoints.productType.create}`, body);

export const deleteProductType = (id: string) =>
  request<any>("delete", `${API}/${endpoints.productType.delete}/${id}`);

export const updateProductType = (id: string, body: any) =>
  request<any>("put", `${API}/${endpoints.productType.update}/${id}`, body);

import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getAllCategory = () =>
  request<any>("get", `${API}/${endpoints.category.getAll}`);

export const createCategory = (body: any) =>
  request<any>("post", `${API}/${endpoints.category.create}`, body);

export const deleteCategory = (id: string) =>
  request<any>("delete", `${API}/${endpoints.category.delete}/${id}`);

export const updateCategory = (id: string, body: any) =>
  request<any>("put", `${API}/${endpoints.category.update}/${id}`, body);

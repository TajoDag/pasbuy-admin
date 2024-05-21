import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getAllSize = () =>
  request<any>("get", `${API}/${endpoints.size.getAll}`);

export const createSize = (body: any) =>
  request<any>("post", `${API}/${endpoints.size.create}`, body);

export const deleteSize = (id: string) =>
  request<any>("delete", `${API}/${endpoints.size.delete}/${id}`);

export const updateSize = (id: string, body: any) =>
  request<any>("put", `${API}/${endpoints.size.update}/${id}`, body);

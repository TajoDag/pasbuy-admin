import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getListUser = (body: any) =>
  request<any>("post", `${API}/${endpoints.user.list}`, body);

export const getListUserAll = () =>
  request<any>("get", `${API}/${endpoints.user.all}`);

export const getListCustomer = (body: any) =>
  request("post", `${API}/${endpoints.user.getCustomers}`, body);

export const getDetailUser = (id: string) =>
  request<any>("get", `${API}/${endpoints.user.detailUsers}/${id}`);

export const updateDetailUser = (id: string, body: any) =>
  request<any>("put", `${API}/${endpoints.user.detailUsers}/${id}`, body);

export const deleteUser = (id: string) =>
  request<any>("delete", `${API}/${endpoints.user.detailUsers}/${id}`);

export const resetPassword = (body: any) =>
  request<any>("post", `${API}/${endpoints.user.resetPassword}`, body);

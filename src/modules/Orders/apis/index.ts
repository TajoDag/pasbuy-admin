import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";


export const createOrder = (body: any) =>
  request<any>("post", `${API}/${endpoints.order.create}`, body);

export const getOrders = (body: any) =>
  request<any>("post", `${API}/${endpoints.order.getList}`, body);

export const updateStatusOrders = (id: string, body: any) =>
  request<any>("put", `${API}/${endpoints.order.updateStatus}/${id}`, body);

export const updateStatusOrdersAgency = (id: string, body: any) =>
  request("put", `${API}/${endpoints.order.updateStatusAgency}/${id}`, body);

export const getOrdersAdmin = (body: any) =>
  request<any>("post", `${API}/${endpoints.order.getListOrderAdmin}`, body);


export const getOrdersAgencyAdmin = (body: any) =>
  request<any>("post", `${API}/${endpoints.order.getListOrderAgency}`, body);

export const updateOrdersAgencyAdmin = (body: any) =>
  request<any>("put", `${API}/${endpoints.order.updateStatusOrdersAdmin}`, body);


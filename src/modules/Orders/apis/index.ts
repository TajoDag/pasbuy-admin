import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";


export const createOrder = (body: any) =>
  request<any>("post", `${API}/${endpoints.order.create}`, body);

export const getOrders = (body: any) =>
  request<any>("post", `${API}/${endpoints.order.getList}`, body);


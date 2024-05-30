import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const depositToUser = (body: any) =>
    request<any>("post", `${API}/${endpoints.deposit.addToUser}`, body);
export const getListDeposit = (body: any) =>
    request<any>("post", `${API}/${endpoints.deposit.getListDeposit}`, body);

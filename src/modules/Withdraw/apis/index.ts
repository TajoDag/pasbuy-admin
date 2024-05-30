import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getListWithdraw = (body: any) =>
    request<any>("post", `${API}/${endpoints.withdraw.getListWithdraw}`, body);

export const confirmWithdraw = (id: any, body: any) =>
    request<any>("put", `${API}/${endpoints.withdraw.confirm}/${id}`, body);
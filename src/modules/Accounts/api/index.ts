import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getListUser = (body: any) =>
    request<any>("post", `${API}/${endpoints.user.list}`, body);

export const getListUserAll = () =>
    request<any>("get", `${API}/${endpoints.user.all}`);
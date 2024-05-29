import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getKeyChat = (id: string) =>
    request<any>("get", `${API}/${endpoints.keyChat.get}/${id}`);

export const changeKeyChat = (id: string, payload: any) =>
    request<any>("put", `${API}/${endpoints.keyChat.put}/${id}`, payload);

export const createLogoHeader = (body: any) =>
    request<any>("post", `${API}/${endpoints.logoHeader.create}`, body);

export const getLogoHeader = (id: any) =>
    request<any>("get", `${API}/${endpoints.logoHeader.getDetail}/${id}`,);
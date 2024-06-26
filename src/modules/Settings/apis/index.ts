import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";

export const getKeyChat = (id: string) =>
  request<any>("get", `${API}/${endpoints.keyChat.get}/${id}`);

export const changeKeyChat = (id: string, payload: any) =>
  request<any>("put", `${API}/${endpoints.keyChat.put}/${id}`, payload);

export const createLogoHeader = (id: any, body: any) =>
  request<any>("put", `${API}/${endpoints.logoHeader.getDetail}/${id}`, body);

export const getLogoHeader = (id: any) =>
  request<any>("get", `${API}/${endpoints.logoHeader.getDetail}/${id}`);

export const createLogoFooter = (id: any, body: any) =>
  request<any>("put", `${API}/${endpoints.logoFooter.create}/${id}`, body);

export const getLogoFooter = (id: any) =>
  request<any>("get", `${API}/${endpoints.logoFooter.getDetail}/${id}`);

export const getBanner = (id: any) =>
  request<any>("get", `${API}/${endpoints.banner.get}/${id}`);

export const createBanner = (body: any) =>
  request<any>("post", `${API}/${endpoints.banner.create}`, body);

export const publicBanner = (id: any, body: any) =>
  request<any>("put", `${API}/${endpoints.banner.update}/${id}`, body);

export const getLiveChat = () =>
  request<any>("get", `${API}/${endpoints.liveChat.get}`);



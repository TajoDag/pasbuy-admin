import { ILogin, IResultLogin } from "../../interfaces/auth";
import { API, endpoints } from "../endpoint";
import { request } from "../request";


export const loginUser = (body: ILogin) =>
    request<IResultLogin>("post", `${API}/${endpoints.auth.login}`, body);

// export const loginUser = (body: ILogin) =>
//     request<IResultLogin>("post", `${API}/${endpoints.auth.login}`, body);
import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";
import { IProduct, IProductTable, ISearchProduct } from "../interfaces";

export const getListProducts = (body: ISearchProduct) =>
  request<IProductTable>("post", `${API}/${endpoints.product.list}`, body);
export const getListTotal = (body: any) =>
  request<any>("post", `${API}/${endpoints.product.list}`,body);

export const createProduct = (body: IProduct) =>
  request<any>("post", `${API}/${endpoints.product.create}`, body);

export const deleteProduct = (id: string) =>
  request<any>("delete", `${API}/${endpoints.product.delete}/${id}`);

export const changeProductStatus = (id: string, url: string, body: any) =>
  request<any>("put", `${API}/product/${id}/${url}`, body);

export const getProductDetail = (id: string) =>
  request<any>("get", `${API}/${endpoints.product.getDetail}/${id}`);

export const updateProduct = (id: string, body: IProduct) =>
  request<any>("put", `${API}/${endpoints.product.getDetail}/${id}`, body);
export const getTotalProducts = () =>
  request<any>("get", `${API}/${endpoints.product.getTotal}`);

import { API, endpoints } from "../../../api/endpoint";
import { request } from "../../../api/request";
import { IProduct, IProductTable, ISearchProduct } from "../interfaces";

export const getListProducts = (body: ISearchProduct) =>
  request<IProductTable>("post", `${API}/${endpoints.product.list}`, body);

export const createProduct = (body: IProduct) =>
  request<any>("post", `${API}/${endpoints.product.create}`, body);

export const deleteProduct = (id: string) =>
  request<any>("delete", `${API}/${endpoints.product.delete}/${id}`,);

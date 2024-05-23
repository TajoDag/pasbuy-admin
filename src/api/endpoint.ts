export const API = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  auth: {
    login: `login`,
  },
  product: {
    list: `admin/products/all`,
    create: `admin/products`,
    delete: `product`,
    getDetail: `product`,
    getTotal: `product/total`
  },
  category: {
    getAll: `admin/categories/all`,
    create: `admin/categories/create`,
    delete: `admin/categories/delete`,
    update: `admin/categories/edit`,
  },
  productType: {
    getAll: `admin/product-type/all`,
    create: `admin/product-type/create`,
    delete: `admin/product-type/delete`,
    update: `admin/product-type/edit`,
  },
  brand: {
    getAll: `admin/brand/all`,
    create: `admin/brand/create`,
    delete: `admin/brand/delete`,
    update: `admin/brand/edit`,
  },
  size: {
    getAll: `admin/size/all`,
    create: `admin/size/create`,
    delete: `admin/size/delete`,
    update: `admin/size/edit`,
  },
  order: {
    create: `admin/order/create`,
    getList: `order/all`,
    updateStatus: `admin/order/status`,

  },
};

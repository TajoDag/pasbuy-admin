export const API = import.meta.env.VITE_API_BASE_URL;

export const SOCKET_URL = import.meta.env.VITE_API_BASE_SOCKET;

export const endpoints = {
  auth: {
    login: `login`,
  },
  user: {
    list: `admin/findAllUsers`,
    all: `admin/users`,
    getCustomers: `user/customers`,
    detailUsers: `admin/user`,
    updatePassword: `password/update`,
    resetPassword: `admin/reset-password`
  },
  product: {
    list: `admin/products/all`,
    create: `admin/products`,
    delete: `product`,
    getDetail: `product`,
    getTotal: `product/total`,
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
    getList: `admin/order/all`,
    updateStatus: `admin/order/status`,
    updateStatusAgency: `agency/order/status`,
    getListOrderAdmin: `admin/order/admin-customers`,
    updateStatusOrdersAdmin: `admin/order/status-agency`,
    getListOrderAgency: `admin/order/get-orders-with-agency-customer`
  },
  keyChat: {
    get: `configLiveChat`,
    put: `admin/configLiveChat`,
  },
  logoHeader: {
    create: `admin/logo/header`,
    getDetail: `admin/logo/header`,
  },
  logoFooter: {
    create: `admin/logo/footer`,
    getDetail: `logo/footer`,
  },
  banner: {
    create: `admin/banner/create`,
    update: `admin/banner`,
    get: `banner`,
  },
  deposit: {
    addToUser: `user/wallet/deposit`,
    getListDeposit: `admin/wallet/deposit-requests`
  },
  withdraw: {
    getListWithdraw: `admin/wallet/withdraw-requests`,
    confirm: `admin/wallet/confirm`
  },
  liveChat: {
    get: `admin/livechat/token`
  },
  chat: {
    createChat: "chat/create",
    addMessage: "chat/message",
    getUserChat: "chat/user",
    findUserInChat: "chat/search",
    getMessageUserChat: "chat",
    createMessage: `chat/createMessage`
  }
};

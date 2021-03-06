export const callApi = {
  login: "/api/login/shop",
  user: {
    update: "/api/user",
  },
  shop: {
    getShopById: "/api/shop/{{id_shop}}",
    update: "/api/shop",
  },
  product: {
    getListById: "/api/product/shop?id_shop=1",
    createProduct: "/api/product",
  },
  order: {
    getOrderByShop: "/api/orders/shop?id_shop=1",
    updateStatus: "/api/orders/status",
  },
};
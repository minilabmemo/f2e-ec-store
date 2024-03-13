

export const baseApi=`${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/`;


export const adminApi=`${baseApi}admin`;

export const adminUploadApi=`${baseApi}admin/upload`;
export const adminProductApi=`${baseApi}admin/product`;

export const adminOrdersApi=`${baseApi}admin/orders`;
export const adminOrderApi=`${baseApi}admin/order`;

export const adminCouponsApi=`${baseApi}admin/coupons`;
export const adminCouponApi=`${baseApi}admin/coupon`;

export const userProductsApi=`${baseApi}products/all`;
export const userProductApi=`${baseApi}product`;
export const userCartApi=`${baseApi}cart`;
export const userCouponApi=`${baseApi}coupon`;
export const userOrderApi=`${baseApi}order`;
export const userOrderPayApi=`${baseApi}pay`;

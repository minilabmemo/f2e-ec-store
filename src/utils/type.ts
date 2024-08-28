export interface Product {
  id: string;
  imageUrl: string;
  imagesUrl: string[];
  title: string;
  unit: string;
  price: number;
  origin_price: number;
  num: number;
  category: string;
  subcategory: string;
  is_enabled: number;
  content: string;
  description: string;
  on_stock?: boolean;
  [key: string]: any; //for sortedProducts
}
export interface SaveProduct {
  id: string;
  title: string;
  imageUrl: string;
  on_stock: boolean;
}

interface CartProduct {
  id: string;
  imageUrl: string;
  title: string;
  unit: string;
  price: number;
  origin_price: number;
  num: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  qty: number;
  product: CartProduct;
  coupon: string;
  final_total: number;
}

export interface Cart {
  carts: CartItem[];
  total: number;
  final_total: number;
}

interface CartTempProduct {
  title: string;
}
export interface CartTempItem {
  product: CartTempProduct;
  id: string;
}
export interface CartItemUpdate {
  product_id: string;
  qty: number;
}

export interface OrderUser {
  name: string;
  email: string;
  tel: string;
  address: string;
}
interface OrderProductItem {
  id: string;
  title: string;
  unit: string;
}
interface OrderProduct {
  id: string;
  product: OrderProductItem;
  qty: number;
  final_total: number;
}

export interface Order {
  id: string;
  user: OrderUser;
  create_at: number;
  paid_date: number | null;
  is_paid: boolean;
  total: number;
  message: string;
  products: OrderProduct[];
}

export interface Coupon {
  id: string;
  due_date: number;
  title: string;
  code: string;
  percent: number;
  is_enabled: number;
}

export interface PaginationT {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
}

export interface MemberT {
  user: UserT;
  message: string;
}
export interface UserT {
  name: string;
  email: string;
  tel: string;
  address: string;
}

export interface CommonResponse {
  success: boolean;
  message?: string;
}

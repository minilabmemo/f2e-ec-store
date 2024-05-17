export interface ProductItem {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  origin_price: number;
  num: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  qty: number;
  product: ProductItem;
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

interface OrderUser {
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

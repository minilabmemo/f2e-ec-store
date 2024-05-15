export interface ProductItem {
  id: string;
  num: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  qty: number;
  product: ProductItem;
}

export interface CartItemUpdate {
  product_id: string;
  qty: number;
}


import {useCartStore} from '@/stores/cartStore';

export function addCartCheck(id, qty = 1) {
  const cartStore = useCartStore();
  const {addCartByItem} = cartStore;
  const {cart} = cartStore;
  if (!cart) {
    return false
  }
  let isMaxNum = false;
  let cartValue = cart;

  cartValue.carts.forEach(element => {
    if (element.product_id === id) {
      if (element.qty >= element.product.num) {
        alert(`無法加入購物車，購物車數量${element.qty}已達最大可購買量 ${element.product.num}件商品。`);
        isMaxNum = true;
        return false;
      }

      if (qty + element.qty > element.product.num) {
        alert(`無法加入購物車，購物車數量已有${element.qty}件，只可再購買 ${element.product.num - element.qty}件商品。`);
        isMaxNum = true;
      }
    }
  });
  if (isMaxNum) {
    return false;
  }

  const cartItem = {product_id: id, qty, };

  addCartByItem(cartItem);
  return true;
};
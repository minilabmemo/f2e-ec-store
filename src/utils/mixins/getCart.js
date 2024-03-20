
import {userCartApi} from '@/utils/const/path'
export default {
  data() {
    return {
      cart: {},
      isGetCartLoading: false,
    };
  },
  methods: {
    getCart() {
      const url = `${userCartApi}`;
      this.isGetCartLoading = true;
      this.$http.get(url).then((response) => {
        this.isGetCartLoading = false;
        if (response.data.success) {
          this.cart = response.data.data;
          console.log("getCart cart", this.cart) //TODO remove
        } else {
          // this.status.error = "取得資料失敗，請稍後再重新載入。";
          console.log("err:", response.data)//TODO remove
        }
      }).catch((err) => {
        this.isGetCartLoading = false;
        // this.status.error = "取得資料錯誤，請稍後再重新載入。"; //TODO 錯誤集中
        console.log("err:", err)//TODO remove

      });
    },

  },

};
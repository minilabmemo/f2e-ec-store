
import {userCartApi} from '@/utils/const/path'
export default {
  data() {
    return {
      cart: {},
      status: {
        isLoading: false,
        error: ""
      },
    };
  },
  methods: {
    getCart() {
      const url = `${userCartApi}`;

      this.status.isLoading = true;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.cart = response.data.data;
          console.log("getCart cart", this.cart) //TODO remove
        } else {
          this.status.error = "取得資料失敗，請稍後再重新載入。";
          console.log("err:", response.data)//TODO remove
        }
      }).catch((err) => {
        this.status.isLoading = false;
        this.status.error = "取得資料錯誤，請稍後再重新載入。"; //TODO 錯誤集中
        console.log("err:", err)//TODO remove

      });
    },

  },

};
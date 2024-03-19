
import {userProductsApi} from '@/utils/const/path'
export default {
  methods: {
    getAllData() {
      const url = userProductsApi;
      this.status.isLoading = true;
      this.axios.get(url).then((response) => {
        this.status.isLoading = false;
        if (response.data.success) {
          this.products = response.data.products
          console.log("getAllData products", this.products)
        } else {
          this.status.error = "取得資料失敗，請稍後再重新載入。";
          console.log("err:", response.data)
        }
      }).catch((err) => {
        this.status.isLoading = false;
        this.status.error = "取得資料錯誤，請稍後再重新載入。"; //TODO 錯誤集中
        console.log("err:", err)

      });
    }
  },
  created() {
    console.warn("created:")
    this.getAllData();

  },
  // update() {
  //   this.getAllData();
  // },
};
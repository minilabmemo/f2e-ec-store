
import {userProductsApi} from '@/utils/const/path'
export default {
  data() {
    return {
      products: [],
      status: {
        isLoading: false,
        error: ""
      },
    };
  },
  methods: {
    getAllData() {
      const url = userProductsApi;
      this.status.isLoading = true;
      this.axios.get(url).then((response) => {
        this.status.isLoading = false;
        if (response.data.success) {
          this.products = response.data.products
        } else {
          // this.error = "取得資料失敗，請稍後再重新載入。";
        }
      }).catch((err) => {
        this.status.isLoading = false;
        // this.status.error = "取得資料錯誤，請稍後再重新載入。"; //TODO 錯誤集中
        console.log("err:", err)

      });
    }
  },
  created() {

    this.getAllData();//TODO 個字觸發

  },

};
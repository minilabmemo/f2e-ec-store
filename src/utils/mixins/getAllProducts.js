
import {userProductsApi} from '@/utils/const/path'
export default {
  data() {
    return {
      products: {},
      isLoading: false,
      status: {
        error: ""
      },
    };
  },
  methods: {
    getAllData() {
      const url = userProductsApi;
      this.isLoading = true;
      this.axios.get(url).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.products = response.data.products
        } else {
          this.error = "取得資料失敗，請稍後再重新載入。";
          console.log("err:", response.data)//TODO remove
        }
      }).catch((err) => {
        this.isLoading = false;
        this.status.error = "取得資料錯誤，請稍後再重新載入。"; //TODO 錯誤集中
        console.log("err:", err)

      });
    }
  },
  created() {
    console.warn("created:getAllData") //TODO 個字觸發
    this.getAllData();

  },

};
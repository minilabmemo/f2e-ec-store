
import {userProductsApi} from '@/utils/const/path'
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
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
      this.$http.get(url).then((response) => {
        this.status.isLoading = false;
        if (response.data.success) {
          this.products = response.data.products
        } else {
          dataErr(response)
        }
      }).catch((err) => {
        catchErr(err)
        this.status.isLoading = false;
      });
    }
  },
  created() {
    this.getAllData();
  },
};
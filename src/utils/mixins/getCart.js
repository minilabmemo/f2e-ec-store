
import {userCartApi} from '@/utils/const/path'
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
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

        } else {
          dataErr(response)
        }
      }).catch((err) => {
        this.isGetCartLoading = false;
        catchErr(err)

      });
    },

  },

};
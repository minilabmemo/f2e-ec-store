import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
import statusStore from '@/stores/statusStore.js';
import axios from 'axios';
const status = statusStore();
class FetchAct {
  constructor() {
    if (FetchAct.instance) {
      return FetchAct.instance;
    }
    FetchAct.instance = this;
  }

  get(url) {
    return new Promise((resolve) => {
      status.isLoading = true;
      axios.get(url)
        .then((response) => {
          status.isLoading = false;
          if (response.data.success) {
            resolve(response.data);
          } else {
            dataErr(response)
          }
        })
        .catch((error) => {
          status.isLoading = false;
          catchErr(error)
        });
    });
  }

  post(url, body, msgTitle) {
    return new Promise((resolve) => {
      status.isLoading = true;
      axios.post(url, body)
        .then((response) => {
          status.isLoading = false;
          if (msgTitle && status.pushMessage) {
            status.pushMessage({
              title: msgTitle,
              response: response
            });
          }

          if (response.data.success) {
            resolve(response.data);
          } else {
            dataErr(response)
          }

        }).catch((err) => {
          status.isLoading = false;
          catchErr(err)

        });
    });
  }
  put(url, body, msgTitle) {
    return new Promise((resolve) => {
      status.isLoading = true;
      axios.put(url, body)
        .then((response) => {
          status.isLoading = false;
          if (msgTitle && status.pushMessage) {
            status.pushMessage({
              title: msgTitle,
              response: response
            });
          }

          if (response.data.success) {
            resolve(response.data);
          } else {
            dataErr(response)
          }

        }).catch((err) => {
          status.isLoading = false;
          catchErr(err)

        });
    });
  }
  delete(url, msgTitle) {
    return new Promise((resolve) => {
      status.isLoading = true;
      axios.get(url)
        .then((response) => {
          status.isLoading = false;
          if (msgTitle && status.pushMessage) {
            status.pushMessage({
              title: msgTitle,
              response: response
            });
          }
          if (response.data.success) {
            resolve(response.data);
          } else {
            dataErr(response)
          }
        })
        .catch((error) => {
          status.isLoading = false;
          catchErr(error)
        });
    });
  }

}

// 创建并导出一个已实例化的 FetchAct 对象
export default new FetchAct();

import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
import statusStore from '@/stores/statusStore.js';
import axios from 'axios';
export function fetchDataHandle(url) {
  return new Promise((resolve) => {
    const status = statusStore();
    status.isLoading = true;
    //  let url = "https://jsonplaceholder.typicode.com/todos/1"
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

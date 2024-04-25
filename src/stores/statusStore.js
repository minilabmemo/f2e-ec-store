import {defineStore} from 'pinia';

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    cartLoadingItem: '',
    messages: [],
    isGetCartLoading: false,
    orderTemp: {
      paySuccess: false,
      orderId: ""
    }
  }),
  actions: {
    pushMessage(data) {
      const {title, content, style = 'success', response} = data;
      if (!response || !response.data) {
        let message = {
          style: style ? style : 'info',
          title: `${title}`,
          content: content,
        };
        this.messages.push(message);
        return
      }

      if (response.data.success) {
        let message = {
          style,
          title: `${title}成功`,
          content
        };
        this.messages.push(message);
      } else {

        // 有些訊息是字串，有些則是陣列或物件，在此統一格式成字串陣列，再列出訊息。
        let contents = [];
        switch (typeof response.data.message) {
          case 'string':
            contents = [response.data.message]
            break;
          case 'object':
            contents = Object.keys(response.data.message).map((key) => response.data.message[key]);//只列出 obj,value
            break;
          default:
            contents = response.data.message
            break;
        }
        let message = {
          style: 'danger',
          title: `${title}失敗`,
          content: contents !== undefined ? contents.join('、') : ''
        };
        this.messages.push(message);
      }
    },
  },
});
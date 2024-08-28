import { defineStore } from 'pinia';
interface Message {
  style: string;
  title: string;
  content: string;
}
interface OrderTemp {
  paySuccess: boolean;
  orderId: string;
}

interface StatusStore {
  isLoading: boolean;
  cartLoadingItem: string;
  messages: Message[];
  isGetLoading: boolean;
  isAddLoading: boolean;
  isUpdateLoading: boolean;
  orderTemp: OrderTemp;
}
export interface BooleanProperties {
  isLoading: boolean;
  isGetLoading: boolean;
  isAddLoading: boolean;
  isUpdateLoading: boolean;
}

export default defineStore('statusStore', {
  state: (): StatusStore => ({
    isLoading: false,
    cartLoadingItem: '',
    messages: [],
    isGetLoading: false,
    isAddLoading: false,
    isUpdateLoading: false,
    orderTemp: {
      paySuccess: false,
      orderId: ''
    }
  }),
  actions: {
    pushMessage(data: { title: any; response: any; content?: any; style?: any }) {
      const { title, content, style = 'success', response } = data;
      if (!response || !response.data) {
        const message: Message = {
          style: style ? style : 'info',
          title: `${title}`,
          content: content
        };
        this.messages.push(message);
        return;
      }

      if (response.data.success) {
        const message = {
          style,
          title: `${title}成功`,
          content
        };
        this.messages.push(message);
      } else {
        // 有些訊息是字串，陣列或物件，在此統一格式成字串陣列，再列出訊息。
        let contents = [];
        switch (typeof response.data.message) {
          case 'string':
            contents = [response.data.message];
            break;
          case 'object':
            contents = Object.keys(response.data.message).map((key) => response.data.message[key]);
            break;
          default:
            contents = response.data.message;
            break;
        }
        const message = {
          style: 'danger',
          title: `${title}失敗`,
          content: contents !== undefined ? contents.join('、') : ''
        };
        this.messages.push(message);
      }
    },
    setState<K extends keyof BooleanProperties>(key: K, value: StatusStore[K]): void {
      if (typeof this[key] === 'boolean') {
        this[key] = value;
      } else {
        console.error(`Cannot set state for key "${key}", as it is not a boolean.`);
      }
    }
  }
});

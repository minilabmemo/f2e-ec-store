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
interface ResponseData {
  message: string | string[] | Record<string, any>; // 允許字串、字串陣列或對象
  success: boolean;
}
interface PushMessageData {
  title: string;
  response: {
    data: ResponseData;
  };
  content?: string;
  style?: string;
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
    pushMessage(data: PushMessageData) {
      const { title, content, style = 'success', response } = data;
      if (!response || !response.data) {
        const message: Message = {
          style: style ? style : 'info',
          title: `${title}`,
          content: content ?? ''
        };
        this.messages.push(message);
        return;
      }

      if (response.data.success) {
        const message = {
          style,
          title: `${title}成功`,
          content: content ?? ''
        };
        this.messages.push(message);
      } else {
        // 有些訊息是字串，陣列或物件，在此統一格式成字串陣列，再列出訊息。
        let contents = [];
        const message = response.data.message;

        if (typeof message === 'string') {
          contents = [message];
        } else if (Array.isArray(message)) {
          contents = message;
        } else if (typeof message === 'object') {
          contents = Object.keys(message).map((key) => {
            return (message as Record<string, string>)[key];
          });
        }
        const errorMessage = {
          style: 'danger',
          title: `${title}失敗`,
          content: contents !== undefined ? contents.join('、') : ''
        };
        this.messages.push(errorMessage);
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

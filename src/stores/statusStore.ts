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
  message: string;
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
        const content = response.data.message;

        const errorMessage = {
          style: 'danger',
          title: `${title}失敗`,
          content: content ?? ''
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

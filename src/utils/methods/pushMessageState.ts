import emitter from '@/utils/methods/emitter';
import type { AxiosResponse } from 'axios';

export default function (response: AxiosResponse<any, any>, title = '更新') {
  
  if (response.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    
    // 有些訊息是字串，有些則是陣列或物件，在此統一格式成字串陣列，再列出訊息。
    let message: string[]
    switch (typeof response.data.message) {
      case 'string':
        message=[response.data.message]
        break;
      case 'object':
        message = Object.keys(response.data.message).map((key) =>  response.data.message[key]);//只列出 obj,value
        break;
      default:
        message=response.data.message
        break;
    }

    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}
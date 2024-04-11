import {ref} from 'vue';

import statusStore from '@/stores/statusStore';
export function useFormDataStorage() {
  const saveFormData = (data) => {
    localStorage.setItem('formData', JSON.stringify(data));
    status.pushMessage({
      title: '更新會員資料',
      response: {data: {message: "", success: true}, }
    });
  };
  const status = statusStore();
  const getFormData = () => {
    const formData = localStorage.getItem('formData');


    return formData ? JSON.parse(formData) : null;
  };

  return {saveFormData, getFormData};
}


import statusStore from '@/stores/statusStore';
const saveKey = "memberData"
import LocalStorage from '@/utils/methods/localStorage.js'
export function memberStorage() {
  const saveMemberData = (data) => {
    LocalStorage.set(saveKey, data);
    status.pushMessage({
      title: '更新會員資料',
      response: {data: {message: "", success: true}, }
    });
  };

  const status = statusStore();
  const getMemberData = () => {
    const formData = LocalStorage.get(saveKey);

    return formData;
  };

  return {saveMemberData, getMemberData};
}

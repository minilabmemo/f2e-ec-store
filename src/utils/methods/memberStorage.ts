import statusStore from '@/stores/statusStore';
const saveKey = 'memberData';
import LocalStorage from '@/utils/methods/localStorage';
export function memberStorage() {
  const status = statusStore();

  const saveMemberData = (data: any) => {
    LocalStorage.set(saveKey, data);
    status.pushMessage({
      title: '更新會員資料',
      response: { data: { message: '', success: true } }
    });
  };

  const getMemberData = () => {
    const formData = LocalStorage.get(saveKey);

    return formData;
  };

  return { saveMemberData, getMemberData };
}

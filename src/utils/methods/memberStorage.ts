import statusStore from '@/stores/statusStore';
import type { MemberT } from '@/utils/type';

import LocalStorage from '@/utils/methods/localStorage';

const saveKey = 'memberData';
export function memberStorage() {
  const status = statusStore();

  const saveMemberData = (data: MemberT) => {
    LocalStorage.set(saveKey, data);
    status.pushMessage({
      title: '更新會員資料',
      response: { data: { message: '', success: true } }
    });
  };

  const getMemberData = () => {
    const formData = LocalStorage.get<MemberT>(saveKey);
    return formData;
  };

  return { saveMemberData, getMemberData };
}

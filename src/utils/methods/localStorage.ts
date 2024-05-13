class LocalStorage {
  constructor() {
    if (typeof window === 'undefined') {
      console.error('當前的開發環境不支援 window');
      return;
    }
    if (!localStorage) {
      console.error('當前的開發環境不支援 localStorage');
      return;
    }
  }

  get(key: string) {
    if (!key) {
      console.error('缺少取得 localStorage 的 key');
      return;
    }

    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  set(key: string, value: any) {
    if (!key) {
      console.error('缺少設定 localStorage 的 key');
      return;
    }

    if (!value) {
      console.error('缺少設定 localStorage 的 value');
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));

    const data = this.get(key);
    if (!data) {
      console.error('設定 localStorage 失敗');
      return false;
    } else {
      return true;
    }
  }

  remove(key: string) {
    if (!key) {
      console.error('缺少刪除 localStorage 的 key');
      return false;
    }

    localStorage.removeItem(key);

    const data = this.get(key);

    if (data) {
      console.error('刪除 localStorage 失敗');
      return false;
    } else {
      return true;
    }
  }

  clear() {
    localStorage.clear();
  }
}

export default new LocalStorage();

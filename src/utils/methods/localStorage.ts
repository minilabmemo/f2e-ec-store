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

  get<T>(key: string): T | null {
    if (!key) {
      console.error('缺少取得 localStorage 的 key');
      return null;
    }

    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  set<T>(key: string, value: T): boolean {
    if (!key) {
      console.error('缺少設定 localStorage 的 key');
      return false;
    }

    if (value === undefined) {
      console.error('缺少設定 localStorage 的 value');
      return false;
    }

    localStorage.setItem(key, JSON.stringify(value));

    const data = this.get<T>(key);
    if (!data) {
      console.error('設定 localStorage 失敗');
      return false;
    } else {
      return true;
    }
  }

  remove(key: string): boolean {
    if (!key) {
      console.error('缺少刪除 localStorage 的 key');
      return false;
    }

    localStorage.removeItem(key);

    const data = this.get<any>(key);

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

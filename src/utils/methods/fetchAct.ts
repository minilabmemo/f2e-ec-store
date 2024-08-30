import { handleError, handleResError } from '@/utils/methods/handleErr';
import statusStore, { type BooleanProperties } from '@/stores/statusStore';
import axios, { type AxiosResponse } from 'axios';
interface RequestOptions {
  msgTitle?: string;
  token?: string;
  loadStates?: string[];
  allowNotSuccess?: boolean; //允許 API 回覆不成功 不做 handleResError 處理
}
export interface HTTPMethods {
  get<T>(url: string, opts?: RequestOptions): Promise<T>;
  post<T, D = unknown>(url: string, body: D, opts?: RequestOptions): Promise<T>;
  put<T, D = unknown>(url: string, body: D, opts?: RequestOptions): Promise<T>;
  delete<T>(url: string, opts?: RequestOptions): Promise<T>;
}
class FetchAct {
  private static instance: FetchAct;
  constructor() {
    if (FetchAct.instance) {
      return FetchAct.instance;
    }
    FetchAct.instance = this;
  }
  private static setOptions(opts?: RequestOptions) {
    if (opts && opts.token) {
      axios.defaults.headers.common['Authorization'] = opts.token;
    }
  }

  private static setLoading(isLoading: boolean, opts?: RequestOptions) {
    const status = statusStore();

    if (opts && opts.loadStates) {
      opts.loadStates.forEach((stateKey: string) => {
        status.setState(stateKey as keyof BooleanProperties, isLoading);
      });
    } else {
      status.isLoading = isLoading;
    }
  }
  private static sendMessage(response: AxiosResponse<any, any>, opts?: RequestOptions) {
    const status = statusStore();
    if (opts && opts.msgTitle && status.pushMessage) {
      status.pushMessage({
        title: opts.msgTitle,
        response: response
      });
    }
  }

  get<T>(url: string, opts?: RequestOptions): Promise<T> {
    FetchAct.setOptions(opts);

    return new Promise((resolve) => {
      FetchAct.setLoading(true, opts);

      axios
        .get(url)
        .then((response) => {
          FetchAct.setLoading(false, opts);

          FetchAct.sendMessage(response, opts);

          if (response.data.success) {
            resolve(response.data);
          } else {
            handleResError(response);
          }
        })
        .catch((error) => {
          FetchAct.setLoading(false, opts);

          handleError(error);
        });
    });
  }

  post<T, D = unknown>(url: string, body: D, opts?: RequestOptions): Promise<T> {
    FetchAct.setOptions(opts);

    return new Promise((resolve) => {
      FetchAct.setLoading(true, opts);
      axios
        .post<T>(url, body)
        .then((response: AxiosResponse) => {
          FetchAct.setLoading(false, opts);
          FetchAct.sendMessage(response, opts);
          resolve(response.data);
          if (!response.data.success && !opts?.allowNotSuccess) {
            handleResError(response);
          }
        })
        .catch((err) => {
          FetchAct.setLoading(false, opts);
          handleError(err);
        });
    });
  }
  put<T, D = unknown>(url: string, body: D, opts?: RequestOptions): Promise<T> {
    FetchAct.setOptions(opts);

    return new Promise((resolve) => {
      FetchAct.setLoading(true, opts);

      axios
        .put(url, body)
        .then((response) => {
          FetchAct.setLoading(false, opts);

          FetchAct.sendMessage(response, opts);

          if (response.data.success) {
            resolve(response.data);
          } else {
            handleResError(response);
          }
        })
        .catch((err) => {
          FetchAct.setLoading(false, opts);

          handleError(err);
        });
    });
  }
  delete(url: string, opts?: RequestOptions) {
    FetchAct.setOptions(opts);

    return new Promise((resolve) => {
      FetchAct.setLoading(true, opts);
      axios
        .delete(url)
        .then((response) => {
          FetchAct.setLoading(false, opts);

          FetchAct.sendMessage(response, opts);

          if (response.data.success) {
            resolve(response.data);
          } else {
            handleResError(response);
          }
        })
        .catch((error) => {
          FetchAct.setLoading(false, opts);
          handleError(error);
        });
    });
  }
}

export default new FetchAct();

import { catchErr, dataErr } from '@/utils/methods/handleErr';
import statusStore from '@/stores/statusStore';
import axios, { type AxiosResponse } from 'axios';
interface RequestOptions {
  msgTitle?: string;
  token?: string;
  loadStates?: string[];
}
class FetchAct {
  static instance: any;
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
        status.setState(stateKey, isLoading);
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

  get(url: string, opts?: RequestOptions) {
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
            dataErr(response);
          }
        })
        .catch((error) => {
          FetchAct.setLoading(false, opts);

          catchErr(error);
        });
    });
  }

  post(url: string, body: any | null, opts?: RequestOptions) {
    FetchAct.setOptions(opts);

    return new Promise((resolve) => {
      FetchAct.setLoading(true, opts);
      axios
        .post(url, body)
        .then((response) => {
          FetchAct.setLoading(false, opts);
          FetchAct.sendMessage(response, opts);

          if (response.data.success) {
            resolve(response.data);
          } else {
            resolve(response.data);
            dataErr(response);
          }
        })
        .catch((err) => {
          FetchAct.setLoading(false, opts);
          catchErr(err);
        });
    });
  }
  put(url: string, body: any, opts?: RequestOptions) {
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
            dataErr(response);
          }
        })
        .catch((err) => {
          FetchAct.setLoading(false, opts);

          catchErr(err);
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
            dataErr(response);
          }
        })
        .catch((error) => {
          FetchAct.setLoading(false, opts);
          catchErr(error);
        });
    });
  }
}

export default new FetchAct();

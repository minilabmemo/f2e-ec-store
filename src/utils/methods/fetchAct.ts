import { catchErr, dataErr } from '@/utils/methods/handleErr.js'
import statusStore from '@/stores/statusStore.js'
import axios from 'axios'
interface RequestOptions {
  msgTitle?: string
  token?: string
  loadState?: boolean
}
class FetchAct {
  static instance: any
  constructor() {
    if (FetchAct.instance) {
      return FetchAct.instance
    }
    FetchAct.instance = this
  }
  private static setOptions(opts?: RequestOptions) {
    if (opts && opts.loadState === undefined) {
      opts.loadState = true
    }
    if (opts && opts.token) {
      axios.defaults.headers.common['Authorization'] = opts.token
    }
  }

  get(url: string, opts?: RequestOptions) {
    FetchAct.setOptions(opts)

    return new Promise((resolve) => {
      const status = statusStore()
      if (opts && opts.loadState) {
        status.isLoading = true
      }
      axios
        .get(url)
        .then((response) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          if (response.data.success) {
            resolve(response.data)
          } else {
            dataErr(response)
          }
        })
        .catch((error) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          catchErr(error)
        })
    })
  }

  post(url: string, body: any | null, opts?: RequestOptions) {
    FetchAct.setOptions(opts)

    return new Promise((resolve) => {
      const status = statusStore()
      if (opts && opts.loadState) {
        status.isLoading = true
      }
      axios
        .post(url, body)
        .then((response) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          if (opts && opts.msgTitle && status.pushMessage) {
            status.pushMessage({
              title: opts.msgTitle,
              response: response
            })
          }

          if (response.data.success) {
            resolve(response.data)
          } else {
            dataErr(response)
          }
        })
        .catch((err) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          catchErr(err)
        })
    })
  }
  put(url: string, body: any, opts?: RequestOptions) {
    FetchAct.setOptions(opts)

    return new Promise((resolve) => {
      const status = statusStore()
      if (opts && opts.loadState) {
        status.isLoading = true
      }
      axios
        .put(url, body)
        .then((response) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          if (opts && opts.msgTitle && status.pushMessage) {
            status.pushMessage({
              title: opts.msgTitle,
              response: response
            })
          }

          if (response.data.success) {
            resolve(response.data)
          } else {
            dataErr(response)
          }
        })
        .catch((err) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          catchErr(err)
        })
    })
  }
  delete(url: string, opts?: RequestOptions) {
    FetchAct.setOptions(opts)

    return new Promise((resolve) => {
      const status = statusStore()
      if (opts && opts.loadState) {
        status.isLoading = true
      }
      axios
        .delete(url)
        .then((response) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          if (opts && opts.msgTitle && status.pushMessage) {
            status.pushMessage({
              title: opts.msgTitle,
              response: response
            })
          }
          if (response.data.success) {
            resolve(response.data)
          } else {
            dataErr(response)
          }
        })
        .catch((error) => {
          if (opts && opts.loadState) {
            status.isLoading = false
          }
          catchErr(error)
        })
    })
  }
}

export default new FetchAct()

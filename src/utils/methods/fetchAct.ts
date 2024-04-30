import { catchErr, dataErr } from '@/utils/methods/handleErr.js'
import statusStore from '@/stores/statusStore.js'
import axios, { AxiosHeaders } from 'axios'

class FetchAct {
  static instance: any
  constructor() {
    if (FetchAct.instance) {
      return FetchAct.instance
    }
    FetchAct.instance = this
  }

  get(url: string) {
    return new Promise((resolve) => {
      const status = statusStore()
      status.isLoading = true
      axios
        .get(url)
        .then((response) => {
          status.isLoading = false
          if (response.data.success) {
            resolve(response.data)
          } else {
            dataErr(response)
          }
        })
        .catch((error) => {
          status.isLoading = false
          catchErr(error)
        })
    })
  }

  post(url: string, body: any | null, opts?: { msgTitle?: string; token?: string }) {
    if (opts && opts.token) {
      axios.defaults.headers.common['Authorization'] = opts.token
    }
    return new Promise((resolve) => {
      const status = statusStore()
      status.isLoading = true
      axios
        .post(url, body)
        .then((response) => {
          status.isLoading = false
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
          status.isLoading = false
          catchErr(err)
        })
    })
  }
  put(url: string, body: any, opts?: { msgTitle?: string }) {
    return new Promise((resolve) => {
      const status = statusStore()
      status.isLoading = true
      axios
        .put(url, body)
        .then((response) => {
          status.isLoading = false
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
          status.isLoading = false
          catchErr(err)
        })
    })
  }
  delete(url: string, opts?: { msgTitle?: string }) {
    return new Promise((resolve) => {
      const status = statusStore()
      status.isLoading = true
      axios
        .delete(url)
        .then((response) => {
          status.isLoading = false
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
          status.isLoading = false
          catchErr(error)
        })
    })
  }
}

export default new FetchAct()

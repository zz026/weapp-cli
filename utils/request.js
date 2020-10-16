import { T_Toast } from './wxTips'

const _request = Symbol(_request)

class Request {
  constructor({ baseUrl }) {
    this.token = wx.getStorageSync('token') || '27a591d6231148a9a8e69301bdaf84ed'
    this.baseUrl = baseUrl
    this._header = {
      'content-type': 'multipart/form-data',
      Authorization: 'Bearer ' + this.token,
    }
  }

   /**
   * 网络请求
   */
  [_request](method, url, data, header) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        data,
        header,
        method,
        success: res => {
          if (res.statusCode === 200 && res.data.code === 200) {
            resolve(res.data)
          } else {
            this.errorHandler(url, res.data)
            reject(res)
          }
        },
        fail: err => {
          reject(err)
        }  
      })
    })
  }

  /**
   * 设置统一的异常处理
   */
  errorHandler(url, data) {
    console.error('Request Error!', url, ':' ,data)
    T_Toast(data.message)
  }

  /**
   * GET类型的网络请求
   */
  get(url, data, header = this._header) {
    return this[_request]('GET', url, data, header)
  }

  /**
   * POST类型的网络请求
   */
  post(url, data, header = this._header) {
    return this[_request]('POST', url, data, header)
  }

  /**
   * DELETE类型的网络请求
   */
  delete(url, data, header = this._header) {
    return this[_request]('DELETE', url, data, header)
  }

  /**
   * PUT类型的网络请求
   */
  put(url, data, header = this._header) {
    return this[_request]('PUT', url, data, header)
  }

}

export default Request
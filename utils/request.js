import { T_Toast } from './wxTips'

const _request = Symbol(_request)

class Request {
  constructor() {
    this.token = wx.getStorageSync('token') || '27a591d6231148a9a8e69301bdaf84ed'
    this.baseUrl = 'https://ctms-dev.haioupai.com/'
    this._header = {
      'content-type': 'multipart/form-data',
      Authorization: 'Bearer ' + this.token,
    }
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
    return this[_request](url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  delete(url, data, header = this._header) {
    return this[_request](url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  put(url, data, header = this._header) {
    return this[_request](url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  post(url, data, header = this._header) {
    return this[_request](url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
   [_request](url, data, header, method) {
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
}

export default Request
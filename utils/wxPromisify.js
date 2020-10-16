/**
 * @description 微信api Promise化+柯里化
 * @returns promise化列表
 */
function _wxPromisify(func) {
  if (typeof func !== 'function') {
    throw new Error(func + 'is not a function!')
  }
  return args => new Promise((resolve, reject) => {
    func(
      Object.assign(args || {}, {
        success: resolve,
        fail: reject,
      })
    )
  })
}

// promise化列表
export default {
  _wxPromisify,
  login: _wxPromisify(wx.login),
  request: _wxPromisify(wx.request),
  showToast: _wxPromisify(wx.showToast),
  showModal: _wxPromisify(wx.showModal),
  chooseImage: _wxPromisify(wx.chooseImage),
  uploadFile: _wxPromisify(wx.uploadFile),
  navigateBack: _wxPromisify(wx.navigateBack),
  setClipboardData: _wxPromisify(wx.setClipboardData),
}
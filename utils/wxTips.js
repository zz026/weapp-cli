/*
 * @Author: zzw
 * @Date: 2020/09/09
 * @Description: 二次封装wx常用api
 */

import wxPromisify from './wxPromisify'

// loading状态
let _isLoading = false


/**
 * @name 文字Toast(无图标)
 * @param {String} title 内容
 * @param {String} icon icon图标 默认none
 * @param {Number} duration 关闭时间 默认3000
 * @description 显示图标 title 文本最多显示 7 个汉字长度
 */
export function T_Toast(title, icon = 'none', duration = 3000) {
  const iconType = ['success', 'loading', 'none']
  if (!iconType.includes(icon)) {
    throw new Error('T_Toast Error: icon can use ' + iconType.toString())
  }
  if (icon !== 'none' && title.length > 7) {
    throw new Error('T_Toast Error: title more then 7 !')
  }


  setTimeout(() => {
    return wxPromisify.showToast({
      title,
      icon,
      mask: false,
      duration
    })
  }, 100)
}

/**
 * @name Alert窗口(promise化)
 * @param {String} content 弹框内容
 * @param {Object} params 配置项
 * @returns {Promise}
*/
export function T_Alert(content='', params = {}) {
  return wxPromisify.showModal({
    content,
    ...params,
    showCancel: false,
  })
}

/**
 * @name Confirm窗口(promise化)
 * @param {String} content 弹框内容
 * @param {Object} params 配置项
 * @returns {Promise}
 * @description promise封装wx.showModal
 * https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html
*/
export function T_Confirm(content = '确认此操作?', params = {}) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: params.title || '提示',
      content,
      confirmColor: '#5D62DA',
      cancelColor: '#000000',
      ...params, 
      success: res => {
        res.confirm && resolve(res) // 点击确认按钮
        res.cancel && reject() // 点击取消按钮
      },
      fail: err => {
        console.log('wx.showModal Error:', err)
      }
    })
  })
}


/**
 * @name loading弹框
 * @param {String} title loading文字
 * @description loading弹框 根据_isLoading判断只存在一个loading
 */
export function T_Loading(title = '加载中') {
  if (!_isLoading) {
    wx.showLoading({
      title: title,
      mask: true
    })
    _isLoading = true
  }
}

/**
 * @name 关闭loading弹框
 */
export function T_HideLoading() {
  _isLoading = false
  wx.hideLoading();
}


/**
 * @name 选择图片
 * @param {Object} wx.chooseImage 参数
 * @returns {Promise}
 */
export function T_ChooseImage(params = {}) {
  return new Promise(async (resolve) => {
    // 最大尺寸 10M
    const maxSize = 1024 * 1024 * 10
    // 文件格式
    try {
      const { tempFilePaths, tempFiles } = await wxPromisify.chooseImage({
        count: 1, // 最多可以选择的图片张数
        sizeType: ['original'], // ['original', 'compressed'] 所选的图片的尺寸 原图 压缩 
        sourceType: ['album', 'camera'], // ['album', 'camera'] 选择图片的来源 相册 相机
        ...params
      })
      // 判断是否存在过大图片
      const bigSize = tempFiles.some(val => val.size > maxSize)
      if (bigSize) {
        T_Toast('图片过大, 请重新上传')
        return
      }
      // 判断文件类型
      const fileType = ['jpeg', 'jpg', 'png']
      const errorFile = tempFiles.some(val => {
        const path = val.path
        const file_suffix = path.substr(path.lastIndexOf('.') + 1)
        return !fileType.includes(file_suffix)
      })
      if (errorFile) {
        T_Toast('文件类型错误，只能选择 ' + fileType.toString() + ' 格式的图片')
        return
      }
      resolve(tempFilePaths)
    } catch(err) {
    }
  })
}

// 增加一个默认catch方法
import { addPromise_IgnoreError } from './utils/util'
addPromise_IgnoreError()

import { T_Alert } from './utils/wxTips'
import Router from './utils/router'
import Request from './utils/request'

/**
 * 往wx挂载方法
 * Router 注意项: 编辑tabbar底部，需在router.js中tabList定义
 */
Object.defineProperties(wx, {
  '$router': {
    value: new Router(),
    writable: false
  },
  '$http': {
    value: new Request()
  }
})

//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
  },

  onShow: function() {
    this.update()
  },

  update() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调  res.hasUpdate返回boolean类型
        console.log('监听向微信后台请求检查更新结果事件:', res.hasUpdate)
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            updateManager.applyUpdate()
          })
          // 新版本下载失败时执行
          updateManager.onUpdateFailed(function () {
            T_Alert('请删除当前小程序，重新搜索打开...', {
              title: '发现新版本',
            })
          })
        }
      })
    } else {
      // 如果小程序需要在最新的微信版本体验，如下提示
      T_Alert('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试', {
        title: '更新提示',
      })
    }
  }
})
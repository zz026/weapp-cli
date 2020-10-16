/*
 * @Author: zzw
 * @CreateTime: 2020-09-14
 * @Description:这里重新封装了导航方法，push、redirect、switch、reLaunch、back分别对应着微信的导航方法
 */
import {
  checkTypeOf,
  objStringify
} from './util'
import wxPromisify from './wxPromisify'


const _router = Symbol('_router');
const _simple_arguments = Symbol('_simple_arguments');

class Router {
  constructor() {
    this.tabList = [
      '/pages/home/index',
      '/pages/mine/index'
    ]
  }

  // 私有方法 router跳转
  [_router] = (method, path, data) => {
    try {
      const currentPages = getCurrentPages()
      const currentRoute = currentPages[currentPages.length - 1].route
      // 防止导航到自己
      if (path === ('/' + currentRoute)) {
        return console.error('不能跳转至自身页面')
      }
      const url = objStringify(data, path) || ''
      // promise化
      return wxPromisify._wxPromisify(wx[method])({
        url: `${path}${url ? ('?' + url) : ''}`,
      })

    } catch (err) {
      console.error(`Error in router: ${err}`)
    }
  }

  // 私有方法 整理参数 
  [_simple_arguments](method, path, data = {}) {
    const _path = path[0] !== '/' ? `/${path}` : path
    const _method = this.tabList.includes(_path) ? 'switchTab' : method
    return this[_router](_method, _path, data)
  }

  /**
   * 路由跳转
   */
  push(path, data) {
    return this[_simple_arguments]('navigateTo', path, data)
  }

  /**
   * 替换当前页
   */
  redirect(path, data) {
    return this[_simple_arguments]('redirectTo', path, data)
  }

  /**
   * 销毁前面页面栈
   */
  reLaunch(path, data) {
    return this[_simple_arguments]('reLaunch', path, data)
  }

  /**
   * 页面返回
   * @param {String|Number} path 页面层数或路径
   * @param {Object} data 如需跨页面setData
   * @retruns {Promise} promise返回当前page对象，可对其setdata 调用方法等操作
   */
  back(path) {
    const _path = path[0] === '/' ? path.substring(1) : path
    // 获取页面栈 翻转取倒序
    const pages = getCurrentPages().reverse()
    let routeIndex = -1

    if (checkTypeOf(_path) === 'Number') {
      routeIndex = _path
    } else if (checkTypeOf(_path) === 'String') {
      routeIndex = pages.findIndex(val => val.route === _path)
    }

    if (routeIndex === -1) {
      throw new Error(_path + '不存在页面栈中！无法返回')
    }
      
    return new Promise(resovle => {
      wx.navigateBack({
        delta: routeIndex,
        success() {
          resovle(pages[routeIndex])
        }
      })
    })

  }

}

export default Router
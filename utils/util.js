/*
 * @Author: zzw
 * @Date: 2020-09-10
 * @Description: 工具类函数
 */


/**
 * @description: 判断数据类型
 * @param {any} 需判断的字段
 * @return {String} 如String Object Function Array
 */
export function checkTypeOf (data) {
  return Object.prototype.toString.call(data).replace(/^\[object (\S+)\]$/, '$1');
}


/**
 * @description: 将对象 序列化成URL的形式，以&进行拼接
 * @param {Object} { a: 1, b: 2 }
 * @return {String} a=1&b=2
 */
export function objStringify(params) {
  if (checkTypeOf(params) !== 'Object') { 
    throw new Error(`Error in objStringify: param must be Object`)
  }  
  return Object.keys(params)
    .map(k => `${k}=${params[k] || ''}`)
    .join('&')
}


/**
 * @description: 防抖函数
 * @param {Function} func 函数
 * @param {Number} wait 等待时间
 */
export function debounce(fn, interval = 1000) {
  let timer;
  return function() {
    clearTimeout(timer);
    let context = this;
    // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    let args = arguments;
    timer = setTimeout(function() {
      fn.call(context, args);
    }, interval);
  };
}


// 增加一个默认catch方法
export function addPromise_ignoreError() {
  if (!Promise.prototype.ignoreError) {
    Promise.prototype.ignoreError = function() {
      return this.catch(() => { });
    };
  }
}


/**
 * @name 格式化时间
 * @description 将日期格式化成指定格式的字符串
 * @param {Date|timestamp} date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param {String} fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
export function parseTime (date = new Date(), fmt = 'yyyy-MM-dd HH:mm:ss') {
  date = typeof date === 'number' ? new Date(date) : date
  const obj =
    {
      'y': date.getFullYear(), // 年份，注意必须用getFullYear
      'M': date.getMonth() + 1, // 月份，注意是从0-11
      'd': date.getDate(), // 日期
      'q': Math.floor((date.getMonth() + 3) / 3), // 季度
      'w': date.getDay(), // 星期，注意是0-6
      'H': date.getHours(), // 24小时制
      'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
      'm': date.getMinutes(), // 分钟
      's': date.getSeconds(), // 秒
      'S': date.getMilliseconds() // 毫秒
    }
  const week = ['天', '一', '二', '三', '四', '五', '六']
  for (const i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      let val = obj[i] + ''
      if (i === 'w') {
        return (m.length > 2 ? '星期' : '周') + week[val]
      }
      for (let j = 0, len = val.length; j < m.length - len; j++) {
        val = '0' + val
      }
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return fmt
}
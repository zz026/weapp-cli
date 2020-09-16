/*
 * @Author: zzw
 * @Date: 2020-09-10
 * @Description: 工具类函数
 */


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


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
    .map(k => `${k}=${params[k]}`)
    .join('&')
}


// 增加一个默认catch方法
export function addPromise_IgnoreError() {
  if (!Promise.prototype.ignoreError) {
    Promise.prototype.ignoreError = function() {
      return this.catch(() => { });
    };
  }
}

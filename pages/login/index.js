import {
  T_Toast,
} from '../../utils/wxTips.js';
import WxValidate from '../../assets/lib/WxValidate'


Page({

  data: {
    form: {
      name: '',
      password: '',
    },
    WxValidate: null
  },

  initValidate() {
    // 验证字段的规则
    const rules = {
      name: {
        required: true,
      },
      password: {
        required: true
      },
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入用户名',
      },
      password: {
        required: '请输入密码',
      },
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  },

  submitForm(e) {
    const params = e.detail.value
    this.setData({
      form: params
    })

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      T_Toast(error.msg)
      return false
    }
    wx.$router.push('/pages/mine/index')
    T_Toast('登录成功', 'success')
  },

  onLoad: function () {
    this.initValidate()
  },
})
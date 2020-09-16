import {
  T_Toast,
} from '../../utils/wxTips.js';
import WxValidate from '../../assets/lib/WxValidate'


Page({

  data: {
    form: {
        name: '',
        tel: '',
    },
    WxValidate: null
  },

  initValidate() {
    // 验证字段的规则
    const rules = {
      name: {
        required: true,
      },
      tel: {
        required: true,
        tel: true,
      },
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名',
      },
      tel: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
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
    console.log(e)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        T_Toast(error.msg)
        return false
    }
    
    T_Toast('成功', 'success')
    wx.$router.back('pages/test/index', {
      form: params
    })
  },

  onLoad: function () {
    this.initValidate()
  },
})
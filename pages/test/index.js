import {
  T_Toast,
  T_Loading,
  T_HideLoading,
  T_Confirm,
  T_Alert,
  T_ChooseImage
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

  openLoading() {
    T_Loading()
    setTimeout(() => {
      T_HideLoading()
    }, 2000)
  },
  goHome() {
    wx.$router.push('/pages/index/index').then(res => {
      console.log('res', res)
    })
  },
  goForm() {
    wx.$router.push('/pages/form/index')
  },
  async alert() {
    await T_Alert('alert弹框')
    console.log('finish alert')
  },
  confrim() {
    T_Confirm('confrim弹框').then(res => {
      console.log('finish confrim', res)
    }).ignoreError()
  },
  async upload() {
    const imgs = await T_ChooseImage()
    console.log('imgs', imgs)
  },
  ajax() {
    wx.$http.get('/v2/activity/list', {
      page: 1,
      pageSize: 10
    }).then(res => {
      console.log('r', res)
    })
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

    console.log(e)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        T_Toast(error.msg)
        return false
    }
    
    T_Toast('成功', 'success')
  },

  onLoad: function (e) {
    console.log('e', e)
    this.initValidate()
  }
})
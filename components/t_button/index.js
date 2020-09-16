Component({
	// wx://form-field 代表一个内置 behavior ，它使得这个自定义组件有类似于表单控件的行为。
	behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
	*/
	properties: {
		// 标题
		label: {
			type: String,
			value: ''
		},
		// 标题宽度
		labelWidth: {
			type: String,
			value: '120rpx'
		},
		// 占位符
		placeholder: {  
			type: String,
			value: ''
		},
  },
  /**
	 * 组件的方法，包括事件响应函数和任意的自定义方法
	 */
	methods: {
		getInputValue (e) {
      this.setData({
        value: e.detail.value
      })
    }
  },
  pageLifetimes: {
  } 

})
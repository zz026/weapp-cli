Page({

  data: {
    menuList: [
      {
        id: 1,
        name: '充值记录',
        image: '/assets/images/mine/recharge.png',
        path: '/pages/test/index',
      },
      {
        id: 2,
        name: '账单查询',
        image: '/assets/images/mine/bill.png',
        path: '/pages/bill/index',
      },
      {
        id: 3,
        name: '问题件处理',
        image: '/assets/images/mine/question.png',
        path: '/pages/question/index',
      },
      {
        id: 4,
        name: '商品库',
        image: '/assets/images/mine/goods.png',
        path: '/pages/goods/index',
      },
      {
        id: 5,
        name: '地址簿',
        image: '/assets/images/mine/address.png',
        path: '/pages/address/index',
      },
    ]
  },

  goPath(e) {
    const { path } = e.target.dataset
    console.log('path', path)
    wx.$router.push(path)
  },

  onLoad: function () {
  }
})
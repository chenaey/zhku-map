//获取应用实例
var app = getApp();
Page({
  data: {
    mapCopyright: app.globalData.introduce.mapCopyright,
  },

  navig(e) {
    wx.navigateTo({
      url: "/pages/map/index?id=" + e.currentTarget.dataset.id,
    })
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: app.globalData.introduce.name
    })
  },

  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.globalData.introduce.name + ' - 校园导览',
      path: '/pages/index',
      imageUrl: app.imgCDN + app.globalData.introduce.share,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})
// pages/map/details.js
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tid: 0,
    bid: 0,
    building: {
      img: [] //加载中图片地址
    },
    imgCDN: app.imgCDN
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var bid = parseInt(options.bid);
    var tid = parseInt(options.tid);
    console.log(options)

    if (!options.bid || !options.tid) {
      var data = app.globalData.introduce;
    } else {
      if (options.id === "1") {
        //海珠校区
        var data = app.globalData.map1[tid].data[bid];

      }
      if (options.id === "0") {
        //白云校区
        var data = app.globalData.map[tid].data[bid];

      }
    }

    this.setData({
      bid: bid,
      tid: tid,
      building: data
    });
    wx.setNavigationBarTitle({
      title: data.name
    })
  },

  previewImg(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var title, path;
    if (this.data.introduce) {
      title = app.globalData.introduce.name + '校园导览';
      path = "/pages/map/details";
    } else {
      title = this.data.building.name + ' - ' + app.globalData.introduce.name + '校园导览'
      path = "/pages/map/details?tid=" + this.data.tid + "&bid=" + this.data.bid
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: path,
      imageUrl: app.imgCDN + this.data.building.img[0],
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})
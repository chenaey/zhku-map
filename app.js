//app.js
let config = require('config.js')
App({
  onLaunch: function() {
    var _this = this;

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'zhku-xno6r'
      })
    }
    //载入学校位置数据
    _this.loadSchoolConf()
    //如果已经授权，提前获取定位信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          //获取地理位置
          wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
            success: function(res) {
              _this.globalData.latitude = res.latitude;
              _this.globalData.longitude = res.longitude;
              _this.globalData.islocation = true
            }
          })
        }
      }
    })
  },

  loadNetWorkScoolConf: function() {
    var _this = this
    return new Promise(function(resolve, reject) {
      if (!_this.debug) {
        // 优先读取缓存信息
        var map = wx.getStorageSync('map')
        var introduce = wx.getStorageSync('introduce')
        if (map && introduce) {
          _this.globalData.map = map;
          _this.globalData.introduce = introduce;
        }

        // 再加载网络数据
        // wx.request({
        //   url: config.updateUrl,
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success: function(res) {
        //     console.log("加载远程数据")
        //     if (res.data.map && res.data.map.length > 0) {
        //       //刷新数据
        //       _this.globalData.map = res.data.map;
        //       _this.globalData.introduce = res.data.introduce;

        //       // 存储学校位置数据于缓存中
        //       wx.setStorage({
        //         key: "map",
        //         data: res.data.map
        //       })
        //       wx.setStorage({
        //         key: "introduce",
        //         data: res.data.introduce
        //       })
        //     }
        //   },
        //   complete: function(info) {
        //     resolve();
        //   }
        // })
      } else {
        resolve();
      }
    });
  },

  loadSchoolConf: function() {
    var _this = this
    // 载入本地数据
    _this.globalData.map = _this.school.map;
    _this.globalData.map1 = _this.school1.map;
    _this.globalData.introduce = _this.school.introduce;
    _this.loadNetWorkScoolConf().then(function() {
      // 渲染id
      for (let i = 0; i < _this.globalData.map.length; i++) {
        for (let b = 0; b < _this.globalData.map[i].data.length; b++) {
          _this.globalData.map[i].data[b].id = b + 1;
        }
      } // 渲染id
      for (let i = 0; i < _this.globalData.map1.length; i++) {
        for (let b = 0; b < _this.globalData.map1[i].data.length; b++) {
          _this.globalData.map1[i].data[b].id = b + 1;
        }
      }
    })

  },
  debug: config.debug, //开启后只调用本地数据
  imgCDN: config.imgCDN,
  school: require('/resources/' + config.school),
  school1: require('/resources/' + config.school1),

  globalData: {
    userInfo: null,
    map: null,
    map1: null,
    introduce: null,
    latitude: null,
    longitude: null
  }
})
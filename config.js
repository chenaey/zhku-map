module.exports = {
  //调试模式开关，调试模式下只调用本地数据
  debug: false,
  //学校数据配置名称，学校英文缩写
  school: "zhku", //白云校区
  school1: "zhku1", //海珠校区
  //高德路线规划密钥，必须加入https://restapi.amap.com为request合法域名
  //密钥申请地址http://lbs.amap.com/api/javascript-api/summary/
  key: "42787d8f561a181492a23e1dc4ffd351",
  //地图更新地址，用于热修补，无需每次都提交审核
  updateUrl: "https://www.qq.com/json.json",
  //图片CDN域名
  imgCDN: "http://cdn.i7code.cn/"
}
// 引入SDK核心类
var QQMapWX = require('../../static/tengxun/qqmap-wx-jssdk');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'HTRBZ-AXU6R-WO5WW-WS7P6-7TK56-TRBYG' // 必填
});
var latitude = ''
var longitude = ''
var addr = ''
Page({// 页面数据
  data: {
    routeInfo: {
      // startLat: 30.291331,    //起点经度 选填
      // startLng: 120.212998,    //起点纬度 选填
      // startName: "杭州车站",   // 起点名称 选填
      // endLat: 30.406110,    // 终点经度必传
      // endLng: 120.305010,  //终点纬度 必传
      // endName: "临平南站",  //终点名称 必传
      // mode: "car"  //算路方式 选填
      startLat: '',    //起点经度 选填
      startLng: '',    //起点纬度 选填
      startName: '',   // 起点名称 选填
      endLat: '',    // 终点经度必传
      endLng: '',  //终点纬度 必传
      endName: '',  //终点名称 必传
      mode: ''  //算路方式 选填
    }
  },

  // 页面载入时
  onLoad(options) {
    latitude = options.latitude,
    longitude = options.longitude,
    addr = options.addr
    console.log("latitude:",latitude);
    console.log("longitude:",longitude);
    console.log("title:",addr);
    
    var that = this
    that.setData({
      routeInfo:{
        endLat: latitude,    // 终点经度必传
        endLng: longitude,  //终点纬度 必传
        endName: addr//终点名称 必传
      }
    })
  },
  // 页面初始化
  init(e) {},
  // 页面准备好时
  onReady() {},
  // 页面显示时
  onShow() {
    let plugin = requirePlugin("myPlugin");
  },
  // 页面隐藏时
  onHide() {},
  // 页面卸载时
  onUnload() {},
  // 下拉页面时
  onPullDownRefresh() {},
  // 到达页面底部时
  onReachBottom() {},
  // 页面滚动时
  onPageScroll() {},
  // 分享时，注：onShareAppMessage不能为async异步函数，会导致不能及时取得返回值，使得分享设置无效
  onShareAppMessage() {
    /* const title = ''
    const path = ''
    const imageUrl = ``

    return {
      title,
      path,
      imageUrl,
    } */
  },})

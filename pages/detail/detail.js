var QQMapWX = require('../../static/tengxun/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'HTRBZ-AXU6R-WO5WW-WS7P6-7TK56-TRBYG' // 必填
});
var latitude = ''
var longitude = ''
var title = ''
var addr = ''
Page({
  data: {
    markers: [],
    show: false,
    t: '',
    a: ''
  },
  onLoad(options) {
    latitude = options.latitude,
      longitude = options.longitude,
      title = options.title,
      addr = options.addr
  },
  nearby_search: function () {
    var _this = this;
    var loct = latitude + ',' + longitude
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: loct, //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.result.address,
          id: 0,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          iconPath: "/static/images/marker_yellow.png", //图标路径
          width: 20,
          height: 20,
        })
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks,
          poi: {
            latitude: res.result.location.lat,
            longitude: res.result.location.lng
          }
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  showPopup() {
    this.setData({
      show: true,
      t: title,
      a: addr
    });
  },

  onClose() {
    var _this = this
    _this.setData({
      show: false,
    });
  },
  onReady() {
    var _this = this;
    _this.nearby_search()
  },
  getDirectionEvent(){
    wx.navigateTo({
      url: '../direction/direction?addr='+addr
      +'&latitude='+latitude
      +'&longitude='+longitude,
    })
  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },
});
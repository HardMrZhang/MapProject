// pages/map.js
// 引入SDK核心类
var QQMapWX = require('../../static/tengxun/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'HTRBZ-AXU6R-WO5WW-WS7P6-7TK56-TRBYG' // 必填
});

var loct = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {

    latitude: '',
    longitude: '',
    markers: [],
    tipsshow:true
  },
  nearby_search: function (data) {
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: data, //搜索关键词
      location: loct, //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/static/images/marker_yellow.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
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
  onChange(e) {
    var that = this
    that.getsuggest(e)
  },
  //触发关键词输入提示事件
  backfill: function (e) {
    var _this = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title,
          tipsshow:false
        });
        // console.log("=====",this.data.suggestion[i]);
        
        wx.navigateTo({
          url: '../detail/detail?latitude='+
          this.data.suggestion[i].latitude+'&longitude='+
          this.data.suggestion[i].longitude+'&title='+
          this.data.suggestion[i].title+'&addr='+
          this.data.suggestion[i].addr

        })
      }
     
    }
    // _this.setData({
     
    // })
  },
  getsuggest: function (e) {
    var _this = this;
    //调用关键词提示接口
    if (e.detail == '') {
      return
    }
    // console.log("data:",e.detail);
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      location: loct,
      region:'长沙县', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) { //搜索成功后的回调
        // console.log("res:", res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

 









  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
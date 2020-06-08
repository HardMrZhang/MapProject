// pages/map.js
// 引入SDK核心类
var QQMapWX = require('../../static/tengxun/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'HTRBZ-AXU6R-WO5WW-WS7P6-7TK56-TRBYG' // 必填
});

var loct = '28.256166,113.116949'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    t: '',
    a: '',
    poi: {
      latitude: '',
      longitude: ''
    },
    markers: [],
    tipsshow: true,
    name: '',
    remarks: '',
    imgSrc: ''
  },
  nearby_search: function () {
    var _this = this;

    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: loct, //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var res = res.result;
        var mks = []
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.address,
          id: 0,
          latitude: res.location.lat,
          longitude: res.location.lng,
          iconPath: '/static/images/marker_yellow.png', //图标路径
          width: 20,
          height: 20,
          // callout: { //在markers上展示地址名称，根据需求是否需要
          //   content: res.address,
          //   color: '#000',
          //   display: 'ALWAYS'
          // }
        });
        var jingqu = _this.getJingQuMark()
        var shangchang = _this.getShangChangMark()
        // var canting = _this.getCangTingMark()
        var tushuguan = _this.getTuShuGuanMark()
        var wenhuaguan = _this.getWenHuaGuanMark()
        var jiudian = _this.getJiuDianMark()

        Promise.all([wenhuaguan, jiudian, jingqu, shangchang, tushuguan]).then(r => {
          for (var i = 0; i < r.length; i++) {
            mks = mks.concat(r[i])

            _this.setData({ //设置markers属性，将搜索结果显示在地图中
              markers: mks
            })
          }
        })
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks,
          poi: {
            latitude: res.location.lat,
            longitude: res.location.lng
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
    onChange(e) {
      wx.navigateTo({
        url: '../search/search'
      })
      // var that = this
      // that.getsuggest(e)
    },
  //   //触发关键词输入提示事件
  //   backfill: function (e) {
  //     var _this = this;
  //     var id = e.currentTarget.id;
  //     for (var i = 0; i < this.data.suggestion.length; i++) {
  //       if (i == id) {
  //         this.setData({
  //           backfill: this.data.suggestion[i].title,
  //           tipsshow:false

  //         });
  //       }

  //     }
  //     // _this.setData({

  //     // })
  //   },
  //   getsuggest: function (e) {
  //     var _this = this;
  //     //调用关键词提示接口
  //     if (e.detail == '') {
  //       return
  //     }
  //     // console.log("data:",e.detail);

  //     qqmapsdk.getSuggestion({
  //       //获取输入框值并设置keyword参数
  //       keyword: e.detail, //用户输入的关键词，可设置固定值,如keyword:'KFC'
  //       location: loct,
  //       //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
  //       success: function (res) { //搜索成功后的回调
  //         // console.log("res:", res);
  //         var sug = [];
  //         for (var i = 0; i < res.data.length; i++) {
  //           sug.push({ // 获取返回结果，放到sug数组中
  //             title: res.data[i].title,
  //             id: res.data[i].id,
  //             addr: res.data[i].address,
  //             city: res.data[i].city,
  //             district: res.data[i].district,
  //             latitude: res.data[i].location.lat,
  //             longitude: res.data[i].location.lng
  //           });
  //         }
  //         _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
  //           suggestion: sug
  //         });
  //       },
  //       fail: function (error) {
  //         console.error(error);
  //       },
  //       complete: function (res) {
  //         console.log(res);
  //       }
  //     });
  //   },
  //   /**
  //    * 生命周期函数--监听页面加载
  //    */
  onLoad: function (options) {

    var that = this
    that.nearby_search()

    //     // wx.getLocation({
    //     //   isHighAccuracy:true,
    //     //   altitude: 'true',
    //     //   type: 'gcj02',
    //     //   //定位成功，更新定位结果
    //     //   success: function (res) {
    //     //     // console.log("=========",res);

    //     //     loct = res.latitude + ',' + res.longitude
    //     //     console.log(res);

    //     //     var mks = []
    //     //     mks.push({ // 获取返回结果，放到mks数组中
    //     //       latitude: res.latitude,
    //     //       longitude: res.longitude,
    //     //       iconPath: "../../static/images/marker_red.png", //图标路径
    //     //       width: 20,
    //     //       height: 20,

    //     //     })
    //     //     that.setData({
    //     //       longitude: res.longitude,
    //     //       latitude: res.latitude
    //     //     })
    //     //     var wenhuaguan = that.getWenHuaGuanMark()
    //     //     var jiudian = that.getJiuDianMark()
    //     //     var jingqu = that.getJingQuMark()
    //     //     var shangchang = that.getShangChangMark()
    //     //     var canting = that.getCangTingMark()
    //     //     var tushuguan = that.getTuShuGuanMark()
    //     //     Promise.all([wenhuaguan, jiudian, jingqu, shangchang, canting,tushuguan]).then(r => {
    //     //       for (var i = 0; i < r.length; i++) {
    //     //         mks = mks.concat(r[i])
    //     //         that.setData({ //设置markers属性，将搜索结果显示在地图中
    //     //           markers: mks
    //     //         })
    //     //       }
    //     //     })
    //     //   },
    //     //   //定位失败回调  
    //     //   fail: function () {
    //     //     wx.hideLoading();
    //     //     console.log("getLocationFail")
    //     //   },
    //     //   complete: function () {
    //     //     //隐藏定位中信息进度       
    //     //     wx.hideLoading()
    //     //   }
    //     // })

  },

  /**
   * 查询文化馆
   */
  getWenHuaGuanMark: function () {
    // var _this = this;
    // return new Promise((reslove,reject)=>{
    //   wx.request({ //请求地址
    //     url: 'http://127.0.0.1:8828/staticpage/src/json/culturalcenter/culturalcenter_list.json',
    //     method: 'get',
    //     data: {
    //       page: 1,
    //       limit: 1000
    //     },
    //     // data:{},//没有数据可以不写 
    //     header: { //请求头
    //       'content-type': 'application/json'
    //       // "Content-Type": "application/x-www-form-urlencoded"
    //     },
  
    //     //如果在sucess直接写this就变成了wx.request()的this了
    //     success: function (res) {
    //       // res.data相当于ajax里面的data,为后台返回的数据
    //       //打印后台返回的数据
    //       var mks = res.data.data
    //       for (var i = 0; i < mks.length; i++) {
    //         mks[i].iconPath = "/static/images/wenhuaguan.png",
    //         mks[i].width = 20
    //         mks[i].height = 20
    //       }
    //       reslove(mks)
    //       //直接把后台返回的数据 赋值给names 就可以直接调用names了
    //       _this.setData({
    //         markers: mks,
    //       })
    //     }
    //   })
    // })
    var _this = this;
    return new Promise(async (reslove, reject) => {
      qqmapsdk.search({
        keyword: '文化馆', //搜索关键词
        location: loct, //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/static/images/wenhuaguan.png", //图标路径
              width: 20,
              height: 20
            })
          }
          reslove(mks)
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
    })
  },
  /**
   * 查询酒店
   */
  getJiuDianMark: function () {
    var _this = this;
    return new Promise((reslove, reject) => {
      qqmapsdk.search({
        keyword: '酒店', //搜索关键词
        location: loct, //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/static/images/jiudian.png", //图标路径
              width: 20,
              height: 20,
              callout: {
                // content:"服务:青少年英语培训\r\n姓名:陶士涵\r\n电话:18808987876",
                content: '/static/images/jiudian.png',
                bgColor: "#fff",
                padding: "5px",
                borderRadius: "2px",
                borderWidth: "1px",
                borderColor: "#07c160",
                bgimage: ''
              }
            })
          }
          reslove(mks)
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
    })
  },
  /**
   * 查询景区
   */
  getJingQuMark: function () {
    var _this = this;
    return new Promise((reslove, reject) => {
      qqmapsdk.search({
        keyword: '景区', //搜索关键词
        location: loct, //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/static/images/jiudian.png", //图标路径
              width: 20,
              height: 20
            })
          }
          reslove(mks)
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
    })
  },
  /**
   * 查询商场
   */
  getShangChangMark: function () {
    var _this = this;
    return new Promise((reslove, reject) => {
      qqmapsdk.search({
        keyword: '商场', //搜索关键词
        location: loct, //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/static/images/shangchang.png", //图标路径
              width: 20,
              height: 20
            })
          }
          reslove(mks)
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
    })
  },
  /**
   * 查询餐厅
   */
  getCangTingMark: function () {
    var _this = this;
    return new Promise((reslove, reject) => {
      qqmapsdk.search({
        keyword: '餐厅', //搜索关键词
        location: loct, //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/static/images/canting.png", //图标路径
              width: 20,
              height: 20
            })
          }
          reslove(mks)
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
    })
  },

  /**
   * 查询图书馆
   */
  getTuShuGuanMark() {
    var _this = this;
    // return new Promise((reslove,reject)=>{
    //   wx.request({ //请求地址
    //     url: 'http://127.0.0.1:8828/staticpage/src/json/manager/library_list.json',
    //     method: 'get',
    //     data: {
    //       page: 1,
    //       limit: 1000
    //     },
    //     // data:{},//没有数据可以不写 
    //     header: { //请求头
    //       'content-type': 'application/json'
    //       // "Content-Type": "application/x-www-form-urlencoded"
    //     },
  
    //     //如果在sucess直接写this就变成了wx.request()的this了
    //     success: function (res) {
    //       // res.data相当于ajax里面的data,为后台返回的数据
    //       //打印后台返回的数据
    //       var mks = res.data.data
    //       for (var i = 0; i < mks.length; i++) {
    //         mks[i].iconPath = "/static/images/canting.png",
    //         mks[i].width = 20
    //         mks[i].height = 20
    //       }
    //       reslove(mks)
    //       //直接把后台返回的数据 赋值给names 就可以直接调用names了
    //       _this.setData({
    //         markers: mks,
    //       })
    //     }
    //   })
    // })
    return new Promise((reslove, reject) => {
      qqmapsdk.search({
        keyword: '图书馆', //搜索关键词
        location: loct, //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/static/images/canting.png", //图标路径
              width: 20,
              height: 20
            })
          }
          reslove(mks)
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
    })
  },
  showPopup1(e) {
    var that = this
    var tmp = that.data.markers
    // console.log("e",  e.detail.markerId);
    // console.log("tmp",  tmp);
    for(var i = 0 ; i < tmp.length ; i++){
        if(tmp[i].id === e.detail.markerId){
          this.setData({
            show: true,
            t: tmp[i].title,
            a: tmp[i].remarks,
            imgSrc:"/static/images/"+tmp[i].pic
          });
        }
      }
    
 
  },
  onClose() {
    var _this = this
    _this.setData({
      show: false,
    });
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
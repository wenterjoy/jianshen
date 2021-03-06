// home.js
import { ImageModel } from '../../models/ImageModel.js'
var app = getApp()
let image = new ImageModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    categories:[],
    coachcategoryid:0,
    articlecategoryid:0,
    coaches:[],
    envpic:[],
    articles:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //  wx.cloud.callFunction({
    //   // 要调用的云函数名称
    //   name: 'index',
    //   // 传递给云函数的参数
    //   data: {
    //     // 要调用的路由的路径，传入准确路径或者通配符*
    //     $url: 'getUserOpenId',  
    //   },
    //   success: res => {
    //     console.log("getUserInfo success")
    //     console.log(res)
    //   },
    //   fail: err => {
    //     console.log("getUserInfo fail")
    //     console.log(err)
    //   }
    // })

    console.log('onLoad');
    var imagetest = "cloud://qsmart-bnful.7173-qsmart-bnful-1302190475/images/home/home.jpg";
   
    var envpics = [];
     envpics.push(imagetest);
     this.setData({
     envpic: envpics
     });
    // image.getImage("home.jpg", res=>{
    //   console.log(res);
    //   //   let  menuCategories =  res.result.data.data
    //   //   let Coaches = []
    //   //   for(let index in menuCategories) {  
    //   //     Coaches.push( menuCategories[index].category_name);
    //   // }; 
    //   var envpics = [];
    //   envpics.push(res.reuslt.data);
    //   console.log(res.reuslt.data);
    //   this.setData({
    //     envpic: envpics
    //   });
    // })


    // var that = this;
    // wx.setNavigationBarTitle({
    //   title: wx.getStorageSync('mallName')
    // });
    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
    //   data: {
    //     key: 'mallName'
    //   },
    //   success: function (res) {
    //     var banners = [];
    //     var envpics = [];
    //     // for (var i = 0; i < res.data.data.length; i++){
    //     //   if (res.data.data[i].type == "about"){
    //     //     banners.push(res.data.data[i]);
    //     //   }
    //     //   else if (res.data.data[i].type == "env"){
    //     //     envpics.push(res.data.data[i]);
    //     //   }
    //     // }
    //     // that.setData({
    //     //   banners: banners,
    //     //   envpic: envpics
    //     // });
    //   }
    // });

    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/cms/category/list',
    //   success: function (res) {
    //     var categories = [];
    //     var coachcategoryid = 0;
    //     var articlecategoryid = 0;
    //     // for (var i = 0; i < res.data.data.length; i++) {
    //     //   categories.push(res.data.data[i]);
    //     //   if (res.data.data[i].name == "coach"){
    //     //     coachcategoryid = res.data.data[i].id;
    //     //     //console.log(coachcategoryid);
    //     //   } else if (res.data.data[i].name == "FitnessArticles"){
    //     //     articlecategoryid = res.data.data[i].id;
    //     //   }
    //     // }
    //     // that.setData({
    //     //   categories: categories,
    //     //   coachcategoryid: coachcategoryid,
    //     //   articlecategoryid: articlecategoryid
    //     // });
    //     // that.getNewsList(that.data.coachcategoryid);
    //     // that.getNewsList(that.data.articlecategoryid);
    //   }
    // });
  },

  getNewsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    //console.log(categoryId)
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/cms/news/list',
      data: {
        categoryId: categoryId
      },
      success: function (res) {
        var news = [];
        for (var i = 0; i < res.data.data.length; i++) {
          news.push(res.data.data[i]);
        }
        if (categoryId == that.data.coachcategoryid){
          that.setData({
            coaches: news
          });
        }
        else if (categoryId == that.data.articlecategoryid){
          that.setData({
            articles: news
          });
          console.log(news);
        }
      }
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
    return {
      title:"李大力的健身房"
    }
  },

  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  coachswiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  showmap:function (){
    this.openLocationFun(34.203,108.923,15,"李大力健身房","");
  },
  showvideo:function (){
    wx.navigateTo({
      url: '/pages/video/video',
    })
    // wx.getNetworkType({
    //   success: function (res) {
        // var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
        // if (networkType != "wifi"){
        //   wx.showModal({
        //     title: '提示',
        //     content: '当前不是wifi环境，确认要播放视频吗？',
        //     success: function (res) {
        //       if (res.confirm) {
        //         console.log('用户点击确定')
        //       }
        //     }
        //   })
        // }
        // console.log(networkType);
    //   }
    // });
  },
  /**  
 * 使用微信内置地图查看位置  
 * 1、latitude：     纬度，范围为-90~90，负数表示南纬 必填  
 * 2、longitude：    经度，范围为-180~180，负数表示西经 必填  
 * 3、scale：        缩放比例，范围1~28，默认为28 选填  
 * 4、name：         位置名 选填  
 * 5、address：      地址的详细说明 选填  
 * 6、cbSuccessFun： 接口调用成功的回调函数 选填  
 * 7、cbFailFun：    接口调用失败的回调函数 选填  
 * 8、cbCompleteFun：接口调用结束的回调函数（调用成功、失败都会执行） 选填  
 */
  openLocationFun: function(latitude, longitude, scale, name, address, cbSuccessFun, cbFailFun, cbCompleteFun){  
    var openObj= {};  
    openObj.latitude = latitude;  
    openObj.longitude = longitude;  
    openObj.scale = 15;  
    if(scale>0 && scale < 29) {
      openObj.scale = scale;
    }  
    if(name) {
      openObj.name = name;
    }  
    if(address) {
      openObj.address = address;
    }  
    openObj.success = function (res) {
      if (cbSuccessFun) {
        cbSuccessFun();
      }
    }  
    openObj.fail = function (res) {
      if (cbFailFun) {
        cbFailFun();
      } else {
        console.log("openLocation fail:" + res.errMsg);
      }
    }  
    openObj.complete = function (res) {
      if (cbCompleteFun) {
        cbCompleteFun();
      }
    }  
    wx.openLocation(openObj);
  },
  toAllCoachesTap:function (){
    wx.navigateTo({
      url: "/pages/coaches/coaches?coachid=" + this.data.coachcategoryid
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
        
        //用户按了允许授权按钮
        var that = this;
        //插入登录的用户的相关信息到数据库
        wx.request({
            url: app.globalData.urlPath + 'user/add',
            data: {
                openid: getApp().globalData.openid,
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
                province:e.detail.userInfo.province,
                city: e.detail.userInfo.city
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                //从数据库获取用户信息
                that.queryUsreInfo();
                console.log("插入小程序登录用户信息成功！");
            }
        });
        //授权成功后，跳转进入小程序首页
        wx.switchTab({
            url: '/pages/index/index'  
        })
    } else {
        //用户按了拒绝按钮
        wx.showModal({
            title:'警告',
            content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel:false,
            confirmText:'返回授权',
            success:function(res){
                if (res.confirm) {
                    console.log('用户点击了“返回授权”')
                } 
            }
        })
    }
  },
   //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
        url: app.globalData.urlPath + 'user/userInfo',
        data: {
            openid: app.globalData.openid
        },
        // header: {
        //     'content-type': 'application/json'
        // },
        success: function (res) {
            console.log(res.data);
            getApp().globalData.userInfo = res.data;
        }
    });
  }
})
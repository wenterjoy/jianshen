//index.js
//获取应用实例
import { CourseModel } from '../../models/CourseModel.js'
let course = new CourseModel()
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false , // loading
    userInfo: {},
    swiperCurrent: 0,  
    selectCurrent:0,
    categories: [],
    activeCategoryId: 0,
    goods:[],
    scrollTop:"0",
    loadingMoreHidden:true
  },

  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  //事件处理函数
  swiperchange: function(e) {
      //console.log(e.detail.current)
       this.setData({  
        swiperCurrent: e.detail.current  
    })  
  },
  toDetailsTap:function(e){
    wx.navigateTo({
      url:"/pages/goods-details/index?id="+e.currentTarget.dataset.id
    })
  },
  tapBanner: function(e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  bindTypeTap: function(e) {
     this.setData({  
        selectCurrent: e.index  
    })  
  },
  scroll: function (e) {
    //  console.log(e) ;
    var that = this,scrollTop=that.data.scrollTop;
    that.setData({
      scrollTop:e.detail.scrollTop
    })
    // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
    // console.log('scrollTop:'+scrollTop)
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    wx.setNavigationBarTitle({
      title: "全部课程"
    });
    /*
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    */
   course.getAllCourse(res=>{
    console.log(res.result.data);
    var banners = [];
    for (var i = 0; i < res.data.data.length; i++) {
      // if (res.data.data[i].type == "goods") {
      //   banners.push(res.data.data[i]);
      // }
      banners.push(res.data.data[i]);
    }
    this.setData({
      banners: banners
    });

    var categories = [{id:0, name:"全部"}];
    // for(var i=0;i<res.data.data.length;i++){
    //   categories.push(res.data.data[i]);
    // }
    that.setData({
      categories:categories,
      activeCategoryId:0
    });
    that.getGoodsList(0);
  })
    // wx.request({
    //   url: 'getAllCourse',
    //   data: {
    //     key: 'mallName'
    //   },
    //   success: function(res) {
    //     console.log(res);
    //     var banners = [];
    //     for (var i = 0; i < res.data.data.length; i++) {
    //       if (res.data.data[i].type == "goods") {
    //         banners.push(res.data.data[i]);
    //       }
    //     }
    //     that.setData({
    //       banners: banners
    //     });
    //   }
    // })
    // wx.request({
    //   url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/shop/goods/category/all',
    //   success: function(res) {
    //     var categories = [{id:0, name:"全部"}];
    //     for(var i=0;i<res.data.data.length;i++){
    //       categories.push(res.data.data[i]);
    //     }
    //     that.setData({
    //       categories:categories,
    //       activeCategoryId:0
    //     });
    //     that.getGoodsList(0);
    //   }
    // })

  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    //console.log(categoryId)
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/shop/goods/list',
      data: {
        categoryId: categoryId
      },
      success: function(res) {
        that.setData({
          goods:[],
          loadingMoreHidden:true
        });
        var goods = [];
        if (res.data.code != 0 || res.data.data.length == 0) {
          that.setData({
            loadingMoreHidden:false,
          });
          return;
        }
        for(var i=0;i<res.data.data.length;i++){
          goods.push(res.data.data[i]);
        }
        that.setData({
          goods:goods,
        });
      }
    })
  }
})

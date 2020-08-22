//app.js
import { UserModel } from '/models/UserModel.js'

//const userField = require("../cloud/index/fields/userField.js");

let user = new UserModel()
App({
  onLaunch: function () {
    console.log('大神App onLaunch');
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
     // wx.cloud.init({
     //   env: 'release-prod',
     //   traceUser: true
     // })
	  wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'qsmart-bnful',
        traceUser: true,
      })
    }

   
    this.getUserInfo();
    this.registerUser();
    //this.login();
    // this.getUserInfo();
    // this.globalData = {}

  },
  login : function () {

   
    var that = this;
    // var token = that.globalData.token;
    // if (token) {
    //   wx.request({
    //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
    //     data: {
    //       token: token
    //     },
    //     success: function (res) {
    //       if (res.data.code != 0) {
    //         that.globalData.token = null;
    //         that.login();
    //       }
    //     }
    //   })
    //   return;
    // }
    wx.login({
      success: function (res) {
        console.log("wx.login success")
        console.log(res)
        wx.request({
          url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/user/wxapp/login',
          data: {
            code: res.code
          },
          success: function(res) {
            if (res.data.code == 10000) {
              // 去注册
              that.registerUser();
              return;
            }
            if (res.data.code != 0) {
              // 登录错误 
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel:false
              })
              return;
            }
            that.globalData.token = res.data.data.token;
          }
        })
      },
      fail: err => {
        console.log(" wx.login fail")
        console.log(err)
      }
    })
  },
  getUserInfo:function() {
    
    wx.getUserInfo({
      success:(data) =>{
        console.log("wx.getUserInfo success")
        console.log(data)
        this.globalData.userInfo = data.userInfo;
        console.log(this.globalData.userInfo);
        return this.globalData.userInfo;
      },
      fail: err => {
        console.log("wx.getUserInfo fail")
        console.log(err)
      }
    })
    return;
    // //wx.getUserInfo({
    //   wx.cloud.callFunction({
    //     // 要调用的云函数名称
    //     name: 'index',
    //     // 传递给云函数的参数
    //     data: {
    //       // 要调用的路由的路径，传入准确路径或者通配符*
    //       $url: 'getUserOpenId',  
    //     },
    //     //success:(data) =>{
    //     success: res => {
    //       console.log("getUserOpenId success")
    //       console.log(res)
    //       let openId = res.data.OPENID;

    //       console.log(this.globalData.userInfo);
    //       return this.globalData.userInfo;
    //     },
    //     fail: err => {
    //       console.log("getUserOpenId fail")
    //       console.log(err)
    //     }
    // })
  },
  registerUser: function () {
    console.log("registerUser");
     wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'index',
      // 传递给云函数的参数
      data: {
        // 要调用的路由的路径，传入准确路径或者通配符*
        $url: 'getUserOpenId',  
      },
      success: res => {
        console.log("getUserOpenId success")
        console.log(res)
        this.globalData.openId = res.result.data.OPENID;
        let openId = res.result.data.OPENID;
        console.log("openId:" + openId)
        user.getUserByOpenId(openId, res=>{
          console.log("user.getUserInfoByOpenId")
          console.log(res);
          if (0 == res.result.code && 1 <= res.result.data.data.length) {
            console.log("we have this user")
          }
          else {
            console.log("we need create this user")
            user.create(openId, this.globalData.userInfo, res=>{
               if(0 == res.result.code) {
                  console.log("user create success")
               }
               else {
                console.log("user create fail")
               }
            });
          }
        });
      },
      fail: err => {
        console.log("getUserOpenId fail")
        console.log(err)
      }
    })
  },
  globalData:{
    userInfo:null,
    openId:null,
    subDomain:"34vu54u7vuiuvc546d"
  }
})

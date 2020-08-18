//app.js
App({
  onLaunch: function () {
    
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

    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'index',
      // 传递给云函数的参数
      data: {
        // 要调用的路由的路径，传入准确路径或者通配符*
        $url: 'getUserInfo', 
        data: "" 
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })

    return;
    this.login();
    this.getUserInfo();
    this.globalData = {}

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
      }
    })
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'https://api.it120.cc/' + that.globalData.subDomain +'/user/wxapp/register/complex',
              data: {code:code,encryptedData:encryptedData,iv:iv}, // 设置请求的 参数
              success: (res) =>{
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
  },
  getUserInfo:function() {
    wx.getUserInfo({
      success:(data) =>{
        this.globalData.userInfo = data.userInfo;
        console.log(this.globalData.userInfo);
        return this.globalData.userInfo;
      }
    })
  },
  globalData:{
    userInfo:null,
    subDomain:"34vu54u7vuiuvc546d"
  }
})

// coaches-detail.js

var app = getApp()
import { CoachModel } from '../../models/CoachModel.js'
let coachModel = new CoachModel()
import { OrderModel } from '../../models/OrderModel.js'
let orderModel = new OrderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime:[
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
      "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
      "21:00", "21:30", "22:00", "23:00", "23:30", "24:00"
    ],
    endTime: ["请先选择起始时间"],
    selstartTime:"请选择",
    selendTime:"请选择",
    date : [],
    activedateid : 0,
    modalContent: "",
    modalHidden: true,
    account: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('onLoad');
    const coachId = options.id;
    console.log("coachId:" + coachId)
    const that = this;
    coachModel.getCoachById(coachId, res=>{
        console.log(res);
        const coach = res.result.data.data[0];
        that.setData({
          coach
        })
    });

    var date = [];
    for(var i = 0;i<7;i++){
      var onedate = {};
      onedate.id = i;
      onedate.datestr = that.fun_date(i);
      date.push(onedate);
    }
    var datetime = new Date();
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const curtime = (hours < 10 ? ('0' + hours) : hours) + ":" + (minutes < 10 ? ('0' + minutes) : minutes);
    var startTime = that.data.startTime;
    startTime = this.getTimeArray(startTime, curtime);
    that.setData({
      date:date,
      startTime: startTime
    })
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
  
  },
  initendTimeData: function (startTime) {

  },
  bindPickerstartTimeChange: function (event) {
    var selIterm = this.data.startTime[event.detail.value];
    if (selIterm === "今天无有效时间") {
      return;
    }
    var endTime = this.data.startTime;
    endTime = this.getTimeArray(endTime, selIterm);
    this.setData({
      selstartTime: selIterm,
      endTime: endTime
    })
    // this.initCityData(2, selIterm)
  },
  bindPickerendTimeChange: function (event) {
    var selIterm = this.data.endTime[event.detail.value];
    if (selIterm === "请先选择起始时间" || selIterm === "今天无有效时间"){
      return;
    }
    this.setData({
      selendTime: selIterm,
    })
  },
  tabClick: function (e) {
    var d = new Date();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    const curtime = (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    var startTime = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
      "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
      "21:00", "21:30", "22:00", "23:00", "23:30", "24:00"
    ];
    if (this.data.date[e.currentTarget.id].datestr.indexOf(curtime) >= 0){
      var datetime = new Date();
      const hours = datetime.getHours();
      const minutes = datetime.getMinutes();
      const curtime = (hours < 10 ? ('0' + hours) : hours) + ":" + (minutes < 10 ? ('0' + minutes) : minutes);
      startTime = this.getTimeArray(startTime, curtime);
    }
    this.setData({
      selstartTime: "请选择",
      selendTime: "请选择",
      startTime: startTime,
      endTime: ["请先选择起始时间"],
      activedateid: e.currentTarget.id
    });
  },
  fun_date: function(a){
    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate()+a);
    var mon = date2.getMonth() + 1;
    var day = date2.getDate();
    var time = (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    if(a === 0){
      time += '(今)';
    }
    else if (a === 1) {
      time += '(明)';
    }
    return time;
  },
  getTimeArray:function(arr,obj){
    var index = -1;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > obj) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      arr = arr.slice(index);
    }
    else {
      arr = ["今天无有效时间",];
    }
    return arr;
  },
  appointtap:function(){
    if (this.data.selendTime === "请选择" || this.data.selstartTime === "请选择"){
      wx.showToast({
        title: '请先选择正确的预约时段',
        image: '../../images/popup-close.png'
      });
      return;
    }
    const curselDay = this.data.date[this.data.activedateid].datestr;
    this.setData({
      modalContent: '请确认您预定的教练信息\r\n教练: ' + this.data.coach.coach_name + '\r\n预约日期: ' + curselDay +'\r\n预约时间: ' + this.data.selstartTime + '--' + this.data.selendTime + '\r\n请检查无误后点击确认',
      modalHidden: false
    });
  },
  modalHide: function () {
    this.setData({
      modalContent: '',
      modalHidden: true
    });
    // wx.showModal({
    //   title: '提示',
    //   content: '具体预约方式待与商家沟通后继续开发。谢谢配合。',
    // })
    const that = this;
    // 提交订单
    // // 判断是否选择地址
    // if (this.data.address.length == 0) {
    //   this._showToast('none', '请选择地址')
    //   return
    // }
    
      if (false) {//!res.authSetting['scope.userInfo']) {
        // wx.showModal({
        //   title: '授权提示',
        //   content: '下单需要在个人中心授权！',
        //   success(res) {
        //     wx.switchTab({
        //       //url: '/pages/my/my'
        //     })
        //   }
        // })
      } else {
        // 判断是否是旧订单
        if (this.data.oldOrder) {
          this._showToast('none', '订单已生成，无需重复提交')
          return
        }
       
        let products = []
        var product = {
          product_name: "私教课",
          coach: that.data.coach,
          
        }
        var openId = app.globalData.openId;
        products.push(product)
        // 地址拼接
        let orderData = {
          products,
          openId: openId,
          status: 4,
          statusStr: "已下单",
          start_time: that.data.selstartTime,
          end_time: that.data.selendTime
        }
        orderData.products = products;
        console.log("订单对应的openId")
        console.log(orderData.openId)
        // 创建订单
        orderModel.creat(orderData, res => {
          console.log("订单创建结果：")
          console.log(res)
          if (res.result.code == 0) {
            that._showToast('none', '订单创建成功!')
            // 设置成就订单
            that.setData({
              oldOrder: true
            })
            
            // if (this.data.from == 'cart') {
            //   let ids = []
            //   let products = this.data.products
            //   for (let i = 0; i < products.length; i++) {
            //     ids.push(products[i]._id);
            //   }
            //   cartmodel.delete(ids, res => { })
            // }

            // wx.showModal({
            //   title: '支付提示',
            //   content: '支付暂未实现！',
            //   success(res) {
            //     wx.switchTab({
            //       url: '/pages/my/my'
            //     })
            //   }
            // })
          }
        })


      }
  },
  modalHideCancle: function () {
    this.setData({
      modalContent: '',
      modalHidden: true
    });
  },
  _showToast: function (type, msg) {
    wx.showToast({
      icon: type,
      title: msg
    })
  }
})
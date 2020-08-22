import { CloudRequest } from '../utils/cloud-request.js'
class UserModel extends CloudRequest {
    /**
     * 获取用户数据根据openid
     * @param {*} callBack 
     */
    getUserInfoByOpenId(open_id, callBack){
        console.log("我们到getUserInfoByOpenId了")
        this.request({
            url: "getUserInfoByOpenId",
            data:{open_id:open_id},
            success: res => {
              callBack(res)
            }
        })
    }

        /**
     * 创建用户
     * @param {*} callBack 
     */
    create(openId, userInfo, callBack){
        console.log("我们到create了")
        this.request({
            url: "creatUser",
            data:{
                openId:openId,
                userInfo: userInfo
            },
            success: res => {
              callBack(res)
            }
        })
    }
     // wx.cloud.callFunction({
    //   // 要调用的云函数名称
    //   name: 'index',
    //   // 传递给云函数的参数
    //   data: {
    //     // 要调用的路由的路径，传入准确路径或者通配符*
    //     $url: 'getUserInfo', 
    //     data: "" 
    //   },
    //   success: res => {
    //     console.log(res)
    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
}
export { UserModel }
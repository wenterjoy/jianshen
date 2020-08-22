const model = require('../models/BaseModel.js')
const { USER } = require('../config/tableConfig.js')
const { USERFIELD } = require('../fields/userField.js')

//orderData,userInfo
const create = (openId, userInfo) => {
    // 添加用户详情
    let create_time = new Date()
    let update_time = new Date()
    let user = {
        openId:  openId,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        city: userInfo.city,
        country: userInfo.country,
        gender: userInfo.gender,
        language: userInfo.language,
        gender: userInfo.gender,
        province: userInfo.province,
        pic:"",
        create_time: create_time,
        update_time: update_time
    }
    
    // 创建用户
    let result = model.add(USER, user);
    return result
}
/**
 * 根据订单id获取订单信息
 * @param {*} orderId 
 */
const getUserByOpenId = (openId) => {
    let options = { openId: openId }
    return model.query(USER, USERFIELD, options)
}

// /**
//  * 根据用户openid获取信息
//  * @param {*} userInfo 
//  */
// const getOrderList = (userInfo, page = 0, size = 20, order = {}) => {
//     order.name = 'create_time'
//     order.orderBy = 'desc'
//     let options = { buyer_openid: userInfo.openId }
//     return model.query(ORDER, ORDERFIELD, options, page, size, order)
// }


module.exports = {
    create,
    getUserByOpenId
}
const model = require('../models/BaseModel.js')
const { ORDER } = require('../config/tableConfig.js')
const { ORDERFIELD } = require('../fields/orderField.js')

//orderData,userInfo
const create = (orderData) => {
    let orderdetailS = []
    // 添加订单详情
    let create_time = new Date()
    let update_time = new Date()
    let order_pic = "";
    let order_coach_name = "";
    for (let product of orderData.products) {
        let params_order_detail = {
            //product_id: product._id,
            product_name: product.product_name,
            //product_price: product.product_sell_price,
            //product_count: product.counts,
            //product_img: product.product_img,
            coach_id: product.coach.coach_id,
            coach_name: product.coach.coach_name,
            pic: product.coach.pic
        }
        order_pic = params_order_detail.pic
        order_coach_name = params_order_detail.coach_name
        orderdetailS.push(params_order_detail)

    }

    // 订单信息
    let params_order = {
        buyer_openid: orderData.openId,
        //buyer_name: orderData.address.userName,
        //buyer_phone: orderData.address.phone,
        //buyer_address: orderData.address.detailAddress,
        //order_amount: orderData.account,
        status:  orderData.status,// 默认未付款
        statusStr:  orderData.statusStr,
        create_time: new Date(),
        update_time: new Date(),
        orderdetail: orderdetailS,
        start_time: orderData.start_time,
        end_time: orderData.end_time,
        pic: order_pic,
        coach_name: order_coach_name
    }

    // 订单生成
    let order = model.add(ORDER, params_order);
    return order
}
/**
 * 根据订单id获取订单信息
 * @param {*} orderId 
 */
const getOrderById = (orderId) => {
    return model.findById(ORDER, ORDERFIELD, orderId)
}

/**
 * 根据用户openid获取信息
 * @param {*} userInfo 
 */
const getOrderList = (openId, page = 0, size = 20, order = {}) => {
    order.name = 'create_time'
    order.orderBy = 'desc'
    let options = { buyer_openid: openId }
    return model.query(ORDER, ORDERFIELD, options, page, size, order)
}


module.exports = {
    create,
    getOrderById,
    getOrderList
}
import { CloudRequest } from '../utils/cloud-request.js'
class OrderModel extends CloudRequest {

    /**
     * 生成订单
     * @param {*} orderData 
     * @param {*} callBack 
     */
    creat(orderData, callBack) {
        this.request({
            url: "creatOrder",
            data: { orderData: orderData },
            success: res => {
                console.log(res.data);
                callBack(res)
            }
        })
    }

    /**
     * 根据订单id查询
     * @param {*} orderId 
     * @param {*} callBack 
     */
    getOrderById(orderId, callBack) {
        this.request({
            url: "getOrderById",
            data: { orderId: orderId },
            success: res => {
                console.log(res.data);
                callBack(res)
            }
        })
    }

    /**
     * 查询订单
     * @param {*} callBack 
     */
    getOrderList(callBack) {
        this.request({
            url: "getOrderList",
            success: res => {
                console.log(res.data);
                callBack(res)
            }
        })
    }

    


}

export { OrderModel }
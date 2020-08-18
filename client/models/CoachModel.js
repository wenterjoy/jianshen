import { CloudRequest } from '../utils/cloud-request.js'
class CoachModel extends CloudRequest {
    /**
     * 获取分类
     * @param {*} callBack 
     */
    getCoachById(coach_id, callBack){
        console.log("我们到getCoachById了")
        this.request({
            url: "getCoachById",
            data:{coach_id:coach_id},
            success: res => {
                //console.log(res.data);
              callBack(res)
            }
        })
    }
    
    /**
     * 根据商品类型获取商品
     * @param {*} category_type 
     * @param {*} callBack 
     */
    getCateGoryProduct(category_type,callBack){
        this.request({
            url: "getCategoryProduct",
            data:category_type,
            success: res => {
              callBack(res)
            }
        })
    }

}
export { CoachModel }
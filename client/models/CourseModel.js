import { CloudRequest } from '../utils/cloud-request.js'
class CourseModel extends CloudRequest {
    /**
     * 获取分类
     * @param {*} callBack 
     */
    getAllCourse(callBack){
        console.log("我们到getAllCourse了")
        this.request({
            url: "getAllCourse",
            success: res => {
                console.log(res.data);
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
export {CourseModel }
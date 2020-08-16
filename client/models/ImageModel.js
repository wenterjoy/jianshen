import { CloudRequest } from '../utils/cloud-request.js'
class ImageModel extends CloudRequest {
    /**
     * 获取分类
     * @param {*} callBack 
     */
    getImage(imageUrl, callBack){
        console.log("我们到getImage了");
        console.log("imageUrl:" + imageUrl);
        this.request({
            url: "getImage",
            data: { imageUrl: imageUrl },
            success: res => {
                console.log(res.data);
              callBack(res)
            }
        })
    }
    
  

}
export { ImageModel }
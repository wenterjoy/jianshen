const model = require('../models/BaseModel.js')
const { IMAGE } = require('../config/tableConfig.js')
const { IMAGE_FIELD } = require('../fields/appointField.js')
const IMAGEPREFIX = "cloud://qsmart-bnful.7173-qsmart-bnful-1302190475/images/"
/**
 * 获取图片
 * @return 
 */
const getImage = (imageUrl) => {
  //let options = {product_theme:imageUrl}
  return  IMAGEPREFIX + "home/" + imageUrl;
}






module.exports = {
  getImage
}
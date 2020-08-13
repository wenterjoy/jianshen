const model = require('../models/BaseModel.js')
const { COURSE } = require('../config/tableConfig.js')
const { COURSE_FIELD } = require('../fields/courseField.js')
/**
 * 获取商品分类
 * @return 
 */
const getAppointList = () =>{
  return model.query(COURSE, COURSE_FIELD)
}






module.exports = {
  getAppointList
}
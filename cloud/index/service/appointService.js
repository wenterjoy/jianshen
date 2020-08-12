const model = require('../models/BaseModel.js')
const { APPOINT } = require('../config/tableConfig.js')
const { APPOINT_FIELD } = require('../fields/appointField.js')
/**
 * 获取商品分类
 * @return 
 */
const getAppointList = () =>{
  return model.query(APPOINT, APPOINT_FIELD)
}






module.exports = {
  getAppointList
}
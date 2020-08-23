const model = require('../models/BaseModel.js')
const { COACH } = require('../config/tableConfig.js')
const {  COACH_FIELD } = require('../fields/coachField.js')
const cloud = require('wx-server-sdk');

/**
 * 根据教练id获取教练信息
 * @param {*} coach_id 
 */

const getCoachById = (coachid) => {
  let options = { coach_id: coachid }
  return cloud.database().collection('coach')
  .where({
    coach_id: coachid
  })
  .field({
      coach_name: true,
      coach_id: true,
      pic: true,
      keywords: true,
      _id: true,
      Graduated: true,
      descript: true
  })
  .get()// model.query(COACH, COACH_FIELD, options)
}




module.exports = {
  getCoachById
}
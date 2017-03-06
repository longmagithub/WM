import Mock from 'mockjs'

Mock.mock('/api/test', {
  'province|2-4': {
    '110000': '北京市',
    '120000': '天津市',
    '130000': '河北省',
    '140000': '山西省'
  }
})

module.exports = Mock

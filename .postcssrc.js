module.exports = {
  plugins: {
    'autoprefixer': {
      // browsers: ['Android >= 4.0'. 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      // 要进行处理的属性列表
      propList: ['*']
    }
  }
}
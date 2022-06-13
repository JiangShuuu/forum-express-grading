const dayjs = require('dayjs')
module.exports = {
  currentYear: () => dayjs().year(), // 加逗號
  // 新增以下
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}

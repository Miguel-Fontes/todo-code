'use strict'
let container = function (spec, my) {
  let that = {}
  my = my || {}

  let content = spec.value

  that.get = () => {
    return content
  }

  that.log = () => {
    console.log(content)
  }

  that.map = (f) => {
    content = content.map(f)
  }

  return that
}

module.exports = container
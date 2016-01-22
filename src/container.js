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

  that.map = (f, t) => {
    content = content.map(f, t)
  }

  that.filter = (f, t) => {
    content = content.filter(f, t)
  }

  return that
}

module.exports = container

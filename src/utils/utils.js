;(function () {
  exports.log = function log () {
    console.log.apply(this, exports.flattenObj(arguments))
  }

  exports.flattenObj = function flattenObj (obj) {
    var args = []

    Object.keys(obj)
      .forEach(function (value) { args.push(obj[value])
      })

    args = args.reduce(function (a, b) {
      return a.concat(b)
    })
    return args
  }
})()

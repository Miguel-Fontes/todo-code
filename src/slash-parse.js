'use strict'
var slashParse = (file) => {

  if (file.content.constructor == Array) {
    file.content = file.content.map(function (value) {
      return '->->->->->' + value
    })
  } else {
    file.content = '->->->->->->->->' + file.content
  }
  return file
}
module.exports = slashParse

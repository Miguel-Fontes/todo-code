'use strict'
var directory = require('./directory')({path: '.\\', recursive: true, extensions: ['.js']})
var file = require('./file')({parse: [require('./todo-parse'), require('./slash-parse')]})
var container = require('./container')

try {
  let archive = container({value: directory.getContent()})
  
  archive.map(function (f) {
    return file
      .open(f)
      .parse()
      .getData()
  })

  archive.log()

} catch (e) {
  console.log(e)
}

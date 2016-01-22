'use strict'
var directory = require('./directory')({path: './/..//', recursive: true, extensions: ['.js'], ignore: ['node_modules', '.git', 'vscode', 'dist']}) // Para um teste mais legal -> .//..//..//loja-concept//
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

  archive.filter((f) => {
    if (f.content.length > 0) {
      return true
    }
  })

  archive.log()

} catch (e) {
  console.log(e)
}

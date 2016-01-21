'use strict'
var directory = require('./directory')({path: '.\\', recursive: false, extensions: ['.js']})
var file = require('./file')({parse: [require('./todo-parse'), require('./slash-parse')]})

try {
  let todos = []

  let arquivos = directory.getContent()

  for (let arquivo of arquivos) {

    todos.push(file
      .open(arquivo)
      .parse()
      .getData())
  }

  console.log(todos)

} catch (e) {
  console.log(e)
}

'use strict'
var directory = require('./directory')
var file = require('./file')
var parseTodo = require('./todo-parse')

try {
  const esteDiretorio = Object.freeze({path: '.\\', recursive: false, extensions: ['.js']})

  let arquivos = directory(esteDiretorio)
    .getContent()

  arquivos.forEach((arquivo) => {
    
    arquivo.parse = parseTodo
      
    file(arquivo)
      .parse()
      .listar()
  })

} catch (e) {
  console.log(e)
}

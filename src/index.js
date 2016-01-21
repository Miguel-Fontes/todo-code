'use strict'
var directory = require('./directory')
var file = require('./file')({parse: [require('./todo-parse'), require('./slash-parse')]})

try {
  const esteDiretorio = Object.freeze({path: '.\\', recursive: false, extensions: ['.js']})

  let arquivos = directory(esteDiretorio)
    .getContent()

  arquivos.forEach((arquivo) => {

    file
      .open(arquivo)
      .parse()
      .listar()
  })

} catch (e) {
  console.log(e)
}

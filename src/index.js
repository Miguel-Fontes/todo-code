// Abrir arquivo
// Ler arquivo
// Pesquisar token específico
// Onde parar de pesquisar o token?
'use strict'

Function.prototype.method = function (name, func) {
  this.prototype[name] = func
  return this
}

Function.method('curry', function () {
  var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)))
  }
})

var file = function file (spec) {
  let that = {}
  const fs = require('fs')

  let contents = ''

  const path = spec.path || null
  const file = spec.file || null

  parseTodo(that)

  openFile()

  function openFile () {
    try {
      contents = fs.readFileSync(path + file).toString()
      return that
    } catch (e) {
      throw new Error('Erro ao abrir arquivo ' + path + file + '! - ' + e)
    }
  }

  that.readData = () => {
    return contents
  }

  return that
}

var parseTodo = function (that) {
  const token = '.*todo.*'
  const regex = new RegExp(token, 'gi')
  const trim = (value) => {
    return value.replace(/^\s*/gi, '')
  }

  Array.prototype.listar = function listar () {
    this.forEach(function (value, index) {
      console.log(index + ' -> ' + value)
    })
  }

  that.parse = () => {
    let content = that.readData().match(regex) || []
    return content.map(trim)
  }
}

var directory = (spec) => {

  const fs = require('fs')
  const path = spec.path || null

  var that = {}

  let files = []

  readDirectory()

  function readDirectory () {
    try {
      files = fs.readdirSync(path).map(function (value) {
        return {path: path, file: value}
      })
      return that
    } catch (e) {
      throw new Error('Erro ao ler o diretório ' + path + '! - ' + e)
    }
  }
  readDirectory()
  that.getContent = () => {
    return files
  }

  return that

}

try {
  /*  file({path: '.\\', file: 'log.js'})
      .openFile()
      .parse()
      .listar()*/

  let arquivos = directory({path: '.\\'})
    .getContent()

  arquivos.forEach((arquivo) => {
    file(arquivo)
      .parse()
      .listar()
  })

} catch (e) {
  console.log(e)
}

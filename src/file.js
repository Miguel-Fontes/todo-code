'use strict'
var file = (spec) => {
  let that = {}
  const fs = require('fs')

  let file = {}

  that.open = (f) => {
    if (!f) throw new Error('Arquivo para leitura não informado!')
    try {
      file.name = f.name
      file.content = fs.readFileSync(f.path + f.name).toString()

      return that
    } catch (e) {
      throw new Error('Erro na leitura de arquivo ' + f.path + f.name + '! - ' + e)
    }
  }

  that.getData = () => {
    return file
  }

  that.parse = () => {
    if (spec && spec.hasOwnProperty('parse')) {
      spec.parse.forEach(function (parser) {
        parser(file)
      })
    }

    return that
  }

  that.listar = () => {
    let file = that.getData()

    console.log('--- Arquivo: ' + file.name)
    for (let todo of file.content) {
      console.log('------> ' + todo)
    }
  }

  return that
}

module.exports = file

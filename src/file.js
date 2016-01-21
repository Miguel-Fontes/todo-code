'use strict'
var file = (spec) => {
  let that = {}
  const fs = require('fs')

  let file = {}

  that.open = (f) => {
    if (!f && f.hasOwnProperty(f.name) && f.hasOwnProperty(f.path)) throw new Error('Arquivo para leitura não informado!')
    try {
      file = {} // Totalmente necessário para quebrar a referência.
      file.name = f.name
      file.content = fs.readFileSync(f.path + f.name).toString()
      file.path = f.path

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
    for (let content of file.content) {
      console.log(content)
    }
    return that
  }

  return that
}

module.exports = file

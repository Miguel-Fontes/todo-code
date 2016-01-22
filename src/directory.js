'use strict'
var directory = (spec) => {

  const fs = require('fs')
  const path = spec.path || null
  const extensions = spec.extensions || []
  const recursive = spec.recursive || null
  // TODO: Implementar recursão de subdiretórios
  // TODO: Validar parâmetros de diretório indicados

  var that = {}

  let files = []

  readDirectory()

  function readDirectory () {
    try {
      files = fs.readdirSync(path)

      // formato os arquivos em objetos
      files = files.map(function (value) {
        return {path: path, name: value}
      })

      files.forEach((value) => {
        if (fs.statSync(value.path + value.name).isDirectory() && recursive) {
          let newDirectory = directory({path: value.path + value.name + '\\', recursive: recursive, extensions: extensions}).getContent()          
          files = files.concat(newDirectory)


        }
      })

      // Filtro arquivos que não possuem as extensões indicadas
      files = files.filter(function (value) {
        for (let ext of extensions) {
          if (value.name.substr(ext.length * -1, ext.length) === ext) {
            return true
          }
        }
      })

      return that
    } catch (e) {
      throw new Error('Erro ao ler o diretório ' + path + '! - ' + e)
    }
  }

  that.getContent = () => {
    return files
  }

  return that
}

module.exports = directory

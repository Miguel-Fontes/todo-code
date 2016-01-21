'use strict'
var directory = (spec) => {

  const fs = require('fs')
  const path = spec.path || null
  const extensions = spec.extensions || null
  const recursive = spec.recursive || null
  // TODO: Implementar recursão de subdiretórios
  
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

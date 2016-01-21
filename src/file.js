'use strict'
var file = (spec) => {
  let that = {}
  const fs = require('fs')

  let file = {}

  const path = spec.path || null
  const name = spec.name || null
  const parse = spec.parse || null

  openFile()

  function openFile () {
    try {
      file.name = name
      file.content = fs.readFileSync(path + name).toString()

      return that
    } catch (e) {
      throw new Error('Erro ao abrir arquivo ' + path + name + '! - ' + e)
    }
  }

  that.readData = () => {
    return file
  }

  that.listar = () => {
    let file = that.readData()

    console.log('--- Arquivo: ' + file.name)
    for (let todo of file.content) {
      console.log('-> ' + todo)
    }
  }

  if (parse) parse(that)

  return that
}

module.exports = file

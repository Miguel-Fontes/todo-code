'use strict'
var parseTodo = (file) => {
  const token = '.*\\/(?:\\/|\\*)\\s?\\*?todo.*'
  const endToken = ''
  // TODO: Implementar possibilidade de ler strings de um start-token até um end-token
  const regex = new RegExp(token, 'gi')
  const trim = (value) => {
    return value.replace(/^\s*/gi, '')
  }

  const removeSlash = (value) => {
    return value.replace(/^\/\//gi, '')
  }

  file.content = file.content.match(regex) || []
  file.content = file.content.map(trim).map(removeSlash)

  return file
}
module.exports = parseTodo

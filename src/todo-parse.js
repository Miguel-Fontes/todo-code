'use strict'
var parseTodo = (file) => {
  const token = '.*\\/(?:\\/|\\*)\\s?\\*?todo.*'
  const endToken = ''
  // TODO: Implementar possibilidade de ler strings de um start-token até um end-token
  const regex = new RegExp(token, 'gi')
  const trim = (value) => {
    return value.replace(/^\s*/gi, '')
  }

  let value = file
  value.content = value.content.match(regex) || []
  value.content = value.content.map(trim)

  return file
}
module.exports = parseTodo

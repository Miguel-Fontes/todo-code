'use strict'
var parseTodo = (that) => {
  const token = '.*\\/(?:\\/|\\*)\\s?\\*?todo.*'
  const endToken = ''
  // TODO: Implementar possibilidade de ler strings de um start-token até um end-token
  const regex = new RegExp(token, 'gi')
  const trim = (value) => {
    return value.replace(/^\s*/gi, '')
  }

  that.parse = () => {
    let value = that.readData()
    value.content = that.readData().content.match(regex) || []
    value.content = value.content.map(trim)
    return that
  }
}
module.exports = parseTodo
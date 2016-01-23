'use strict'
var directory = require('./directory')({path: './/', recursive: true, extensions: ['.js'], ignore: ['node_modules', '.git', 'vscode', 'dist']})
var file = require('./file')({parse: [require('./todo-parse')]})
var container = require('./container')

try {
  let archive = container({value: directory.getContent()})

  archive.map(function (f) {
    return file
      .open(f)
      .parse()
      .getData()
  })

  archive.filter((f) => {
    if (f.content.length > 0) {
      return true
    }
  })

  const todos = archive.get()

  document.write('<div class="todo-panel">')
  todos.forEach(function (value) {
    document.write('<section class="todo-card">')
    document.write('<p>' + value.name + ' - [' + value.path + ']' + '<p>')
    document.write('<ul>')
    value.content.forEach(function (content) {
      document.write('<li><i class="fa fa-angle-double-right"></i>' + content + '</li>')
    })
    document.write('</ul>')
    document.write('</section>')
  })
  document.write('</div>')

} catch (e) {
  console.log(e)
}

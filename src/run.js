'use strict'
var directory = require('./directory')({path: './/..//Highland//', recursive: true, extensions: ['.js'], ignore: ['node_modules', '.git', 'vscode', 'dist']})
var file = require('./file')({parse: [require('./todo-parse')]})
var container = require('./container')

// TODO: Extrair a library de tratamento de arquivos para módulo separado e publicar no NPM. Usar aqui como dependência.
// TODO: Pesquisar formas de templating para implementar cards
// TODO: Possibilitar configuração da aplicação (seleção de diretório para ser monitorado)
// TODO: Empacotar aplicação
// TODO: Tratamento de parâmetros e diretórios

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

  document.write('<div class="c-todo-panel">')
  todos.forEach(function (value) {
    document.write('<section class="c-todo-card t-box-shadow">')
    document.write('<p>' + value.name + ' - [' + value.path + ']' + '<p>')
    document.write('<ul class="c-todo-list">')
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

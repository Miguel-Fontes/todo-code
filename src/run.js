'use strict'
let run = (function (e) {
  let directory = require('./directory'),
    file = require('./file')({parse: [require('./todo-parse')]}),
    container = require('./container'),
    path = e.target.attributes['x-data-path'].value,
    projectFiles

  // TODO: Extrair a library de tratamento de arquivos para módulo separado e publicar no NPM. Usar aqui como dependência.
    // TODO: Pesquisar formas de templating para implementar cards
    // TODO: Possibilitar configuração da aplicação (seleção de diretório para ser monitorado)
    // TODO: Empacotar aplicação
    // TODO: Tratamento de parâmetros e diretórios

  projectFiles = directory({
    path: path,
    recursive: true,
    extensions: ['.js'],
    ignore: ['node_modules', '.git', 'vscode', 'dist']
  })

  try {
    let archive = container({value: projectFiles.getContent()})

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

    let todoPanel = document.getElementsByClassName('c-todo-panel')[0]
    todoPanel.innerHTML = ''
    let card, title, list, todo, todoMarker

    todos.forEach(function (value) {
      card = document.createElement('section')
      card.classList.add('c-todo-card')
      card.classList.add('t-box-shadow')

      title = document.createElement('p')
      title.innerHTML = (value.name + ' - [' + value.path + ']')

      list = document.createElement('ul')
      list.classList.add('c-todo-list')
      list.classList.add('o-list-unstyled')

      value.content.forEach(function (content) {
        todo = document.createElement('li')
        todoMarker = document.createElement('i')
        todoMarker.classList.add('fa')
        todoMarker.classList.add('fa-angle-double-right')
        todo.appendChild(todoMarker)
        todo.innerHTML += content
        list.appendChild(todo)
      })

      card.appendChild(title)
      card.appendChild(list)
      todoPanel.appendChild(card)
    })
  } catch (e) {
    console.log(e)
  }
})


module.exports = run
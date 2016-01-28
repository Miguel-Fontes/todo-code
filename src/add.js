'use strict'
let add = (function (e) {
  let remote = require('remote'),
    dialog,
    dirPath,
    projectName,
    that = {},
    addBox,
    nameInput,
    dirInput,
    projectsList,
    newProject

  let run = require('./../run')

  dialog = remote.require('dialog')

  nameInput = document.getElementById('nome')
  dirInput = document.getElementById('directory')
  addBox = document.getElementsByClassName('c-add-box')[0]
  projectsList = document.getElementsByClassName('c-project-list')[0]

  that.openFile = openFile
  that.ok = ok

  initialize()

  function initialize () {
    // Initialização de alguns projetos para ficar bonito
    projectsList.appendChild(buildProjectElement('Highland', 'C:\\desenv\\highland', run))
    projectsList.appendChild(buildProjectElement('Loja Concept', 'C:\\desenv\\loja-concept', run))
    projectsList.appendChild(buildProjectElement('Project Todos', 'C:\\desenv\\JSGoodParts', run))
  }

  function openFile () {
    dialog.showOpenDialog({ properties: ['openDirectory']}, function (fileNames) {
      if (fileNames === undefined) return
      dirPath = fileNames[0]
      // TODO: Isolar alterações de DOM
      dirInput.value = dirPath
    })
  }

  function ok (e) {
    projectName = nameInput.value

    newProject = buildProjectElement(projectName, dirPath + '/', run)

    projectsList.appendChild(newProject)
  }

  function buildProjectElement (name, path, action) {
    let newProject

    newProject = document.createElement('li')
    newProject.setAttribute('x-data-path', path + '/')
    newProject.classList.add('c-project-list__item')
    newProject.innerHTML = name

    newProject.addEventListener('click', action)

    return newProject
  }

  return that
}())

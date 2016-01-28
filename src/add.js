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
  that.toggleDialog = toggleDialog
  that.cancel = cancel

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
    
    toggleDialog(e)
  }

  function cancel (e) {
    nameInput.value = ''
    dirInput.value = ''

    newProject = buildProjectElement(projectName, dirPath + '/', run)

    toggleDialog(e)
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

  function toggleDialog (e) {
    toggleClass(addBox, 'is-hidden')
  }

  function addClass (element, cssClass) {
    if (!element.classList.contains(cssClass)) {
      element.classList.add(cssClass)
    }
  }

  function removeClass (element, cssClass) {
    if (element.classList.contains(cssClass)) {
      element.classList.remove(cssClass)
    }
  }

  function toggleClass (element, cssClass) {
    if (element.classList.contains(cssClass)) {
      removeClass(element, cssClass)
    } else {
      addClass(element, cssClass)
    }
  }

  return that
}())

var LOG = (function logModule () {
  return {
    log: log
  }

  function log () {
    // TODO: IMPLEMENTAR TRATAMENTO PARA OBJETOS == {}
    var logMessage = new Date() + ': '

    for (var i = 0, j = log.arguments.length; i < j; i++) {
      logMessage += (log.arguments[i] == undefined ? 'undefined' : log.arguments[i].toString()) + ' '
    }
    // TODO: Remover esse comentário
    //console.log(logMessage)
  }
})()

// TODO: rever esse export

module.exports = LOG

;(function () {
  // Map -> aplica a função indicada em todos os itens de array e retorna um novo ARRAY
  // compose -> junta o efeito de duas funções. A da direita é executada primeiro e a da esquerda usa o resultado da primeira. 
  // filter -> usa uma função indicada para obter um valor de um array

  exports.stringfy = function stringfy (object) {
    return object.toString()
  }

  exports.map = function map (f, arr) {
    return function (arr) {
      return arr.map(f)
    }
  }

  exports.objMap = function objMap (f) {
    return function (obj) {
      return obj.map()
    }
  }

  exports.compose = function compose (f, z) {
    return function (x) {
      return f(z(x))
    }
  }

  exports.match = function match (what) {
    return function (str) {
      return str.match(what)
    }
  }

  exports.replace = function replace (what) {
    return function (replacement) {
      return function (str) {
        return str.replace(what, replacement)
      }
    }
  }

  exports.filter = function filter (f) {
    return function (ary) {
      return ary.filter(f)
    }
  }
})()

var MEMDATABASE = (function () {
  return {
    build: memDatabaseFactory
  }

  function memDatabaseFactory (config) {
    return new MeMDatabase(config)
  }

  function MeMDatabase (config) {
    var db = this,
      data = [],
      collection,
      collections = {}

    db.initialize = initialize
    db.save = save
    db.remove = remove
    db.get = get
    db.query = query
    db.update = update

    Array.prototype.filterById = function (id) {
      var newArray
      newArray = this.filter(function (obj) { if (obj.id != id) return obj })
      return newArray
    }

    Array.prototype.getById = function (id) {
      var newArray
      newArray = this.filter(function (obj) { if (obj.id == id) return obj })
      return newArray
    }

    function initialize (callback) {
      if (typeof config != 'undefined') {
        data = (typeof config.data != 'undefined' ? config.data : { })

        for (collection in data) {
          collections[collection] = data[collection]
        }

      } else {
        // handler error
        // Não faço nada porque o MEM DB pode ser inicializado sem dados
      }

      callback(null, function (collectionName) {
        collection = collectionName
        return db
      })
    }

    function save (obj, callback) {
      validateCollection(function () {
        collections[collection].push(obj)
        get(obj.id, function (data) {
          callback(data)
        })
      })
    }

    function get (id, callback) {
      // TODO: Pode ser que não achemos ninguém. E aí?
      validateCollection(function () {
        var obj = collections[collection].getById(id)
        callback(obj)
      })
    }

    function update (obj, callback) {
      validateCollection(function () {
        collections[collection] = collections[collection].filterById(obj.id)
        collections[collection].push(obj)
        get(obj.id, function (data) {
          callback(data)
        })
      })
    }

    function query (callback) {
      validateCollection(function () {
        callback(collections[collection])
      })
    }

    function remove (id, callback) {
      validateCollection(function () {
        get(id, function (obj) {
          if (obj) collections[collection] = collections[collection].filterById(id)
          callback(obj)
        })
      })
    }

    function collectionExists () {
      return collections.hasOwnProperty(collection)
    }

    function validateCollection (callback) {
      if (!collectionExists()) {
        createCollection(function () {
          callback()
        })
      } else {
        callback()
      }
    }

    function createCollection (callback) {
      collections[collection] = []
      callback()
    }
  }
})()

module.exports = MEMDATABASE

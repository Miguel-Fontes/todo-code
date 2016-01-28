module.exports = (function staticDbFactory () {
  return {
    build: buildStaticDB
  }

  function buildStaticDB (config) {
    return new StaticDB(config)
  }

  function StaticDB (config) {
    var fs = require('fs')
    var memDb = require('./memdb')
    var db = this,
      dbFiles = [],
      dbDir = config.dir,
      dbFileSuffix = config.suffix,
      mdb,
      MeMcolections = {},
      collection

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

    // Inicializo a aplicação lendo o arquivo de DB e carregando na memória
    function initialize (callback) {
      try {
        // Vou usar um database baseado em memória internamente e gerenciar
        // apenas a gravação em arquivo aqui.
        fs.readdir(dbDir, function (err, items) {
          try {
            items = items.filter(function (value) {
              return value.match(dbFileSuffix) != null ? true : false
            })

          } catch (e) {
            throw new Error('Erro na leitura de arquivos estáticos de BD! - ' + e)
            callback(err, [])
          }

          dbFiles = items
          var data = {}

          for (var dbFile of dbFiles) {
            var fileData = fs.readFileSync(dbDir + dbFile, {flag: 'a+'}).toString()
            // Dbfile = produto-hmg.data => dbFile.split(-)[0] = 'produto' => data.produto = [{obj}, {obj}]
            data[dbFile.split('-')[0]] = JSON.parse(fileData)
          }

          memDb
            .build({data: data})
            .initialize(function (err, mdbInstance) {
              mdb = mdbInstance

              callback(null, function (collectionName) {
                collection = collectionName
                return db
              })

            })
        })
      } catch (e) {
        console.log(e)
      }
    }

    function save (obj, callback) {
      mdb(collection).save(obj, function (data) {
        sync(function (err, d) {
          callback(data)
        })
      })
    }

    function remove (id, callback) {
      mdb(collection).remove(id, function (obj) {
        sync(function (err, d) {
          callback(obj)
        })
      })
    }

    function query (callback) {
      mdb(collection).query(function (data) {
        callback(data)
      })
    }

    function update (obj, callback) {
      mdb(collection).update(obj, function (data) {
        sync(function (err, d) {
          callback(data)
        })
      })
    }

    function get (id, callback) {
      mdb(collection).get(id, function (data) {
        callback(data)
      })
    }

    function sync (callback) {
      mdb(collection).query(function (data) {
        fs.writeFile(dbDir + collection + dbFileSuffix, JSON.stringify(data), {flag: 'w+'}, function (err) {
          if (err) {
            callback(err, data)
          } else {
            callback(null, data)
          }
        })
      })
    }
  }
})()

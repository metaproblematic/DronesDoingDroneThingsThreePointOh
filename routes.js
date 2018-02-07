const Routes = function (server) {
  server.get('/', (req, res) => {
    res.render('index')
  })
}

module.exports = Routes

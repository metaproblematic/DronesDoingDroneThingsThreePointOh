let server = require('./server')
const Drones = require('./drones')
let drones = new Drones()

// This is like this so we don't have to put server in the drone's namespace
drones.bindServerRoutes(server)

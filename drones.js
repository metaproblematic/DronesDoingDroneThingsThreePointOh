const arModule = require('ar-drone')
const ping = require('ping')

const config = require('./config.json')

/**
 * Represents all drones and functions relevant to drones
 * @class
 */
class Drones {
  /** Constructor for Drones class
   * @constructor
   * @param {Object} options - Set of configuration options. (See parseOptions)
   */
  constructor (options) {
    this.droneList = []
    this.options = options || {}
  }

  /**
   * Returns an array of all drone objects, irregardless of if they are confirmed.
   * @returns {Drone[]} Array containing all drone objects.
   */
  get all () {
    return this.droneList
  }

  /**
   * Returns an array of all drone objects that are confirmed to be active.
   * @returns {Drone[]} Array containing all confirmed drone objects.
   * @todo Test this function
   */
  allConfirmed () {
    let allConfirmed = this.droneList
    // TODO: define confirmed
    return allConfirmed
  }

  /**
   * Adds a new drone object to the list with the given id.
   * @param {int} id - Id of drone to create.
   * @returns {Drone} Newly created client object from ar-drone module or pre-existing object with same id.
   * @todo Test this function
   */
  add (id) {
    if (this.containsId(id)) return this.getDrone(id)
    let drone = arModule.createClient({
      ip: this.ipTemplate(id) // e.g. 192.168.1.101
    })
    this.droneList.push(drone)
    drone.id = id
    drone.resume() // Let's hope this fixes an issue with drones not responding on second connect
    drone.on('navdata', data => {
      drone.navdata = data
      console.log(data)
    })
    drone.animateLeds('blinkOrange', 5, 1) // This animation lets us know the drone has connected
    if (this.options.log) console.log(`Drone ${id} connected`)
    return drone
  }

  /**
   * @todo Write the documentation.
   * @todo Test this function.
   */
  remove (id) {
    if (!this.containsId(id)) return false
    delete this.getDrone(id)
  }

  /**
   * @param {int} id - Id of drone to search for.
   * @returns {boolean} Weather a drone with id exists.
   * @todo Write the documentation.
   * @todo Test this function.
   */
  containsId (id) {
    return this.droneList.some(drone => drone.id === id)
  }

  /**
   * @param {int} id - Id of drone to return.
   * @returns {Drone}
   * @todo Write the documentation.
   * @todo Test this function.
   */
  getDrone (id) {
    return this
      .all
      .find(drone => drone.id === id)
  }

  /**
   * @todo Write the documentation.
   * @todo Test this function.
   */
  ipTemplate (id) {
    return `${config.network.droneIpStub}${id}`
  }

  /**
   * @todo Write the documentation.
   * @todo Test this function.
   */
  pingAll () {
    config.network.droneIdList.forEach(id => this.ping(id))
  }

   /**
    * @todo Write the documentation.
    * @todo Test this function.
    */
  ping (id) {
    ping.sys.probe(
      this.ipTemplate(id),
      success => {
        (success ? this.add : this.remove)(id)
      },
      {'timeout': 1}
    )
  }

  /**
   * Evaluate to a list of all drone statuses
   * @todo Write the documentation.
   * @todo Test this function.
   */
  get statuses () {
    return this.all.map(drone => this.status(drone))
  }

  status (drone) {
    return {
      id: drone.id,
      battery: drone.battery
    }
  }
}

module.exports = Drones

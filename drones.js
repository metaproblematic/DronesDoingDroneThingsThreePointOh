/**
 * This module contains all information and functions relevant to drones.
 * It is designed to work independantly from the REST API.
 * @module
 * @requires ar-drone {@link https://www.npmjs.com/package/ar-drone}
 */

const ar_module = require('ar-drone');
const ping = require('ping');

const config = require('./config.json');

module.exports = new Drones;

/**
 * Represents all drones and functions relevant to drones
 * @constructor
 * @param {Object} options - Set of configuration options. (See parseOptions)
 * @todo Test this constructor
 */
function Drones(options) {
    this._all = [];
    this._options = options;
}

/**
 * Returns an array of all drone objects, irregardless of if they are confirmed.
 * @returns {Drone[]} Array containing all drone objects.
 * @todo Test this function
 */
Drones.prototype.all = function() {
    return this._all;
}

/**
 * Returns an array of all drone objects that are confirmed to be active.
 * @returns {Drone[]} Array containing all confirmed drone objects.
 * @todo Test this function
 */
Drones.prototype.allConfirmed = function() {
    let allConfirmed = this._all;
    return this._all;
}

/**
 * Adds a new drone object to the list with the given id.
 * @param {int} id - Id of drone to create.
 * @returns {Drone} Newly created client object from ar-drone module or pre-existing object with same id.
 * @todo Test this function
 */
Drones.prototype._add = function(id) {
    if(this._containsId(id)) return this.getDrone(id);
    let drone = ar_module.createClient({
        ip : this._ipTemplate(id) // e.g. 192.168.1.101
    });
    this._all.push(drone);
    drone.resume(); // Let's hope this fixes an issue with drones not responding on second connect
    drone.on('navdata', data => {drone.navdata = data; console.log(data)});
    drone.animateLeds('blinkOrange', 5, 1); // This animation lets us know the drone has connected
    console.log(`Drone ${id} connected`);
    return drone;
}

/**
 * @todo Write the documentation.
 * @todo Test this function.
 */
Drones.prototype._remove = function(id) {
    if(!this._containsId(id)) return false;
    delete this.getDrone(id);
}

/**
 * @param {int} id - Id of drone to search for.
 * @returns {boolean} Weather a drone with id exists.
 * @todo Write the documentation.
 * @todo Test this function.
 */
Drones.prototype._containsId = function(id) {
    return this._all
        .map(drone => drone.id)
        .filter(_id => _id === id)
        .length > 0;
}

/**
 * @param {int} id - Id of drone to return.
 * @returns {Drone}
 * @todo Write the documentation.
 * @todo Test this function.
 */
Drones.prototype.getDrone = function(id) {
    return this._all
        .map(drone => drone.id)
        .filter(_id => _id === id)
        [0];
}

/**
 * @todo Write the documentation.
 * @todo Test this function.
 */
Drones.prototype._ipTemplate = function(id) {
    return `${config.network.drone_ip_stub}${id}`;
}

/**
 * @todo Write the documentation.
 * @todo Test this function.
 */
Drones.prototype._pingAll = function() {
    config.network.drone_id_list.forEach(id => this._ping(id));
}

 /**
  * @todo Write the documentation.
  * @todo Test this function.
  */
Drones.prototype._ping = function(id) {
    ping.sys.probe(
        this._ipTemplate(id),
        success => {
            if(success) create(id);
            if(!success) remove(id);
            (success ? this._add : this._remove)(id)
        },
        {'timeout': 1}
    );
}

/**
 * This module contains all information and functions relevant to drones.
 * It is designed to work independantly from the REST API.
 * @module
 * @requires ar-drone {@link https://www.npmjs.com/package/ar-drone}
 */

let ar_module = require('ar-drone');

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
    let drone = {}; //TODO: setup drone here
    this._all.push(drone);
    return drone;
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

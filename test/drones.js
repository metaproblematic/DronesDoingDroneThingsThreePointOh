/* eslint-env mocha */
var Drones = require('../drones')
var expect = require('chai').expect

describe('Drones.js - Drone management and utility module', function () {
  describe('Drones Constructor', function () {
    it('initializes correctly with no options', function () {
      let drones = new Drones()
      expect(drones._all).to.deep.equal([])
      expect(drones._options).to.deep.equal({})
    })
    it('initializes correctly with options', function () {
      let drones = new Drones({
        port: 3000,
        parameter: 'param'
      })
      expect(drones._all).to.deep.equal([])
      expect(drones._options).to.deep.equal({
        port: 3000,
        parameter: 'param'
      })
    })
  })
  describe('Drones.all', function () {
    it('returns no drone objects', function () {
      let drones = new Drones()
      let all = drones.all()
      expect(all).to.deep.equal([])
    })
    it('returns the correct amount of drone objects', function () {
      let drones = new Drones()

      drones._add(1)
      let all = drones.all()
      expect(all).to.have.lengthOf(1)

      drones._add(2)
      all = drones.all()
      expect(all).to.have.lengthOf(2)
    })
  })
})

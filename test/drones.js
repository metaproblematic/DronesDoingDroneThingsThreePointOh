
var expect = require("chai").expect;
var Drones = require("../drones");



describe("Drone management and utility module", function() {
    describe("Retrieve all drone objects", function() {
        it("returns no drone objects", function() {
            let all = Drones.all();
            expect(all).to.deep.equal([]);
        });
        it("returns the correct amount of drone objects", function() {
            Drones._add(1);
            let all = Drones.all();
            expect(all).to.have.lengthOf(1);

            Drones._add(2);
            all = Drones.all();
            expect(all).to.have.lengthOf(2);
        });
    });
});

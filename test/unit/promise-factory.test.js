var chai = require('chai');
var Treasury = require('../../index');

describe('Test supported promise factories', testPromiseFactories);

function testPromiseFactories() {
    describe('#testNative', testNative);
    describe('#testQ', testQ);
    describe('#testBluebird', testBluebird);

    var promiseBeingMade = new Promise(function(resolve) {
        resolve(true);
    });

    function testNative() {
        var treasury = new Treasury();

        it('should have returned a Promise', basicPromise);

        function basicPromise(done) {
            // arrange
            // act
            var result = treasury.invest(promiseBeingMade);

            // assert
            chai.assert.typeOf(result, 'Promise');

            done();
        }
    }

    function testQ() {
        it('should have returned a Q Promise', basicPromise);

        function basicPromise(done) {
            // arrange
            var treasury = new Treasury(require('q').Promise);

            // act
            var result = treasury.invest(promiseBeingMade);

            // assert
            chai.assert.typeOf(result, 'Promise');

            done();
        }
    }

    function testBluebird() {
        it('should have returned a Bluebird Promise', basicPromise);

        function basicPromise(done) {
            // arrange
            var treasury = new Treasury(require('bluebird'));

            // act
            var result = treasury.invest(promiseBeingMade);

            // assert
            chai.assert.typeOf(result, 'Promise');

            done();
        }
    }
}
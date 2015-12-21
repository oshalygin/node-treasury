var chai = require('chai');
var _rewire = require('rewire');
var Treasury = _rewire('../../index');

describe('Test default and supported options', testOptions);

function testOptions() {
    describe('#testDefaultOptions', testDefaultOptions);
    describe('#testCleanedOptions', testCleanedOptions);

    function testDefaultOptions() {
        it('should have accepted undefined options', undefOpts);
        it('should have accepted null options', nullOpts);
        it('should have accepted empty options', emptyOpts);

        function undefOpts(done) {
            // arrange
            var getDefaultOptions = Treasury.__get__('getDefaultOptions');

            // act
            var result = getDefaultOptions();

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.client, 'Function');
            chai.assert.equal(result.ttl, 300);
            chai.assert.typeOf(result.promiseFactory, 'Function');

            done();
        }

        function nullOpts(done) {
            // arrange
            var getDefaultOptions = Treasury.__get__('getDefaultOptions');

            // act
            var result = getDefaultOptions(null);

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.client, 'Function');
            chai.assert.equal(result.ttl, 300);
            chai.assert.typeOf(result.promiseFactory, 'Function');

            done();
        }

        function emptyOpts(done) {
            // arrange
            var getDefaultOptions = Treasury.__get__('getDefaultOptions');

            // act
            var result = getDefaultOptions({});

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.client, 'Function');
            chai.assert.equal(result.ttl, 300);
            chai.assert.typeOf(result.promiseFactory, 'Function');

            done();
        }
    }

    function testCleanedOptions() {
        it('should have accepted undefined options', undefOpts);
        it('should have accepted null options', nullOpts);
        it('should have accepted empty options', emptyOpts);
        it('should have accepted a ttl', customDefaultTtl);
        it('should have accepted a client', customClient);
        it('should have accepted a promise', customPromise);

        function undefOpts(done) {
            // arrange
            var getCleanedOptions = Treasury.__get__('getCleanedOptions');

            // act
            var result = getCleanedOptions();

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.client, 'Function');
            chai.assert.equal(result.ttl, 300);
            chai.assert.typeOf(result.promiseFactory, 'Function');

            done();
        }

        function nullOpts(done) {
            // arrange
            var getCleanedOptions = Treasury.__get__('getCleanedOptions');

            // act
            var result = getCleanedOptions(null);

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.client, 'Function');
            chai.assert.equal(result.ttl, 300);
            chai.assert.typeOf(result.promiseFactory, 'Function');

            done();
        }

        function emptyOpts(done) {
            // arrange
            var getCleanedOptions = Treasury.__get__('getCleanedOptions');

            // act
            var result = getCleanedOptions({});

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.client, 'Function');
            chai.assert.equal(result.ttl, 300);
            chai.assert.typeOf(result.promiseFactory, 'Function');

            done();
        }

        function customDefaultTtl(done) {
            // arrange
            var getCleanedOptions = Treasury.__get__('getCleanedOptions');

            // act
            var result = getCleanedOptions({ttl: 1337});

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.equal(result.ttl, 1337);

            done();
        }

        function customClient(done) {
            // arrange
            var getCleanedOptions = Treasury.__get__('getCleanedOptions');
            var myFakeClient = function() {
                return 1245;
            };

            // act
            var result = getCleanedOptions({client: myFakeClient});

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.client, 'Function');
            chai.assert.deepEqual(result.client, myFakeClient);

            done();
        }

        function customPromise(done) {
            // arrange
            var getCleanedOptions = Treasury.__get__('getCleanedOptions');
            var myFakePromise = function() {
                return 1245;
            };

            // act
            var result = getCleanedOptions({promiseFactory: myFakePromise});

            // assert
            chai.assert.typeOf(result, 'Object');
            chai.assert.typeOf(result.promiseFactory, 'Function');
            chai.assert.deepEqual(result.promiseFactory, myFakePromise);

            done();
        }
    }
}
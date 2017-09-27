var QUinit = require('steal-qunit');
var domDataState = require('./can-dom-data-state');

QUinit.module('can-compute-memoize', {
	beforeEach: function () {
        domDataState.clean();
	}
});

QUinit.test('should set and get data', function () {
    var foo = {};
    domDataState.set('foo', foo);
    QUinit.equal(domDataState.get('foo'), foo);
});

QUinit.test('should delete node', function () {
    domDataState.set('foo', {});
    domDataState.set('bar', {});
    domDataState.delete();
    QUinit.equal(domDataState._data['1'], undefined);
});

QUinit.test('should delete all data of node', function () {
    domDataState.set('foo', {});
    domDataState.set('bar', {});
    domDataState.clean('foo');
    domDataState.clean('bar');
    QUinit.equal(domDataState.get('foo'), undefined);
    QUinit.equal(domDataState.get('bar'), undefined);
    QUinit.equal(domDataState._data['1'], undefined);
});

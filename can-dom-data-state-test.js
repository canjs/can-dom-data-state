var unit = require('steal-qunit');
var domDataState = require('./can-dom-data-state');

var foo = {};
var bar = {};

unit.module('can-dom-data-state', {
	beforeEach: function () {
		domDataState.delete();
	}
});

unit.test('should set and get data', function () {
	domDataState.set('foo', foo);
	unit.equal(domDataState.get('foo'), foo);
});

unit.test('set() should return the store', function () {
	var foo = {};
	unit.deepEqual(
		domDataState.set.call(foo, 'hammer', 'time'),
		{hammer: 'time'},
		'should set the store and return it'
	);
});

unit.test('get() should return the whole store', function () {
	var foo = {};
	unit.equal(domDataState.get.call(foo), undefined, 'should have no store initially');

	domDataState.set.call(foo, 'bar', 'baz');
	unit.deepEqual(domDataState.get.call(foo), {bar: 'baz'}, 'should return set store');

	domDataState.delete.call(foo);
	unit.equal(domDataState.get.call(foo), undefined, 'should have no store finally');
});

unit.test('should delete node', function () {
	domDataState.set('foo', foo);
	domDataState.set('bar', bar);
	unit.equal(domDataState.get('foo'), foo);
	unit.equal(domDataState.get('bar'), bar);
	domDataState.delete();
	unit.equal(domDataState._data['1'], undefined);
});

unit.test('should delete all data of node', function () {
	domDataState.set('foo', foo);
	domDataState.set('bar', bar);
	unit.equal(domDataState.get('foo'), foo);
	unit.equal(domDataState.get('bar'), bar);
	domDataState.clean('foo');
	domDataState.clean('bar');
	unit.equal(domDataState.get('foo'), undefined);
	unit.equal(domDataState.get('bar'), undefined);
	unit.equal(domDataState._data['1'], undefined);
});

unit.test('should delete all data of node when DOM element is removed from document (async)', function (assert) {
	var done = assert.async();
	var div = document.createElement('div');
	document.body.append(div);
	domDataState.set.call(div, 'foo', foo);
	div.remove();
	// removal of data is async, so test must also be async
	setTimeout(function(){
		assert.equal(domDataState.get.call(div), undefined);
		done();
	}, 10); // ???: Why must this be 2 or more ms for this test to pass?

});

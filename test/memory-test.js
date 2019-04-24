var cid = require('can-cid');
var unit = require('steal-qunit');
var domDataState = require('../can-dom-data-state');
var domMutate = require('can-dom-mutate');
var globals = require('can-globals');

unit.module('can-dom-data-state: memory');

unit.test('works if the documentElement is removed', function(assert) {
	var done = assert.async();

	var doc = document.implementation.createHTMLDocument("Test");
	globals.setKeyValue('document', doc);

	var node = doc.createElement('div');
	domDataState.set.call(node, 'foo', 'bar');
	doc.body.appendChild(node);

	var dispose = domMutate.onNodeRemoval(node, function () {
		dispose();
		globals.setKeyValue('document', document);
		assert.ok(true, "Disposed of");
		done();
	});

	doc.removeChild(doc.documentElement);
});

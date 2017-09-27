/*can-dom-data-state@0.0.0-pre.1#can-dom-data-state*/
'use strict';
var namespace = require('can-namespace');
var data = {};
var expando = 'can' + new Date();
var uuid = 0;
var isEmptyObject = function (obj) {
    for (var prop in obj) {
        return false;
    }
    return true;
};
var setData = function (name, value) {
    var id = this[expando] || (this[expando] = ++uuid), store = data[id], newStore = false;
    if (!data[id]) {
        newStore = true;
        store = data[id] = {};
    }
    if (name !== undefined) {
        store[name] = value;
    }
    return newStore;
};
var deleteNode = function () {
    var id = this[expando];
    var nodeDeleted = false;
    if (id && data[id]) {
        nodeDeleted = true;
        delete data[id];
    }
    return nodeDeleted;
};
var domDataState = {
    _data: data,
    getCid: function () {
        return this[expando];
    },
    cid: function () {
        return this[expando] || (this[expando] = ++uuid);
    },
    expando: expando,
    get: function (key) {
        var id = this[expando], store = id && data[id];
        return key === undefined ? store || setData(this) : store && store[key];
    },
    set: setData,
    clean: function (prop) {
        var id = this[expando];
        var itemData = data[id];
        if (itemData && itemData[prop]) {
            delete itemData[prop];
        }
        if (isEmptyObject(itemData)) {
            deleteNode.call(this);
        }
    },
    delete: deleteNode
};
if (namespace.domDataState) {
    throw new Error('You can\'t have two versions of can-dom-data-state, check your dependencies');
} else {
    module.exports = namespace.domDataState = domDataState;
}
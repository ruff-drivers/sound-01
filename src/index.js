/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');
var Edge = require('gpio').Edge;

var prototype = {
    _oninterrupt: function () {
        this.emit('receive');
        this._timer = setTimeout(this._mountInterruptListener.bind(this), this._interval);
    },
    _mountInterruptListener: function () {
        this._gpio.once('interrupt', this._oninterrupt.bind(this));
    },
    enable: function (callback) {
        this._mountInterruptListener();
        this._gpio.setEdge(Edge.falling, callback);
    },
    disable: function (callback) {
        clearTimeout(this._timer);
        this._gpio.setEdge(Edge.none, callback);
    }
};

Object.defineProperties(prototype, {
    interval: {
        set: function (value) {
            this._interval = value;
        },
        get: function () {
            return this._interval;
        }
    }
});

module.exports = driver({
    attach: function (inputs, context, next) {
        this._gpio = inputs['gpio'];

        var args = context.args;

        this._interval = args.interval;
        this._enabled = args.enabled;

        if (this._enabled === true) {
            this.enable(next);
        } else {
            this._gpio.setEdge(Edge.none, next);
        }
    },
    exports: prototype
});

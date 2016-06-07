/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');
var Gpio = require('gpio');

var prototype = {
    _oninterrupt: function () {
        this.emit('receive');
        this._timer = setTimeout(this._mountInterruptListener.bind(this), this._interval);
    },
    _mountInterruptListener: function () {
        this._gpio.once('interrupt', this._oninterrupt.bind(this));
    },
    enable: function () {
        this._mountInterruptListener();
        this._gpio.setEdge(Gpio.EDGE_FALLING);
    },
    disable: function () {
        clearTimeout(this._timer);
        this._gpio.setEdge(Gpio.EDGE_NONE);
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
    attach: function (inputs) {
        this._gpio = inputs.getRequired('gpio');
        this._interval = inputs.getRequired('interval');
        this._enabled = inputs.getRequired('enabled');

        if (this._enabled === true) {
            this.enable();
        } else {
            this._gpio.setEdge(Gpio.EDGE_NONE);
        }
    },
    exports: prototype
});

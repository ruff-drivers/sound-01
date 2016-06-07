'use strict';

var assert = require('assert');
var path = require('path');

var driverPath = path.join(__dirname, '..');
var runner = require('ruff-driver-runner');

require('t');

describe('Driver for sound sensor', function () {
    var sound;
    var gpio;

    before(function (done) {
        runner.run(driverPath, function (device, context) {
            sound = device;
            gpio = context.arg('gpio');
            done();
        });
    });

    it('should emit receive event', function (done) {
        sound.on('receive', function () {
            done();
        });
        sound.enable();
        gpio.emit('interrupt', 0);
    });

    it('should set interval success', function () {
        sound.interval = 2000;
        assert(sound._interval === 2000);
    });
});

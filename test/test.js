'use strict';

var Edge = require('gpio').Edge;
var EventEmitter = require('events');
var assert = require('assert');
var mock = require('ruff-mock');

var any = mock.any;
var when = mock.when;

var Device = require('../');

require('t');

describe('Driver for sound sensor', function () {
    var sensor;
    var gpio;

    afterEach(function () {
        sensor.removeAllListeners('sound');
    });

    it('should create enabled sensor', function (done) {
        gpio = mock(new EventEmitter(), true);

        var inputs = {
            gpio: gpio
        };

        var context = {
            args: {
                interval: 1000,
                enabled: true
            }
        };

        when(gpio)
            .setEdge(any, any)
            .then(function (edge, callback) {
                assert.equal(edge, Edge.falling);
                callback();
            });

        sensor = new Device(inputs, context, function (error) {
            assert.ifError(error);
            done();
        });
    });

    it('should emit `sound` event', function (done) {
        sensor.on('sound', function () {
            done();
        });

        gpio.emit('interrupt');
    });

    it('should be able to update interval', function (done) {
        gpio.emit('interrupt');

        sensor.interval = 10;

        setTimeout(function () {
            sensor.on('sound', function () {
                done();
            });

            gpio.emit('interrupt');
        }, 50);
    });

    it('should not emit `sound` event multiple times within the interval', function (done) {
        var emitted = false;

        sensor.on('sound', function () {
            if (emitted) {
                done('Should not emit multiple times');
                return;
            }

            emitted = true;

            setTimeout(done, 10);
        });

        // Set timeout to execeed the interval after last emitting.
        setTimeout(function () {
            gpio.emit('interrupt');
            gpio.emit('interrupt');
        }, 50);
    });
});

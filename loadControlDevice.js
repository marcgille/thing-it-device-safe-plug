module.exports = {
    metadata: {
        family: "loadControlDevice",
        plugin: "loadControlDevice",
        label: "SafePlug © Load Control Device",
        tangible: true,
        discoverable: true,
        state: [{
            id: "load",
            label: "Load",
            type: {
                id: "number"
            }
        }],
        actorTypes: [],
        sensorTypes: [],
        services: [],
        configuration: []
    },
    create: function () {
        return new LoadControlDevice();
    },
    discovery: function (options) {
        var discovery = new LoadControlDeviceDiscovery();

        discovery.options = options;

        return discovery;
    }
};

var q = require('q');

function LoadControlDeviceDiscovery() {
    /**
     *
     * @param options
     */
    LoadControlDeviceDiscovery.prototype.start = function () {
        if (this.node.isSimulated()) {
        } else {
        }
    };

    /**
     *
     * @param options
     */
    LoadControlDeviceDiscovery.prototype.stop = function () {
    };
}

/**
 *
 */
function LoadControlDevice() {
    /**
     *
     */
    LoadControlDevice.prototype.start = function () {
        var deferred = q.defer();

        this.operationalState = {
            status: 'PENDING',
            message: 'Waiting for initialization...'
        };
        this.publishOperationalStateChange();

        this.state = {load: 0};

        if (this.isSimulated()) {
            setInterval(function () {
                this.state.load = Math.floor((Math.random() * 1000));
                this.state.batteryLevel = 100 - 20 * Math.floor((Math.random() * 6));

                this.publishStateChange();
            }.bind(this), 10000);
            
            this.operationalState = {
                status: 'OK',
                message: 'Load Control Device successfully initialized'
            }
            this.publishOperationalStateChange();

            deferred.resolve();
        } else {
            this.operationalState = {
                status: 'OK',
                message: 'Load Control Device successfully initialized'
            }
            this.publishOperationalStateChange();
            
            deferred.resolve();
        }

        return deferred.promise;
    };

    /**
     *
     */
    LoadControlDevice.prototype.setState = function (state) {
        this.state = state;

        this.publishStateChange();
    };

    /**
     *
     */
    LoadControlDevice.prototype.getState = function () {
        return this.state;
    };
}

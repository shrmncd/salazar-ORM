'use strict';

var Ports = function() {
	this.defaults = {
		mysql: 3306,
		postgres: 5432
	}
}

Ports.prototype.getPort = function(system, port) {
	if (system && port) {
		if (port === "default") {
			if (this.defaults[system]) {
				return this.defaults[system];
			} else {
				return false;
			}
		} else {
			return port;
		}	
	} else {
		return false;
	}
}

module.exports = Ports;
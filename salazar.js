'use strict';

var Ports = require('./ports');//holds the default ports of AWS RDBs and related methods

/* The magic of salazar beings here :) */

var Salazar = function(system, host, port, database, user, pass) {
	var ports = new Ports();

	this.setup = {
		connectionString: "",
		protocol: "",
		system: system,
		host: host,
		port: port,
		database: database,
		user: user,
		pass: pass
	};

	switch (system) {
		case 'mysql':
			this.setup.protocol = "mysql";
			break;
		case 'postgres':
		case 'postgresql':
			this.setup.protocol = "postgres";
			break;
		default:
		throw new Error(system + ' is not supported. Salazar currently supports mysql and postgres only.');
	}

	if (this.setup.protocol) {
		this.setup.port = ports.getPort(this.setup.protocol, this.setup.port);
	}

	if (this.setup.protocol && this.setup.host && this.setup.port && this.setup.database && this.setup.user && this.setup.pass) {
		//attempt db connection
	}
}
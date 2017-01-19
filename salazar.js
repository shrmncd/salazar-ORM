'use strict';

var Ports = require('./ports');//holds the default ports of AWS RDBs and related methods
var mysql = require('mysql');
var pg = require('pg');

/* The magic of salazar begins here :) */

var Salazar = function(system, host, port, database, user, password) {
	var ports = new Ports();

	this.setup = {
		connectionString: '',
		protocol: '',
		system: system,
		host: host,
		port: port,
		database: database,
		user: user,
		password: password
	};

	switch (system) {
		case 'mysql':
			this.setup.protocol = 'mysql';
			break;
		case 'postgres':
		case 'postgresql':
			this.setup.protocol = 'postgres';
			break;
		default:
		throw new Error(system + ' is not supported. Salazar currently supports mysql and postgres only.');
	}

	if (this.setup.protocol) {
		this.setup.port = ports.getPort(this.setup.protocol, this.setup.port);
	}

	if (this.setup.protocol && this.setup.host && this.setup.port && this.setup.database && this.setup.user && this.setup.password) {
		 var connection = false;

		//attempt db connection
		if (this.setup.protocol === 'mysql') {
			connection = mysql.createConnection({
				host: this.setup.host,
				user: this.setup.user,
				password: this.setup.password,
				port: this.setup.port,
				database: this.setup.database
			});
		}

		if (this.setup.protocol === 'postgres') {
			var connectionString = 'postgres://' + this.setup.user + ':' + this.setup.password + '@' + this.setup.host + ':' + this.setup.port+ '/' + this.setup.database;
			var connection = new pg.Client(connectionString);
			connection.connect();
		}
	}
}
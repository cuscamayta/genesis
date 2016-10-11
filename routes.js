'use strict';

module.exports = function (app) {	
 	app.use('/users', require('./server/routes/users'));
	app.use('/roles', require('./server/routes/roles'));
};
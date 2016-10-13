'use strict';

module.exports = function (app) {	
 	app.use('/users', require('./server/routes/users'));
	app.use('/roles', require('./server/routes/roles'));
	app.use('/customers', require('./server/routes/customers'));
	app.use('/drivertypes', require('./server/routes/drivertypes'));
	app.use('/drivers', require('./server/routes/drivers'));
};
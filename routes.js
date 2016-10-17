'use strict';

module.exports = function (app) {	
 	app.use('/users', require('./server/routes/users'));
	app.use('/roles', require('./server/routes/roles'));
	app.use('/customers', require('./server/routes/customers'));
	app.use('/drivertypes', require('./server/routes/drivertypes'));
	app.use('/drivers', require('./server/routes/drivers'));
	app.use('/bustypes', require('./server/routes/bustypes'));
	app.use('/buses', require('./server/routes/buses'));
	app.use('/destinations', require('./server/routes/destinations'));
	app.use('/courses', require('./server/routes/courses'));
	app.use('/orderbooks', require('./server/routes/orderbooks'));
	app.use('/salesbooks', require('./server/routes/salesbooks'));
};
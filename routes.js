'use strict';

module.exports = function (app) {	
	app.use('/users', require('./server/routes/users'));

};
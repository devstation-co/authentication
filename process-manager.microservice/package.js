/* eslint-disable global-require */
if (process.env.NODE_ENV === 'PROD') {
	module.exports = require('./dist/microservice.js');
} else {
	module.exports = require('./src/microservice.js');
}

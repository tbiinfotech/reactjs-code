const functions = require('firebase-functions')
const rp = require('request-promise')

module.exports = function(admin) {
	
	return {
		paymentSucceeded: function(eventData, customer) {
			return require('./paymentSucceeded')(eventData, customer, functions, admin)
		},

		getCustomer: function(customerId) {
			return new Promise(function(resolve, reject) {
				var options = {
					method: 'GET',
					uri: functions.config().stripe.url + '/customers/' + customerId,
					headers: {
						'Authorization': 'Xxxxxxx ' + functions.config().stripe.secret
					}
				}
				rp(options)
					.then(function(body) {
						return resolve(JSON.parse(body))
					})
					.catch(function(err) {
						console.error(err)
						return reject(err)
					});
			})
		}
	}
	
}
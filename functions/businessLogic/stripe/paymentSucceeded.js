const rp = require('request-promise')

module.exports = function(eventData, customer, functions, admin) {
	return new Promise(function(resolve, reject) {
		try {
			const body = {
			  "orderNumber": eventData.object.id, // stripe invoice id
			  "orderDate": new Date(eventData.object.created * 1000).toISOString(), // stripe invoice creation date
			  "paymentDate": new Date(eventData.object.created * 1000).toISOString(), // stripe invoice creation date
			  "orderStatus": "awaiting_shipment",
			  "billTo": {
			    "name": customer.shipping.name
			  },
			  "shipTo": {
			    "name": customer.shipping.name,
			    "street1": customer.shipping.address.line1,
			    "street2": customer.shipping.address.line2,
			    "city": customer.shipping.address.city,
			    "state": customer.shipping.address.state,
			    "postalCode": customer.shipping.address.postal_code,
			    "country": "US",
			    "residential": true
			  },
			  "customerEmail": customer.email,
			  "advancedOptions": {
			  	"storeId": functions.config().shipstation.storeid
			  },
			  "amountPaid": parseFloat((eventData.object.amount/1e2).toFixed(2)),
			  "taxAmount": parseFloat(parseFloat(eventData.object.metadata.orderDetails_taxCharged).toFixed(2)),
			  "shippingAmount": parseFloat(parseFloat(eventData.object.metadata.orderDetails_shipping).toFixed(2)),
			  "confirmation": "delivery",
			  "internalNotes": "Promo applied: " + (eventData.object.metadata.promoApplied_id || "none")
			}
			
			var options = {
				method: 'POST',
				uri: functions.config().shipstation.url + '/orders/createorder',
				body: body,
				json: true,
				headers: {
		      'Authorization': 'Basic ' + new Buffer(functions.config().shipstation.key + ':' + functions.config().shipstation.secret).toString('base64')
		   	}
			}
			rp(options)
				.then(function(parsedBody) {
					return resolve({
						it: 'worked',
						parsedBody: parsedBody
					})
				})
				.catch(function(response, err) {
					
					return reject(err)
				});
		} catch(e) {
			return reject(err)
		}
	})
}
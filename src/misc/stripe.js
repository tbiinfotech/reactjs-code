import config from '../config.js'
import rp from 'request-promise'

/**
 * Update Shipping Information of customer
 **/

function updateCustomerShippingInfo(shipping,  customerId){
	return new Promise(function(resolve, reject) {
		
	});
}

function createCustomer(email, shipping, tokenId) {
	return new Promise(function(resolve, reject) {
		var options = {
			method: 'POST',
			uri: config.api()+'/customers',
			headers: {
				'Authorization': 'Bearer ' + config.environments[config.environment].stripe.secret
			},
			form: {
				email: email,
				shipping: {
					address: shipping.address,
					name: shipping.name
				},
				metadata: {
					shipping_name: shipping.name,
					shipping_address_line1: shipping.address.line1,
					shipping_address_line2: shipping.address.line2,
					shipping_address_city: shipping.address.city,
					shipping_address_state: shipping.address.state,
					shipping_address_postal_code: shipping.address.postal_code
				},
				source: tokenId
			}
		}
		rp(options)
			.then(function(body) {
				return resolve({
					succeeded: true,
					response: JSON.parse(body)
				})
			})
			.catch(function(response) {
				if(response.error) {
					const error = JSON.parse(response.error)
					return resolve({
						succeeded: false,
						error: error.error
					})
				}
				return reject(response)
			});
	})
}

/**
 * https://api.stripe.com/v1/customers/cus_BvupS1uD3V7Ntr
 */
function retrieveCustomer(customerId) {
	return new Promise(function(resolve, reject) {
		var options = {
			method: 'GET',
			uri: config.api()+'/customers/' + customerId,
			headers: {
				'Authorization': 'Xxxxxxx ' + config.environments[config.environment].stripe.secret
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

/**
 * https://api.stripe.com/v1/subscriptions/sub_BvupS1uD3V7Ntr
 */
function retrieveSubscription(id) {
	return new Promise(function(resolve, reject) {
		var options = {
			method: 'GET',
			uri: config.api()+'/subscriptions/' + id,
			headers: {
				'Authorization': 'XXXXXXXX ' + config.environments[config.environment].stripe.secret
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

/**
 * GET https://api.stripe.com/v1/customers/{CUSTOMER_ID}/sources/{CARD_ID}
 */
function retrieveCustomerCard(customerId, cardId) {
	return new Promise(function(resolve, reject) {
		
	})
}

// GET https://api.stripe.com/v1/coupons/[code]
function retrieveCoupon(code) {
	return new Promise(function(resolve, reject) {
		
	})
}

function createCharge(amount, customerId, sourceId, email, metadata) {
	return new Promise(function(resolve, reject) {
		
	})
}

function issueRefund(chargeObj) {
	return new Promise(function(resolve, reject) {
		
	})
}

/**
 * @param   	customerId 
 *           	The identifier of the customer to subscribe.
 * @param   	trialEnd   
 * 						The code of the coupon to apply to this subscription. A coupon applied to a subscription will only affect invoices created for that particular subscription.
 * @param   	taxPercent 
 * 						A non-negative decimal (with at most four decimal places) between 0 and 100. This represents the percentage of the subscription invoice subtotal that will be calculated and added as tax to the final amount each billing period. For example, a plan which charges $10/month with a tax_percent of 20.0 will charge $12 per invoice.
 * @param   	coupon     
 * 						The code of the coupon to apply to this subscription. A coupon applied to a subscription will only affect invoices created for that particular subscription.
 */
function createSubscription(customerId, subscriptionId, trialDays, taxPercent, coupon) {
	return new Promise(function(resolve, reject) {

		
	})

}

// DELETE https://api.stripe.com/v1/subscriptions/[sub_id]
function cancelSubscription(id) {
	return new Promise(function(resolve, reject) {

	})
}

export default {
	updateCustomerShippingInfo,
	createCustomer,
	createCharge,
	createSubscription,
	retrieveCustomer,
	retrieveCustomerCard,
	retrieveSubscription,
	retrieveCoupon,
	cancelSubscription
}
import config from '../config'
import stripe from '../misc/stripe'

function buildSubscription(customerId, plan) {
	// - create a subscription with a trial period that ends on the 1st of the next month
	// - if today is 15th or before, charge for the current month
}

function calculateTrialPeriod() {

}

export default {

}
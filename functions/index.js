const functions = require('firebase-functions')
const cors = require('cors')({
	origin: true
})

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const stripe = require('./businessLogic/stripe')(admin)

exports.afterUserCreate = functions.database.ref('/users/{uid}').onWrite(event => {
	if (event.data.previous.exists()) return false
	if (!event.data.exists()) return false

	const sendgrid = require('./businessLogic/sendgrid')
	let user = event.data.val()
	
	sendgrid.addMarketingContact(user.email, user.firstName, user.lastName).then(function(body) {
		event.data.ref.child('sendgridRecipientId').set(body.persisted_recipients[0])
		sendgrid.addUserToMarketingList(parseInt(functions.config().sendgrid.lists.halfwaysubscribers), body.persisted_recipients[0]).then(function() {
			
		})
	})
	return true
});

exports.afterUserSubscribes = functions.database.ref('/users/{uid}').onWrite(event => {
	// if they didn't have payment info but now do, they just entered payment info
	if (event.data.previous.exists() && !event.data.previous.val().payment && event.data.val() && event.data.val().payment) {
		
		const sendgrid = require('./businessLogic/sendgrid')
		let user = event.data.val()
		sendgrid.addUserToMarketingList(parseInt(functions.config().sendgrid.lists.subscribers), user.sendgridRecipientId).then(function() {
			
		})
		sendgrid.deleteUserFromMarketingList(parseInt(functions.config().sendgrid.lists.halfwaysubscribers), user.sendgridRecipientId).then(function() {
			console.log('Deleted recipient (' + user.email + ') from SendGrid halfway subscribers contact list.')
		})
		sendgrid.sendEmail(functions.config().sendgrid.templates.welcome, 'Welcome to The Watch Studio!', user.email, user.firstName + ' ' + user.lastName, {
			"%first_name%": user.firstName
		})
	}
	return true
});

exports.stripeHook = functions.https.onRequest((req, res) => {
	if (req.method !== 'POST') {
		res.status(403).send('Forbidden!')
	}
	
	if (req.body.type === 'charge.succeeded') {
		stripe.getCustomer(req.body.data.object.customer)
			.then(customer => {
				stripe.paymentSucceeded(req.body.data, customer)
					.then(result => {
						return res.send(result)
					})
					.catch(error => {
						return res.status(500).send({
							error: error
						})
					})
			})
			.catch(error => {
				return res.status(500).send({
					error: error
				})
			})
	} else {
		return res.send(200)
	}

})

exports.removeUserFromDatabase = functions.auth.user().onDelete(function(event) {
  var uid = event.data.uid;
  return admin.database().ref("/users/" + uid).remove();
})
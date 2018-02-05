const request = require('request')
const functions = require('firebase-functions')
const apikey = functions.config().sendgrid.apikey
const apiurl = 'https://xxxx.xxxxx.xxxx/xxxx'

module.exports = {
	getAuthorizationHeader: function() {
		return 'Xxxxxx ' + apikey
	},

	/**
	 * Create a new recipient.
	 * POST https://api.sendgrid.com/v3/contactdb/recipients HTTP/1.1
	 * Reference: https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html#Add-Single-Recipient-POST
	 */
	addMarketingContact: function(email, firstName, lastName) {
		const self = this
		return new Promise(function(resolve, reject) {
			let options = {
				url: apiurl + '/contactdb/recipients',
				method: 'POST',
				json: [{
					email: email,
					first_name: firstName,
					last_name: lastName
				}],
				headers: {
					'Content-Type': 'application/json',
					'Authorization': self.getAuthorizationHeader()
				}
			}
			request(options, function(error, response, body) {
				if (error) console.error('Error creating new recipient via SendGrid API.', error)
				console.log("Created new sendgrid marketing contact. Recipient id:", body.persisted_recipients[0])
				return resolve(body)
			})
		})
	},

	/**
	 * Add recipient to a specific marketing contact list
	 * POST https://api.sendgrid.com/v3/contactdb/lists/{list_id}/recipients/{recipient_id} HTTP/1.1
	 * Reference: https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html#Add-a-Single-Recipient-to-a-List-POST
	 */
	addUserToMarketingList: function(listId, recipientId) {
		const self = this
		return new Promise(function(resolve, reject) {
			let options = {
				url: apiurl + '/contactdb/lists/' + listId + '/recipients/' + recipientId,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': self.getAuthorizationHeader()
				}
			}
			request(options, function(error, response, body) {
				if (error) console.error('Error adding recipient ' + recipientId + ' to subscribers contact list via SendGrid API.', error)
				return resolve(body)
			})
		})
	},

	/**
	 * DELETE https://api.sendgrid.com/v3/contactdb/lists/{list_id}/recipients/{recipient_id} HTTP/1.1
	 */
	deleteUserFromMarketingList: function(listId, recipientId) {
		const self = this
		return new Promise(function(resolve, reject) {
			let options = {
				url: apiurl + '/contactdb/lists/' + listId + '/recipients/' + recipientId,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': self.getAuthorizationHeader()
				}
			}
			request(options, function(error, response, body) {
				if (error) console.error('Error adding recipient ' + recipientId + ' to subscribers contact list via SendGrid API.', error)
				return resolve(body)
			})
		})
	},

	sendEmail: function(templateId, subject, toEmail, toName, params) {
		const body = {
			personalizations: [{
				to: [{
					email: toEmail,
					name: toName
				}],
				subject: subject || 'The Watch Studio',
				substitutions: params
			}],
			from: {
				email: 'heythere@thewatch.studio',
				name: 'The Watch Studio'
			},
			template_id: templateId
		}
		
		let options = {
			method: 'POST',
			url: apiurl + '/mail/send',
			json: body,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': this.getAuthorizationHeader()
			},
		}
		request(options, function(error, response, body) {
			if (error) console.error('Error sending email', error)
			console.log('Sent email.')
		})

	},

	sendBatchEmail: function(templateId, subject, to, params) {
		const body = {
			personalizations: [{
				to: to,
				subject: subject || 'The Watch Studio',
				substitutions: params
			}],
			from: {
				email: 'heythere@thewatch.studio',
				name: 'The Watch Studio'
			},
			template_id: templateId
		}
		
		let options = {
			method: 'POST',
			url: apiurl + '/mail/send',
			json: body,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': this.getAuthorizationHeader()
			},
		}
		request(options, function(error, response, body) {
			if (error) console.error('Error sending email', error)
			console.log('Sent email.')
		})

	},

	retrieveContactList: function(listId, recipientId) {
		const self = this
		return new Promise(function(resolve, reject) {
			let options = {
				url: apiurl + '/contactdb/lists/' + listId + '/recipients',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': self.getAuthorizationHeader()
				}
			}
			request(options, function(error, response, body) {
				if (error) console.error('Error retrieving list with id ' + listId + ' via SendGrid API.', error)
				return resolve(body)
			})
		})
	},
}
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../misc/firebase'
import JoinAccountInfo from './Join_AccountInfo'
import JoinShippingInfo from './Join_ShippingInfo'
import SmallLoader from './SmallLoader'
import config from '../config.js'
import { StripeProvider, Elements, injectStripe } from 'react-stripe-elements'
import stripe from '../misc/stripe'
import { withFormik } from 'formik'
import form_checkOutForm from './forms/checkOutForm'
import dateHelper from 'date-helper-util'

class Join extends Component {

  constructor(props) {
    super(props);
    let stateObj = {
      user: null,
      shippingComplete: false,
      shipping: null,
      loading: true,
      forceScreen: null,
      orderDetails: null,
      redirect: null,
      submittingPayment: false,
      promoApplied: null
    };
    this.state = stateObj

    window.Intercom("update")
    
    let self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
          if(snapshot.val()) {
            if(snapshot.val().stripeCustomerId && snapshot.val().payment) {
              return self.setState({
                redirect: '/account/dashboard'
              })
            }
            self.setState({
              user: snapshot.val(),
              shipping: snapshot.val().shipping ? {
                firstName: snapshot.val().firstName || '',
                lastName: snapshot.val().lastName || '',
                streetAddress: snapshot.val().shipping.streetAddress || '',
                aptSuite: snapshot.val().shipping.aptSuite || '',
                city: snapshot.val().shipping.city || '',
                state: snapshot.val().shipping.state || '',
                zip: snapshot.val().shipping.zip || ''
              } : {},
              shippingComplete: snapshot.val().shippingComplete || false,
              payment: snapshot.val().payment || null,
              loading: false
            })
            self.fetchAvailableSubscriptions()
          } else {
            // we have an authenticated user, but no user object yet
            self.setState({
              loading: false
            })
          }
        })
      } else {
        self.setState({
          loading: false
        })
      }
    })

    this.forceScreen = this.forceScreen.bind(this)
    this.fetchAvailableSubscriptions = this.fetchAvailableSubscriptions.bind(this)
    this.calculateOrderDetails = this.calculateOrderDetails.bind(this)
    this.calculateTax = this.calculateTax.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.applyPromo = this.applyPromo.bind(this)
  }
  
  forceScreen(screen) {
    this.setState({
      forceScreen: screen
    })
  }

  fetchAvailableSubscriptions() {
    let self = this
    window.fetchSettings()
    return new Promise(function(resolve, reject) {
      firebase.database().ref('/subscriptions').orderByChild("active").equalTo(true).once("value", function(snapshot) {
        if(snapshot.val()) {
          const subscriptions = Object.keys(snapshot.val()).map((id) => {
            return snapshot.val()[id]
          })

          self.setState({
            subscriptions: subscriptions,
            selectedSubscription: subscriptions[0]
          }, () => {
            self.calculateOrderDetails()
          })
        } else {
          alert('No subscriptions available.')
        }
      })
    })
  }

  calculateOrderDetails() {
    /* Code For Calculate Order details */
  }

  applyPromo(promo) {
    let self = this
    let promoInput, promoEntered
    if(!promo) {
      promoInput = document.getElementById('promoCode')
      promoEntered = promoInput.value
    } else {
      promoEntered = promo
    }
    
    stripe.retrieveCoupon(promoEntered).then(coupon => {
      
      if(coupon.valid) {
        self.setState({
          promoApplied: coupon
        })
        self.calculateOrderDetails()
      } else {
        alert("Sorry, this promo code is no longer valid.")
      }

    }, error => {
      alert("Sorry, this promo code is not valid.")
    })

  }
  
  calculateTax() {
    return 0
  }

  calculateTotal() {
    return 0
  }

  render() {
    if (this.state.redirect != null) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="Join">
        { this.state.loading && <SmallLoader radius="100" strokeWidth="2" className="contentLoader" /> }
        { !this.state.loading && <section>
          <div className="container">
            { !this.state.loading && this.state.user !== null && <div className="row">
              <div className="col s12 m8 offset-m2 l6 offset-l3">
                <a className={ (this.state.user === null) ? "progress-tab" : "progress-tab complete" }>
                  <span className="icon">
                    <i className="material-icons">{ (this.state.user === null) ? "panorama_fish_eye" : "check" }</i>
                  </span>
                  <span className="name">Account</span>
                </a>
                <a onClick={()=>{this.forceScreen('shipping')}} className={ ((this.state.user !== null && this.state.shippingComplete !== true)) ? "progress-tab" : "progress-tab complete" }>
                  <span className="icon"><i className="material-icons">{ ((this.state.user !== null && this.state.shippingComplete !== true)) ? "panorama_fish_eye" : "check" }</i></span>
                  <span className="name">Shipping</span>
                </a>
                <a onClick={()=>{this.forceScreen(null)}} className="progress-tab">
                  <span className="icon"><i className="material-icons">panorama_fish_eye</i></span>
                  <span className="name">Payment</span>
                </a>
              </div>
            </div> }
            <div className="row">

              {!this.state.loading && <div>
                { this.state.user === null && <JoinAccountInfo parentComponent={this} /> }
                { ((this.state.user !== null && this.state.shippingComplete !== true) || (this.state.forceScreen === 'shipping')) && <JoinShippingInfo parentComponent={this} /> }

                {this.state.user !== null && this.state.shippingComplete === true && this.state.forceScreen === null && <div>
                  <div className="col s12 m8 offset-m2 l6 offset-l3">
                    <h5 className="section-heading">3. Payment Info</h5>
                    <p className="small">You're almost there! Fill out your payment information to complete your sign up and activate your account.</p>
                    <br />
                    { this.state.orderDetails && <StripeProvider apiKey={config.environments[config.environment].stripe.key}>
                      <Elements>
                        <CheckOutForm parentComponent={this} />
                      </Elements>
                    </StripeProvider> }
                  </div>
                  { this.state.submittingPayment && <div className="paymentLoaderContainer">
                    <SmallLoader radius="100" strokeWidth="2" className="contentLoader" label="Creating your subscription..." />
                  </div> }
                </div>}

              </div>}

            </div>
          </div>
        </section> }

      </div>
    )
  }
}

const CheckOutForm = injectStripe(withFormik({
  mapPropsToValues: props => ({
    cardNumber: '',
    cvc: '',
    mmyy: '',
    zip: '',
    promoCode: ''
  }),
  validate: (values, props) => {
    let errors = {};
    return errors;
  },
  handleSubmit: (values, {
    props,
    setSubmitting,
    setErrors
  }) => {
    let component = props.parentComponent
    const subscriptionDetails = calculateSubscription()
    
    component.setState({
      cardError: null,
      submittingPayment: true
    })

    go()

    async function go() {
      const tokenResponse = await props.stripe.createToken({
        type:'card', 
        name: component.state.user.firstName + " " + component.state.user.lastName
      })
      if(tokenResponse.error) {
        return setCardError(tokenResponse.error)
      } else {
        let customerCreation = await createCustomer(tokenResponse.token.id)
        const taxPercent = (component.state.shipping.state === 'KY') ? window.settings.taxPercent * 1e2 : 0
        if(customerCreation.succeeded) {
          let chargeMetadata = {
            orderDetails_subscription_id: component.state.orderDetails.subscription.id,
            orderDetails_subscription_name: component.state.orderDetails.subscription.name,
            orderDetails_subscription_price: component.state.orderDetails.subscription.price,
            orderDetails_subtotal: component.state.orderDetails.subtotal / 1e2,
            orderDetails_discount: component.state.orderDetails.discount / 1e2,
            orderDetails_discountedSubtotal: component.state.orderDetails.discountedSubtotal / 1e2,
            orderDetails_shipping: component.state.orderDetails.shipping / 1e2,
            orderDetails_taxCharged: component.state.orderDetails.tax / 1e2,
            orderDetails_total: component.state.orderDetails.total / 1e2
          }
          if(component.state.promoApplied) {
            chargeMetadata.promoApplied_id = component.state.promoApplied.id
            chargeMetadata.promoApplied_percent_off = component.state.promoApplied.percent_off
            chargeMetadata.promoApplied_amount_off = component.state.promoApplied.amount_off
          }
          let charge = await stripe.createCharge(component.state.orderDetails.total, customerCreation.response.id, customerCreation.response.sources.data[0].id, component.state.email, chargeMetadata)
          if(charge.succeeded) {
            const subscriptionId = props.parentComponent.state.selectedSubscription.id
            let subscription = await stripe.createSubscription(customerCreation.response.id, subscriptionId, subscriptionDetails.trialDays, taxPercent, component.state.promoApplied)
            updateUser(customerCreation.response, subscription)
          } else {
            setCardError(charge.error)
          }
        } else {
          setCardError(customerCreation.error)
        }
      }
    }

    async function setCardError(msg) {
      component.setState({
        cardError: msg,
        submittingPayment: false
      })
      setSubmitting(false)
    }

    async function createCustomer(tokenId) {
      const shipping = {
        address: {
          line1: component.state.shipping.streetAddress,
          line2: component.state.shipping.aptSuite,
          city: component.state.shipping.city,
          state: component.state.shipping.state,
          postal_code: component.state.shipping.zip
        },
        name: component.state.user.firstName + " " + component.state.user.lastName
      }
      const cardInfo = {
        number: values.cardNumber,
        expMonth: values.mmyy.split('/')[0],
        expYear: values.mmyy.split('/')[1],
        cvc: values.cvc,
        billingZip: values.zip
      }
      return stripe.createCustomer(component.state.user.email, shipping, tokenId)
    }

    async function updateUser(customer, subscription) {
      
    }

  },
})(form_checkOutForm));

const calculateSubscription = function() {
  
}

const daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;
  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}

export default Join;

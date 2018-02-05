import React, { Component } from 'react'
import { withFormik } from 'formik'
import form_shippingInfo from './forms/shippingInfo.js'
import firebase from '../misc/firebase.js'

class Join_ShippingInfo extends Component {
  constructor(props) {
    super(props);
    let stateObj = {
      user: null,
      shippingComplete: false,
      shipping: null
    };
    this.state = stateObj;
  }

  render() {
    return (
      <div className="Join_ShippingInfo">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <h5 className="section-heading">2. Shipping info</h5>
          <div className="box">
            <ShippingInfoForm parentComponent={this.props.parentComponent} />
          </div>
        </div>
      </div>
    )
  }
}

export default Join_ShippingInfo;

const ShippingInfoForm = withFormik({
  mapPropsToValues: props => ({
    firstName: props.parentComponent.state.shipping.firstName,
    lastName: props.parentComponent.state.shipping.lastName,
    streetAddress: props.parentComponent.state.shipping.streetAddress || '',
    aptSuite: props.parentComponent.state.shipping.aptSuite || '',
    city: props.parentComponent.state.shipping.city || '',
    state: props.parentComponent.state.shipping.state || '',
    zip: props.parentComponent.state.shipping.zip || ''
  }),
  validate: (values, props) => {
    let errors = {};
    return errors;
  },
  handleSubmit: (values, {
    props,
    setSubmitting,
    setErrors /* setValues, setStatus, and other goodies */,
  }) => {
    
    if(!values.state) {
      setSubmitting(false)
      return alert("The state field is required.")
    }

    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
      shipping: values,
      shippingComplete: true
    }).then(function() {
      props.parentComponent.setState({
        shippingComplete: true,
        shipping: values,
        forceScreen: null
      }, () => {
        props.parentComponent.fetchAvailableSubscriptions()
      })
    }).catch(function(e) {
      setSubmitting(false)
      console.error(e)
    })

  }
})(form_shippingInfo);
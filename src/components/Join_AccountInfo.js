import React, { Component } from 'react'
import { withFormik } from 'formik'
import form_newAccountInfo from './forms/newAccountInfo.js'
import firebase from '../misc/firebase.js'

class Join_AccountInfo extends Component {
  constructor(props) {
    super(props);
    let stateObj = {
      user: null,
      shippingComplete: false,
      shipping: null
    };
    this.state = stateObj
    this.signInWithFacebook = this.signInWithFacebook.bind(this)
    this.updateParentState = this.updateParentState.bind(this)
    let self = this
    
    if(props.parentComponent.props.appComponent.state.newFbookSignupFromLoginData) {
      const newFbookUser = props.parentComponent.props.appComponent.state.newFbookSignupFromLoginData
      storeUserInDb(newFbookUser).then(function() {
        console.log("stored user in db. now update parent state")
        self.updateParentState({
          user: {
            // details
          },
          shipping: {
            //details
          }
        })
      })
    }
  }

  componentDidMount() {
    
  }

  signInWithFacebook() {
    let self = this
    let provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('email')
    provider.addScope('public_profile')
    provider.addScope('user_friends')


    firebase.auth().signInWithPopup(provider).then(async function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const user = result.user
      const firstName = user.displayName.split(' ').slice(0, -1).join(' ')
      const lastName = user.displayName.split(' ').slice(-1).join(' ')
      const userData = {
        // details
      }
      await storeUserInDb(userData)
      self.updateParentState({
        user: {
          //details
        },
        shipping: {
          firstName: firstName,
          lastName: lastName
        }
      })
      
    }).catch(function(error) {
      console.log("error", error);
    });

  }
  
  updateParentState(data) {
    this.props.parentComponent.setState(data)
  }

  render() {
    return (
      <div className="Join_AccountInfo">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <h5 className="section-heading">1. Create your account</h5>
          <br />
          <div className="box">
            <button className="btn btn-block btn-l facebook-color" onClick={this.signInWithFacebook}>Sign up with Facebook</button>
          </div>
          <p className="small">
            or sign up with email
          </p>
          <div className="box">
            <NewAccountForm parentComponent={this.props.parentComponent} />
          </div>
        </div>
      </div>
    )
  }
}

export default Join_AccountInfo;

const NewAccountForm = withFormik({
  mapPropsToValues: props => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }),
  validate: (values, props) => {
    let errors = {};
    if(values.password.length < 8)
      errors.password = "Password must be at least 8 characters in length."
    if(values.password !== values.confirmPassword)
      errors.confirmPassword = "Passwords must match."
    return errors;
  },
  handleSubmit: (values, {
    props,
    setSubmitting,
    setErrors /* setValues, setStatus, and other goodies */,
  }) => {

    // sign user up with email and password
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then(function(res) {
        firebase.auth().currentUser.updateProfile({
          displayName: values.firstName + ' ' + values.lastName
        }).then(async function() {
          await storeUserInDb({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            shipping: {
              firstName: values.firstName,
              lastName: values.lastName
            }
          })
          props.parentComponent.setState({
            user: {
              email: values.email,
              signUpMethod: "email",
              displayName: values.firstName + ' ' + values.lastName,
              firstName: values.firstName,
              lastName: values.lastName
            },
            shipping: {
              firstName: values.firstName,
              lastName: values.lastName
            }
          })
        }).catch(function(error) {
          setSubmitting(false)
          console.error(error)
        });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        setSubmitting(false)
      });
  },
})(form_newAccountInfo);

function storeUserInDb(userData) {
  return firebase.database().ref('users/' + firebase.auth().currentUser.uid).update(userData)
}
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../misc/firebase.js'
import { withFormik } from 'formik'
import form_login from './forms/login.js'
import form_resetpassword from './forms/resetPassword.js'

class Login extends Component {

  constructor(props) {
    super(props)
    let stateObj = {
      redirect: null
    }
    this.state = stateObj
    this.login = this.login.bind(this)
    this.signInWithFacebook = this.signInWithFacebook.bind(this)
    this.goTo = this.goTo.bind(this)
    let self = this
    
    window.Intercom("update")

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
          redirect: 'account/dashboard'
        })
      }
    })
  }

  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  forgotpassword(email){
    // Code for forgot  password
  }

  goTo(route) {
    this.setState({redirect:route})
  }

  signInWithFacebook() {
    // code for sign in with facebook
  }

  render() {
    if (this.state.redirect != null) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="Login">
        <section>
          <div className="container">
            <div className="row">
              <div className="Join_AccountInfo">
                <div className="col s12 m8 offset-m2 l6 offset-l3">
                  <h5 className="section-heading text-left">Login</h5>
                  <br />
                  <div className="box">
                    <button className="btn btn-block btn-l facebook-color" onClick={this.signInWithFacebook}>Login with Facebook</button>
                  </div>
                  <p className="small">
                    or login with your email
                  </p>
                  <div className="box">
                    <LoginForm parentComponent={this} />
                  </div>
                  <p className="small">
                    Forgot Password
                  </p>
                  <div className="box">
                    <ResetpasswordForm parentComponent={this} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    )
  }
}

const LoginForm = withFormik({
  mapPropsToValues: props => ({
    email: '',
    password: ''
  }),
  handleSubmit: async function(values, {
    props,
    setSubmitting,
    setErrors
  }) {
    try {
      
      await props.parentComponent.login(values.email, values.password)
    } catch(e) {
      setSubmitting(false)
      setErrors({
        error: "Invalid username and/or password."
      })
    }
  },
})(form_login);

const ResetpasswordForm = withFormik({
  mapPropsToValues: props => ({
    email: ''
  }),
  handleSubmit: async function(values, {
    props,
    setSubmitting,
    setErrors
  }) {
    try {
      props.parentComponent.forgotpassword(values.email).then(function(res){
        setSubmitting(false)
      })
    } catch(e) {
      setSubmitting(false)
      setErrors({
        error: 'Invalid Email'
      })
    }
  }
})(form_resetpassword)

async function fetchUser() {
  return new Promise(async function(resolve, reject) {
    let currentUser = await firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value')
    return resolve( (currentUser.val() !== null) ? currentUser.val() : {} )
  })
}

export default Login;
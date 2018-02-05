import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import firebase from './misc/firebase.js'

import AppLayout from './components/AppLayout'
import Home from './components/Home.js'
import Join from './components/Join.js'
import Login from './components/Login.js'
import Dashboard from './components/Account/Dashboard.js'
import Forgotpassword from './components/Forgotpassword.js'

import * as qs from 'query-string'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component {
  constructor(props) {
    super(props)
    let stateObj = {
      redirect: (firebase.auth().currentUser) ? '/account/dashboard' : null,
      loading: true
    }
    this.state = stateObj

    const queryParams = qs.parse(window.location.search)
    if(queryParams.applyPromo)
      sessionStorage.setItem("applyPromo", queryParams.applyPromo)

    let self = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let currentUser = {
          record: user
        }
        var ref = firebase.database().ref('users/'+firebase.auth().currentUser.uid);
        ref.on("value", function(snapshot) {
          if(snapshot.val()) {
            currentUser.snapshot = snapshot.val()
          }
          self.setState({
            currentUser: currentUser,
            loading: false
          })
        })
      } else {
        self.setState({
          loading: false
        })
      }
    })

    window.fetchSettings = () => {
      firebase.database().ref('/settings').once("value", function(snapshot) {
        console.log("Fetched settings from db")
        window.settings = snapshot.val()
      }, function(e) {
        console.error("Error fetching settings from db.", e)
      })
    }

  }
  render() {
    return (
      <div className="App">
        <Router>
          <AppLayout currentUser={this.state.currentUser} loading={this.state.loading}>
            <Route exact path="/" component={Home} />
            <PropsRoute path="/join" component={Join} appComponent={this} />
            <PropsRoute path="/login" component={Login} appComponent={this} />
            <PropsRoute path="/forgotpassword" component={Forgotpassword} appComponent={this} />
            <PropsRoute path="/account/dashboard" component={Dashboard} currentUser={this.state.currentUser} loading={this.state.loading} />
            { this.state.redirect != null && <Redirect to={this.state.redirect} /> }
          </AppLayout>
        </Router>
      </div>
    )
  }
}

export default App;

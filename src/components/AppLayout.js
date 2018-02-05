import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from '../misc/firebase.js'
import Navbar from './Navbar'
import Footer from './Footer'

class AppLayout extends Component {
  constructor(props) {
    super(props);
    let stateObj = {
    }
    this.state = stateObj

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("user logged in")
      }
    });
  }

  render() {
  	return (
  		<div className="App">
		  	<Navbar currentUser={this.props.currentUser} loading={this.state.loading} />
		    {this.props.children}
		    <Footer currentUser={this.props.currentUser} loading={this.state.loading} />
		 	</div>
		)
  }
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppLayout

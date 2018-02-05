import React, { Component } from 'react'
import logo from '../assets/img/logo-full.svg'
import { Link } from 'react-router-dom'
import firebase from '../misc/firebase.js'

class Navbar extends Component {
  constructor(props) {
    super(props);
    let stateObj = {
      currentUser: null,
      redirect: null,
      promo: null
    };
    if(sessionStorage.getItem('applyPromo')) {
      stateObj.promo = sessionStorage.getItem('applyPromo')
    }
    this.state = stateObj;
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    firebase.auth().signOut()
    localStorage.removeItem('currentUser')
    window.location = '/login'
  }

  render() {
    return (
      <div className="Navbar">

        <div className="navbar-fixed">
          <nav className="white">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo left">
                <img src={logo} className="logo" alt="Watch Studio logo" />
              </Link>
              { !this.props.loading && <div className="right">
                { !this.props.currentUser && <div>
                  <Link to="/login">Login</Link>
                  <Link to="/join" className="btn gold white-text hide-on-small-only">Join</Link>
                </div> }
                { this.props.currentUser && <div>
                  <Link to="/account/dashboard">My Account</Link>
                  <a onClick={this.logOut}>Logout</a>
                </div> }
              </div> }
            </div>
          </nav>
        </div>

        <div className="banner-alert text-center white-text">
          { !this.props.loading && !(this.props.currentUser && this.props.currentUser.snapshot && this.props.currentUser.snapshot.payment) && this.state.promo !== null ? <span>
            The best monthly watch club.&nbsp;
            { (this.state.promo.indexOf('FREE') > -1) && <span>Use promo code <span className="gold-text">{ this.state.promo }</span> to get your first month FREE!</span> }
            { (this.state.promo.indexOf('50') > -1) && <span>Use promo code <span className="gold-text">{ this.state.promo }</span> for 50% off your first month!</span> }
            { (this.state.promo.indexOf('25') > -1) && <span>Use promo code <span className="gold-text">{ this.state.promo }</span> for 25% off your first month!</span> }
          </span> : <span>
            The best monthly watch club. We deliver style to your doorstep every single month.
          </span> }
        </div>

      </div>
    )
  }
}

export default Navbar;

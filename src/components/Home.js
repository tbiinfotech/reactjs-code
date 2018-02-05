import React, { Component } from 'react'
import salvationArmy from '../assets/img/salvation-army.png'
import subscribeIcon from '../assets/img/subscribe-icon.png'
import receiveIcon from '../assets/img/receive-icon.png'
import rockIcon from '../assets/img/rock-icon.png'
import { Link, Redirect } from 'react-router-dom'

class Home extends Component {
  
  constructor(props) {
    super(props)
    let stateObj = {
      redirect: null
    }
    this.state = stateObj
    window.Intercom("update")
  }

  render() {
    var self = this;
    if (self.state.redirect != null) {
      return <Redirect to={self.state.redirect} />;
    }
    return (
      <div className="Home">

        <div className="banner-alert text-center white-text">
          <span>Launch sale! Use code <span className="light-gold-text">LAUNCHPARTY</span> for 50% OFF your first month.</span>
        </div>

        <div className="welcome-hero">
          <div className="container">
            <div className="row">
              <div className="col s12 white-text">
                <div className="welcome-hero-heading">We deliver <span className="light-gold-text">style</span>, for $19/month.</div>
              </div>
            </div>
            <div className="row welcome-hero-content">
              <div className="col m10 l8 xl6 white-text">
                <p>High quality watches delivered to you every single month. Each watch is yours to keep. $1 of your subscription fee is donated to a select non-profit organization each month.</p>
                <Link to="/join" className="btn gold white-text">JOIN NOW</Link>
              </div>
            </div>
          </div>

        </div>

        <section className="how-it-works">
          <div className="row">
            <div className="col s12">
              <h4 className="section-heading gold-text">How It Works</h4>
            </div>
          </div>
          <div className="row text-center grey-text text-darken-2 how-it-works-steps">
            <div className="col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
              <div className="col s12 m4">
                <h5>1. SUBSCRIBE</h5>
                <img src={subscribeIcon} alt=" Icon" />
              </div>
              <div className="col s12 m4">
                <h5>2. RECEIVE</h5>
                <img src={receiveIcon} alt="Receive Icon" />
              </div>
              <div className="col s12 m4">
                <h5>3. ROCK</h5>
                <img src={rockIcon} alt="Rock Icon" />
              </div>
            </div>
          </div>
          <div className="row text-center grey-text text-darken-2">
            <div className="col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
              <p>Each month, our designers at The Watch Studio design and build a new watch. That watch is shipped to all subscribers during the first two weeks of the month. If you register on the 20th day of the month or earlier, you will be charged for the current month and receive your first watch within 3-7 business days. Your subscription will continue on the first day of the next month. However, if you register after the 20th of the current month, you will receive your first watch during the first two weeks of the following month.</p>
              <p>Every watch you receive is yours to keep! This is not a rental subscription.</p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col s12">
              <br />
              <Link to="/join" className="btn gold white-text">JOIN NOW</Link>
            </div>
          </div>
        </section>

        <section className="whats-included">
          <div className="row">
            <div className="col s12">
              <h4 className="section-heading white-text">What's Included?</h4>
            </div>
          </div>
          <div className="row text-center white-text">
            <div className="col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
              <p>At the beginning of each month, you’ll receive a box in the mail including a high quality designer watch which is carefully designed and built by our designers at The Watch Studio. By being a subscriber, you will also be donating $1 each month to a non-profit organization selected by The Watch Studio. Keep an eye on our social media accounts to see the monthly organizations selected.</p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col s12">
              <br />
              <Link to="/join" className="btn gold white-text">JOIN NOW</Link>
            </div>
          </div>
        </section>

      </div>
    )
  }
}

export default Home;

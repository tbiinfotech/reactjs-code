import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class Footer extends Component {
  render() {
    return (
      <div className="Footer">

        <footer className="grey lighten-3">
          <div className="text-center grey-text">
            &copy; The Watch Studio - All rights reserved.
          </div>
          <div className="text-center grey-text social-links">
            <a href="https://www.facebook.com/thewatch.studio1/" alt="Facebook page for The Watch Studio" target="_blank"><FontAwesome className="marT-10 marR-10" name='facebook-square' size='3x' /></a>
            <a href="https://www.instagram.com/thewatch.studio/" alt="Instagram page for The Watch Studio" target="_blank"><FontAwesome className="marT-10" name='instagram' size='3x' /></a>
          </div>
        </footer>

      </div>
    )
  }
}

export default Footer;

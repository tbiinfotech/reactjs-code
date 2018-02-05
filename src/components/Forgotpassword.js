import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../misc/firebase'

class Forgotpassword extends Component {

	constructor(props) {
    super(props)
    let stateObj = {
      redirect: null,
      loading: true,
      errpassword: null,
      errRepassword: null,
      isDisable: false
    }
    this.state = stateObj
	}

	handleChangePassword(event){
    let fieldName = event.target.name;
    if(fieldName === 'password'){
      this.setState({password: event.target.value});
    } else{
      this.setState({repassword: event.target.value});
    }
  }

	submitUpdatePassword(){
		
			/* Code For Update Password */
	
	}

  render() {
  	if (this.state.redirect !== null) {
      return <Redirect to={this.state.redirect} />;
    }
 		return (
 			<div className="Login">
 			<section>
      	<div className="container">
        	<div className="box">
						<div className="row">
							<div className="col s12 m8 offset-m2 l6 offset-l3">
								<h5 className="section-heading text-left">Update Password</h5>
                <br />
								<div className="col s12">
									<label>New Password</label>
									<input id="password" placeholder="Enter Password" className="form-control" name="password" type="password" onChange={this.handleChangePassword.bind(this)} required />
									{this.state.errpassword && <p className="xsmall bold red-text text-darken-3 form-error">{this.state.errpassword}</p>}
								</div>
								<div className="col s12">
									<label>New Password</label>
									<input id="confirmPassword" placeholder="Re-Enter Password" className="form-control" name="repassword" type="password" onChange={this.handleChangePassword.bind(this)} required />
									{this.state.errRepassword && <p className="xsmall bold red-text text-darken-3 form-error">{this.state.errRepassword}</p>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col s12 m8 offset-m2 l6 offset-l3">
								<div className="col s12">
									<button className="btn btn-block btn-l black" type="submit" onClick={this.submitUpdatePassword.bind(this)} disabled={this.state.isDisable}>Update Password</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>);
  }
}

export default Forgotpassword;
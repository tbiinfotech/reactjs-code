import React, { Component } from 'react';

class SmallLoader extends Component {
  
  getLoaderStyle() {
    const radius = this.props.radius || 20;
    return {
      height: radius+"px",
      width: radius+"px"
    }
  }
  
  getStrokeWidth() {
    const strokeWidth = this.props.strokeWidth || 3;
    return strokeWidth;
  }

  render() {
    return (<div className="small-loader-container">
      <div id="SmallLoader" className={"loader " + (this.props.className || "")} style={this.getLoaderStyle()}>
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" fill="none" r="20" strokeMiterlimit="10" strokeWidth={this.getStrokeWidth()}></circle>
        </svg>
      </div>
      { this.props.label && <span className="label">{ this.props.label }</span> }
    </div>);
  }

}

export default SmallLoader;
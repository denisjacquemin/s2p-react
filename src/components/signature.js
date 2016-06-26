import React from 'react'

var Signature = React.createClass( {
  render: function() {
    return (
      <div className="signature">
        <div className="logo"><img src="assets/img/hologne.jpg"/></div>
          <div className="fullname">{this.props.signature.fullname}</div>
          <div className="school">{this.props.signature.schoolname}</div>
          <div className="function">{this.props.signature.function}</div>
          <div className="address">{this.props.signature.address}</div>
          <div className="contact">{this.props.signature.phone}</div>
      </div>
    )
  }
});
export default Signature;

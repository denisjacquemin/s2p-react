import React from 'react'

var Signature = React.createClass( {
  render: function() {
    let img
    if (this.props.signature.logo_url != undefined) {
      img = <img src={'https:' + this.props.signature.logo_url} />
    }
    return (
      <div className="signature">
        <div className="logo">{img}</div>
          <div className="fullname">{this.props.signature.fullname}</div>
          <div className="school">{this.props.signature.schoolname}</div>
          <div className="function">{this.props.signature.function}</div>
          <div className="address">{this.props.signature.address}</div>
          <div className="url">{this.props.signature.url}</div>
          <div className="email"><a href="mailto:{this.props.signature.email}">{this.props.signature.email}</a></div>
          <div className="phone">{this.props.signature.phone}</div>
      </div>
    )
  }
});
export default Signature;

//<a href="tel:{this.props.signature.phone}">{this.props.signature.phone}</a></div>

import React from 'react'

var Signature = React.createClass( {
  render: function() {
    return (
      <div className="signature">
        <div className="logo"><img src="assets/img/hologne.jpg"/></div>
          <div className="fullname">Jean-Marie LOBET</div>
          <div className="school">Ecole communale fondamentale Hollogne-Humain </div>
          <div className="function">Directeur</div>
          <div className="address">60 Rue Saint-Denis, 6900 Hollogne</div>
          <div className="contact">Tél: 084/31 54 30 - Fax: 084/31 54 30 - Gsm: 0495/77 11 94 jean-marie.lobet@marche.be - http://ecolescommunales.marche.be</div>
      </div>
    )
  }
});
export default Signature;

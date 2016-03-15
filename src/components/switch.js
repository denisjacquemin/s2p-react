import React from 'react'

const isChecked = (checked) => {
  if (checked) {
    return 'checked'
  }
  return '';
};

var Switch = React.createClass({
  componentDidUpdate: function() {
      // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
      componentHandler.upgradeDom();
  },

  handleChange: function(e) {
    this.props.onClick();
  },

  render: function() {
    let isChecked = '';
    if (this.props.active) {
      isChecked = 'is-checked'
    }

    return (
      <label className="mdl-switch mdl-js-switch mdl-switch--accent" htmlFor="switch-1">
        <input type="checkbox" id="switch-1" className="mdl-switch__input" onClick={this.handleChange} />
        <span className="mdl-switch__label"></span>
      </label>
    )
  }
});

// const Switch = ({
//   active,
//   onClick
// }) => {
//   let isChecked = '';
//   if (active) {
//     isChecked = 'is-checked'
//   }
//
//   return (
//     <label className="mdl-switch mdl-js-switch" for="switch-1">
//       <input type="checkbox" id="switch-1" className="mdl-switch__input" checked />
//       <span className="mdl-switch__label">Important</span>
//     </label>
//   )
// };

export default Switch;

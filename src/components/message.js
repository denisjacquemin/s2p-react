import React from 'react'

const Message = ({
  onClick,
  title,
  content,
  important
}) => (
  <div className="bienmanger mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col mdl-cell--10-col-tablet mdl-cell--8-col-desktop">
    <div className="mdl-card__media mdl-card__title mdl-card--expand mdl-color--teal-300">
      { title }
    </div>
    <div className="mdl-card__supporting-text mdl-color-text--grey-600">
      { content }
    </div>
    <div className="mdl-card__actions mdl-card--border">
      <a onClick={onClick} href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">La suite</a>
    </div>
  </div>
);

// var Message = React.createClass({
//   render: function() {
//     return (
//       <div className="bienmanger mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col mdl-cell--10-col-tablet mdl-cell--8-col-desktop">
//         <div className="mdl-card__media mdl-card__title mdl-card--expand mdl-color--teal-300">
//         </div>
//         <div className="mdl-card__supporting-text mdl-color-text--grey-600">
//           { this.props.data.content }
//         </div>
//         <div className="mdl-card__actions mdl-card--border">
//           <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">La suite</a>
//         </div>
//       </div>
//     );
//   }
// });
export default Message;

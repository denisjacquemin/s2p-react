import React, {Component} from 'react'

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import Star from 'material-ui/lib/svg-icons/toggle/star';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import {Spacing} from 'material-ui/lib/styles';


var FullMessageComponent  = React.createClass( {

  componentWillMount: function() {
  },

  componentDidMount: function() {
  },

  handleShowMessagesScreen: function(e) {
    this.props.onShowMessagesScreen()
    e.preventDefault();
  },

  toggleImportant: function(e) {
    this.props.onToggleImportant(this.props.currentMessage.id)
    e.preventDefault();
  },

  getStyles: function() {
    const styles = {
      appBar: {
        position: 'fixed',
        top: 0,
        paddingTop: '10px'
      },
      root: {
        paddingTop: Spacing.desktopKeylineIncrement + 10,
        minHeight: 400,
        WebkitTransform: 'translate3d(0, 0, 0)'
      },
      content: {
        margin: Spacing.desktopGutter,
      },
      fullscreen: {
        margin: '0',
        WebkitFontSmoothing: 'subpixel-antialiased',
        boxShadow: 'none'
      }
    };
    return styles;
  },

  getContent: function(theHTML) {
    return {__html: theHTML };
  },

  render: function() {
    const styles = this.getStyles();
    const message = this.props.currentMessage;

    let starIcon = <IconButton iconStyle={styles.icon} onTouchTap={this.toggleImportant}><StarBorder/></IconButton>
    if (message.important) {
      starIcon = <IconButton iconStyle={styles.icon} onTouchTap={this.toggleImportant}><Star/></IconButton>
    }

    return (
      <div>
        <AppBar title="App"
          style={styles.appBar}
          iconElementLeft={<IconButton onTouchTap={this.handleShowMessagesScreen}><NavigationClose /></IconButton>}
          iconElementRight={starIcon}
        />
        <div style={styles.root}>
          <Card style={styles.fullscreen} className="fade-in">
            <CardTitle title={message.title} subtitle="Aujourd'hui" />
            <CardText className="card-text" dangerouslySetInnerHTML={this.getContent(message.content)} />
          </Card>
        </div>
      </div>

    )
  }
});

export default FullMessageComponent;

// <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
//   <header className="mdl-layout__header">
//       <button className="mdl-layout-icon mdl-button mdl-js-button mdl-button--icon" onTouchTap={this.handleShowMessagesScreen}>
//         <i className="material-icons">close</i>
//       </button>
//   </header>
//   <main className="mdl-layout__content entry">
//     <div className="mdl-grid mdl-grid--no-spacing">
//         <div className="school  mdl-card mdl-cell mdl-cell--12-col">
//           <div className="mdl-card__media mdl-card__title mdl-card--expand mdl-color--teal-300">
//             <h2 className="mdl-card__title-text">Nouvelle classe maternelle</h2>
//           </div>
//           <div className="mdl-card__supporting-text mdl-color-text--grey-600 mdl-cell--stretch">
//             <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
//             <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
//             <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
//             <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
//             <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
//             <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
//           </div>
//         </div>
//     </div>
//
//
//     <footer className="mdl-mini-footer">
//       <div className="mdl-mini-footer--left-section">
//         <button className="mdl-mini-footer--social-btn social-btn social-btn__twitter">
//           <span className="visuallyhidden">Twitter</span>
//         </button>
//         <button className="mdl-mini-footer--social-btn social-btn social-btn__blogger">
//           <span className="visuallyhidden">Facebook</span>
//         </button>
//         <button className="mdl-mini-footer--social-btn social-btn social-btn__gplus">
//           <span className="visuallyhidden">Google Plus</span>
//         </button>
//       </div>
//       <div className="mdl-mini-footer--right-section">
//         <button className="mdl-mini-footer--social-btn social-btn__share">
//           <i className="material-icons" role="presentation">share</i>
//           <span className="visuallyhidden">share</span>
//         </button>
//       </div>
//     </footer>
//   </main>
// </div>

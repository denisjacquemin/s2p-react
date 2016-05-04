import React, {Component} from 'react'

import Slider from 'react-slick';
import moment from 'moment'
import "moment/locale/fr";

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import s2pTheme from '../theme';


import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import Group from 'material-ui/lib/svg-icons/social/group';
import Star from 'material-ui/lib/svg-icons/toggle/star';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import {Spacing} from 'material-ui/lib/styles';


import ImageLoader from 'react-imageloader';

const s2pMuiTheme = getMuiTheme(s2pTheme);

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
        paddingTop: '10px',
        top: '0'
      },
      content: {
        position: 'fixed',
        top: Spacing.desktopGutter
      },
      fullscreen: {
        position: 'relative',
        top: '74px',
        marginLeft: '0',
        marginRight: '0',
        WebkitFontSmoothing: 'subpixel-antialiased',
        boxShadow: 'none'
      },
      cardMedia: {
        maxHeight: '250px',
        overflow: 'hidden'
      },
      cardText: {
        fontSize: '16px'
      }
    };
    return styles;
  },

  getContent: function(theHTML) {
    return {__html: theHTML };
  },

  getSlickSettings: function() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots',
      infinite: true,
      autoplay: false,
      arrows: false,
      swipe: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true
    }
    return settings;
  },

  preloader: function() {
    return <img src="assets/img/placeholder-470x352.jpg" />;
  },

  render: function() {
    const styles = this.getStyles();
    const message = this.props.currentMessage;
    const settings = this.getSlickSettings();

    let starIcon = <IconButton iconStyle={styles.icon} onTouchTap={this.toggleImportant}><StarBorder/></IconButton>
    if (message.important) {
      starIcon = <IconButton iconStyle={styles.icon} onTouchTap={this.toggleImportant}><Star/></IconButton>
    }

    let media
    if (message.mfiles != undefined && message.mfiles.length > 0) {
      if (message.mfiles.length > 1) {
        let slides = []
        for (let i in message.mfiles) {
          slides.push(<div key={message.mfiles[i].id} style={styles.cardMedia}><ImageLoader src={'http:' + message.mfiles[i].file_url} wrapper={React.DOM.div} preloader={this.preloader}></ImageLoader></div>)
        }
        media = <CardMedia>
          <Slider {...settings}>
            {slides}
          </Slider>
        </CardMedia>
      } else {
        media = <CardMedia style={styles.cardMedia}><img src={'http:' + message.mfiles[0].file_url} /></CardMedia>
        }
    }

    let subtitle = <span>{moment(message.publish_date).format('Do MMMM YYYY')} - {message.students.join(' - ')}</span>;

    return (
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        <div>
          <AppBar title="App"
            style={styles.appBar}
            iconElementLeft={<IconButton onTouchTap={this.handleShowMessagesScreen}><NavigationClose /></IconButton>}
            iconElementRight={starIcon}
          />

          <Card style={styles.fullscreen} className="fade-in">
              { media }
              <CardTitle title={message.title} subtitle={subtitle} />
              <CardText style={styles.cardText} className="card-text" dangerouslySetInnerHTML={this.getContent(message.content)} />
          </Card>
        </div>
      </MuiThemeProvider>

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

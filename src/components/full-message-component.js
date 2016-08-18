import React, {Component} from 'react'


var Scroll    = require('react-scroll');
var scroll    = Scroll.animateScroll
var Element   = Scroll.Element;
var scroller  = Scroll.scroller;
import Slider from 'react-slick';
import moment from 'moment'
import "moment/locale/fr";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import s2pTheme from '../theme';

import Signature from './signature'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Group from 'material-ui/svg-icons/social/group';
import Star from 'material-ui/svg-icons/toggle/star';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Spacing from 'material-ui/styles/spacing'


import ImageLoader from 'react-imageloader';

const s2pMuiTheme = getMuiTheme(s2pTheme);

var FullMessageComponent  = React.createClass( {

  componentDidMount: function() {
    scroller.scrollTo('top');
    try {
      window.analytics.trackView('Message ' + this.props.currentMessage.title)
    } catch (e) {
      console.log(e)
    }
  },

  componentDidUpdate: function() {
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
        fontSize: '16px',
        wordWrap: 'break-word'
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
    console.debug('render')
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
          slides.push(<div key={message.mfiles[i].id} style={styles.cardMedia}><ImageLoader src={'https:' + message.mfiles[i].file_url} wrapper={React.DOM.div} preloader={this.preloader}></ImageLoader></div>)
        }
        media = <CardMedia>
          <Slider {...settings}>
            {slides}
          </Slider>
        </CardMedia>
      } else {
        media = <CardMedia style={styles.cardMedia}><img src={'https:' + message.mfiles[0].file_url} /></CardMedia>
        }
    }
    let student_names = ""
    if (message.student != undefined) {
      student_names = ' - ' + message.student_names.join(' - ');
    }
    let subtitle = <span>{moment(message.publish_date).format('Do MMMM YYYY HH:mm')}{student_names}</span>;

    return (
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        <div ref="body">
          <AppBar title={message.title}
            style={styles.appBar}
            iconElementLeft={<IconButton onTouchTap={this.handleShowMessagesScreen}><ChevronLeft /></IconButton>}          />
          <Element name="top" className="top"></Element>
          <Card style={styles.fullscreen} className="fade-in">
              { media }
              <CardTitle title={message.title} subtitle={subtitle} />
              <CardText style={styles.cardText} className="card-text" dangerouslySetInnerHTML={this.getContent(message.content)} />
              <Signature signature={message.signature}>
              </Signature>
          </Card>
        </div>
      </MuiThemeProvider>

    )
  }
});

export default FullMessageComponent;

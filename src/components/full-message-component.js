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
import Form from './form'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Group from 'material-ui/svg-icons/social/group';
import Star from 'material-ui/svg-icons/toggle/star';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';


import Spacing from 'material-ui/styles/spacing'

import {PhotoSwipe} from 'react-photoswipe';

import ImageLoader from 'react-imageloader';

const s2pMuiTheme = getMuiTheme(s2pTheme);

var FullMessageComponent  = React.createClass( {

  getInitialState: function() {
    const items = [];
    const message = this.props.currentMessage;
    if (message.photos != undefined && message.photos.length > 0) {
      for (let i in message.photos) {
        const src = 'https://res.cloudinary.com/CLOUD_CLOUDINARY/' + message.photos[i].resource_type  + '/upload/w_1024,c_limit/' + message.photos[i].public_id + '.jpg' //+ message.photos[i].format
        const thumbnail = 'https://res.cloudinary.com/CLOUD_CLOUDINARY/' + message.photos[i].resource_type  + '/upload/ar_16:9,c_fill,h_300,g_auto/' + message.photos[i].public_id + '.jpg' //+ message.photos[i].format
        const w = message.photos[i].width
        const h = message.photos[i].height

        items.push({src: src, thumbnail: thumbnail, w: w, h: h })
      }
    }
    const options = {
      closeOnScroll: false,
      captionEl: false,
      fullscreenEl: false,
      zoomEl: false,
      shareEl: true,
      shareButtons: [
          // {id:'download', label:"Sauver l'image", url:'{{raw_image_url}}', download:true},
          {id:'facebook', label:'Partager sur Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{image_url}}'},
          {id:'twitter', label:'Partager sur Twitter', url:'https://twitter.com/intent/tweet?text={{text}}&url={{image_url}}'},
          {id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'}
      ],
      clickToCloseNonZoomable: false,
    }

    return { isPSOpen: false, PSItems: items, PSOptions: options };
  },

  componentDidMount: function() {
    scroller.scrollTo('top');
    this.props.onMessageViewed(this.props.currentMessage.id, this.props.currentMessage.school_id, device.uuid);
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
      content: {
        position: 'fixed',
        top: Spacing.desktopGutter
      },
      fullscreen: {
        position: 'relative',
        top: '64px',
        marginLeft: '0',
        marginRight: '0',
        WebkitFontSmoothing: 'subpixel-antialiased',
        boxShadow: 'none'
      },
      cardMedia: {
        // maxHeight: '250px',
        position: 'absolute',
        overflow: 'hidden'
      },
      cardMediaSlider: {
        //maxHeight: '250px',
        //overflow: 'hidden'
      },
      cardText: {
        fontSize: '16px',
        wordWrap: 'break-word'
      },
      snackbar: {
        fontFamily: 'Roboto, sans-serif',
        WebkitFontSmoothing: 'antialiased'
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
      mobileFirst: true,
      adaptiveHeight: false,
      fade: false
    }
    return settings;
  },

  preloader: function() {
    return <img src="assets/img/placeholder-470x352.jpg" />;
  },

  url_parser: function(text) {
    var regExp = /"(https?:[^\s]+)"/;
    var url = text.match(regExp);
    return url && url[1];
  },

  youtube_parser: function(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  },

  getPSThumbnailContent: function(item) {
    const styles = this.getStyles();
    return (
      <CardMedia
        style={styles.cardMedia}
        className="mediaImg">
          <ImageLoader
            src={item.thumbnail}
            wrapper={React.DOM.div}
            preloader={this.preloader}>
          </ImageLoader>
      </CardMedia>
    );
  },

  openPhotoSwipe: function(e)  {
    e.preventDefault();
    this.setState({
      isPSOpen: true
    });
  },

  closePhotoSwipe: function() {
    this.setState({
      isPSOpen: false
    });
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
    if (message.photos != undefined && message.photos.length > 0) {
      if (message.photos.length > 1) {
        let slides = []
        for (let i in message.photos) {
          slides.push(<div key={message.photos[i].id} style={styles.cardMediaSlider} onTouchTap={(e) => this.openPhotoSwipe(e)}>
            <ImageLoader
              src={'https://res.cloudinary.com/CLOUD_CLOUDINARY/' + message.photos[i].resource_type  + '/upload/ar_16:9,c_fill,h_300,g_auto/' + message.photos[i].public_id + '.' + message.photos[i].format}
              wrapper={React.DOM.div}
              preloader={this.preloader}></ImageLoader>
          </div>)
        }
        media = <CardMedia>
          <Slider {...settings}>
            {slides}
          </Slider>
        </CardMedia>
      } else {
        media = <div className="stretchyWrapper">
            <CardMedia style={styles.cardMedia} className="mediaImg">
              <img
                onTouchTap={(e) => this.openPhotoSwipe(e)}
                src={'https://res.cloudinary.com/CLOUD_CLOUDINARY/' + message.photos[0].resource_type  + '/upload/ar_16:9,c_fill,h_300,g_auto/' + message.photos[0].public_id + '.' + message.photos[0].format} />
            </CardMedia>
          </div>
        }
    } else {
      // find youtube url in content then use the thumbnail http://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg
      if (message.content.indexOf('youtube') != -1) {
        var url = this.url_parser(message.content);
        if (url) {
          var youtube_id = this.youtube_parser(url);
          media = <div className="stretchyWrapper"><CardMedia style={styles.cardMedia} className="mediaImg"><ImageLoader src={'https://img.youtube.com/vi/' + youtube_id + '/hqdefault.jpg'} wrapper={React.DOM.div} preloader={this.preloader}></ImageLoader></CardMedia></div>
        }
      }
    }


    let student_names = ""
    if (message.student_names != undefined) {
      student_names = ' - ' + message.student_names.join(' - ');
    }
    let subtitle = <span>{moment(message.publish_date).format('Do MMMM YYYY HH:mm')}{student_names}</span>;

    return (
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        <div>
          <AppBar id="header" title={message.title}
            className="appbar"
            iconElementLeft={<IconButton onTouchTap={this.handleShowMessagesScreen}><ArrowBack /></IconButton>}          />
          <Element name="top" className="top"></Element>
          <Card style={styles.fullscreen} className="fade-in content">
              {media}
              <CardTitle title={message.title} subtitle={subtitle} />
              <CardText style={styles.cardText} className="card-text" dangerouslySetInnerHTML={this.getContent(message.content)} />
              <Form muuid={message.muuid} formjson={message.formdata} onSubmitForm={this.props.onSubmitForm} showSnackbar={this.props.showSnackbar}/>
              <Signature signature={message.signature}>
              </Signature>
          </Card>
          <Snackbar
            className="snackbar"
            style={styles.snackbar}
            open={this.props.snackbar.show}
            message={this.props.snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <PhotoSwipe
            isOpen={this.state.isPSOpen}
            onClose={this.closePhotoSwipe}
            items={this.state.PSItems}
            options={this.state.PSOptions}
            thumbnailContent={this.getPSThumbnailContent} />
        </div>
      </MuiThemeProvider>
    )
  }
});

export default FullMessageComponent;

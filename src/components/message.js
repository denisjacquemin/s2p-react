import React from 'react'

import moment from 'moment'
import "moment/locale/fr";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CustomTheme from '../theme';

import ImageLoader from 'react-imageloader';

var Message = React.createClass( {

  stripHTML: function(theHTML) {
    var div = document.createElement("div");
    div.innerHTML = theHTML;
    return div.textContent || div.innerText || "";
  },

  getStyles: function() {
    const styles = {
      cardMedia: {
        //maxHeight: '250px',
        position: 'absolute',
        overflow: 'hidden'
      },
      cardActions: {
        borderTop: '1px solid #dddddd'
      }
    };
    return styles;
  },

  truncate: function(string){
     if (string.length > 200)
        return string.substring(0,200)+'...';
     else
        return string;
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

  render: function() {

    const message = this.props.message
    const styles = this.getStyles();

    let media

    if (message.photos != undefined && message.photos.length > 0) {
        let pdfList = []
        let imageList = []
  
        for (let i in message.photos) {
          if (message.photos[i].format === 'pdf') {
            pdfList.push(message.photos[i])
          } else {
            imageList.push(message.photos[i])
          }
        }
        if (imageList.length > 0) {
          //media = <div className="stretchyWrapper"><CardMedia style={styles.cardMedia} className="mediaImg" onTouchTap={() => this.props.onMessageClick(message.id)}><ImageLoader src={'https:' + message.mfiles[0].file_url} wrapper={React.DOM.div} preloader={this.preloader}></ImageLoader></CardMedia></div>
          media = <div className="stretchyWrapper"><CardMedia style={styles.cardMedia} className="mediaImg" onTouchTap={() => this.props.onMessageClick(message.id)}><ImageLoader src={'https://res.cloudinary.com/CLOUD_CLOUDINARY/' + imageList[0].resource_type  + '/upload/ar_16:9,c_fill,h_250,g_auto/' + imageList[0].public_id + '.jpg'} wrapper={React.DOM.div} preloader={this.preloader}></ImageLoader></CardMedia></div>
        }
    }
    else {
      // find youtube url in content then use the thumbnail http://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg
      if (message.content.indexOf('youtube') != -1) {
        var url = this.url_parser(message.content);
        if (url) {
          var youtube_id = this.youtube_parser(url);
          media = <div className="stretchyWrapper"><CardMedia style={styles.cardMedia} className="mediaImg" onTouchTap={() => this.props.onMessageClick(message.id)}><ImageLoader src={'https://img.youtube.com/vi/' + youtube_id + '/hqdefault.jpg'} wrapper={React.DOM.div} preloader={this.preloader}></ImageLoader></CardMedia></div>
        }
      }
    }

    let publish_date = moment(message.publish_date).format('Do MMMM YYYY HH:mm');

    return (
      <Card key={message.id} className="aMessage">
        {media}
        <CardTitle title={message.title} subtitle={publish_date} onTouchTap={() => this.props.onMessageClick(message.id)} />
        <CardText onTouchTap={() => this.props.onMessageClick(message.id)}>{ this.stripHTML(this.truncate(message.content)) }</CardText>
        <CardActions style={styles.cardActions}>
          <FlatButton label="LA SUITE" onTouchTap={() => this.props.onMessageClick(message.id)}/>
        </CardActions>
      </Card>
    )
  }
});
export default Message;
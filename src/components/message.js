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
        maxHeight: '250px',
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

  render: function() {

    const message = this.props.message
    const styles = this.getStyles();

    let media
    if (message.mfiles != undefined && message.mfiles.length > 0) {
      media = <CardMedia style={styles.cardMedia} onTouchTap={() => this.props.onMessageClick(message.id)}><ImageLoader src={'https:' + message.mfiles[0].file_url} wrapper={React.DOM.div} preloader={this.preloader}></ImageLoader></CardMedia>
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

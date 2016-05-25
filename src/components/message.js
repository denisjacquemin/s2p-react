import React from 'react'

import moment from 'moment'
import "moment/locale/fr";

import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
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
      card: {
        margin: '12px 8px'
      },
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

    let publish_date = moment(message.publish_date).format('Do MMMM YYYY');

    return (
      <Card key={message.id} style={styles.card}>
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

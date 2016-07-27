import React from 'react'

import moment from 'moment'
import "moment/locale/fr";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Event from 'material-ui/svg-icons/action/event';
import FontIcon from 'material-ui/FontIcon';

import CustomTheme from '../theme';


var Alert = React.createClass( {

  getStyles: function() {
    const styles = {
      card: {
        margin: '12px 8px',
        background: '#3E4EB8'
      },
      cardText: {
        fontSize: '24px',
        fontWeight: '400',
        color: '#ffffff',
        lineHeight: '32px',
        minHeight: '120px'
      },
      cardTextSmall: {
        fontSize: '18px',
        fontWeight: '200',
        color: '#ffffff'
      },
      students: {
        borderTop: '1px solid #dddddd',
        padding: '8px',
        position: 'relative',
        fontSize: '14px',
        color: '#ffffff',
        padding:'15px'
      },
      button: {
        color: '#ffffff'

      }
    };
    return styles;
  },


  render: function() {

    const message = this.props.message
    const styles = this.getStyles();

    return (
      <Card style={styles.card}>
        <CardText style={styles.cardText}>
          {message.title}
          <br/>{message.when}<br/>
          <small style={styles.cardTextSmall}>{message.body}</small>
        </CardText>
        <div style={styles.students}>
          {message.students.join(' - ')}
        </div>
      </Card>
    )
  }
});
export default Alert;

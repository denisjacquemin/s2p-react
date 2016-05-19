import React from 'react'

import moment from 'moment'
import "moment/locale/fr";

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import Event from 'material-ui/lib/svg-icons/action/event';
import FontIcon from 'material-ui/lib/font-icon';


import ThemeManager from 'material-ui/lib/styles/theme-manager';
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

import React, {Component} from 'react'

import Message from './message'
import Alert from './alert'

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import s2pTheme from '../theme';

var Scroll    = require('react-scroll');
var scroll    = Scroll.animateScroll

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import Star from 'material-ui/lib/svg-icons/toggle/star';
import School from 'material-ui/lib/svg-icons/social/school';
import MailOutline from 'material-ui/lib/svg-icons/communication/mail-outline';
import LinearProgress from 'material-ui/lib/linear-progress';
import NavigationRefresh from 'material-ui/lib/svg-icons/navigation/refresh';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {Spacing} from 'material-ui/lib/styles';
import Snackbar from 'material-ui/lib/snackbar';


const s2pMuiTheme = getMuiTheme(s2pTheme);

var MessageList = React.createClass( {

  getInitialState: function() {
    return { open: false };
  },

  componentDidMount: function() {
    scroll.scrollTo(this.props.currentScrollPositionY, {
      duration: 0,
      delay: 0,
      smooth: false,
    });
    try {
      window.analytics.trackView('Liste des Messages')
    } catch (e) {
      console.error(e)
    }
  },

  componentWillMount: function() {
  },

  handleLeftMenu: function(e) {
    this.setState({open: !this.state.open});
    e.preventDefault();
  },

  handleLeftMenuClose: function(e) {
    this.setState({open: false});
    e.preventDefault();
  },

  handleCodes: function(e) {
    this.props.showCodeList()
    this.setState({open: false});
    e.preventDefault();
  },

  handleMessagesScreen: function(e) {
    this.setState({open: false});
    e.preventDefault();
  },

  handleRefresh: function() {
    this.props.fetchMessages()
  },

  toggleShowImportant: function() {
    this.props.toggleShowImportant();
  },

  getStyles: function() {
    const styles = {
      appBar: {
        position: 'fixed',
        paddingTop: '10px',
        top: '0'
      },
      icon: {
        fill: '#ffffff',
        color: '#ffffff'
      },
      progress: {
        position: 'fixed',
        top: '74px',
        borderRadius: '0',
        zIndex: '100'
      },
      content: {
        position: 'absolute',
        top: '70px',
        width:  '100%',
        backgroundColor: '#dadada'
      },
      loading: {
        display: 'inline-block',
      	textAlign: 'center',
      	opacity: '.4',
      	margin: '12px 0 0 5px'
      },
      refresh: {
        width: '48px',
        height: '48px'
      },
      message: {
        padding:0
      },
      snackbar: {
        fontFamily: 'Roboto, sans-serif'
      },
      leftbarHeader: {
        width: '100%',
        backgroundColor: '#ffffff',
        textAlign:  'center',
        padding: '0 auto 0 auto',
        backgroundImage: 'url("assets/img/headerbg.jpg")',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        opacity: '.7',
        paddingTop: '30px',
        paddingBottom: '15px'
      },
      emptyState: {
        textAlign: 'center',
        width: '100%',
        fontFamily: 'Roboto, sans-serif',
        color: '#d0d0d0',
        backgroundColor: '#ffffff'
      },
      mailOutline: {
        marginTop: '40%',
        height: '110px',
        width: '110px',
        fill: '#d0d0d0'
      },
      school: {
        height: '70px',
        width: '70px',
        fill: '#ffffff'
      }
    };
    return styles;
  },

  render: function() {

    const styles = this.getStyles();

    let starIcon = <IconButton iconStyle={styles.icon} onTouchTap={this.toggleShowImportant}><StarBorder/></IconButton>
    if (this.props.showImportant) {
      starIcon = <IconButton  iconStyle={styles.icon} onTouchTap={this.toggleShowImportant}><Star/></IconButton>
    }

    let refreshIcon = <IconButton iconStyle={styles.icon} onTouchTap={this.handleRefresh}><NavigationRefresh /></IconButton>
    let progress
    if (this.props.isFetching) {
      refreshIcon = <IconButton iconStyle={styles.icon} onTouchTap={this.handleRefresh}><NavigationRefresh /></IconButton>
      progress = <LinearProgress mode="indeterminate" style={styles.progress} color="#f44336" />
    }

    let emptyState
    console.log('this.props.messages.length' + this.props.messages.length)
    if (this.props.messages.length === 0) {
      emptyState = <div style={styles.emptyState} className="animated fadeIn">
        <div>
          <MailOutline style={styles.mailOutline} />
          <p>Aucun message</p>
        </div>
      </div>
    }

    return (
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        <div>
          <AppBar id="header" title="Liste des messages"
            style={styles.appBar}
            onLeftIconButtonTouchTap={this.handleLeftMenu}
            iconElementRight={
              <div >
                {starIcon}
                {refreshIcon}
              </div>
            }
          />
          {progress}
          <div className="fade-in" style={styles.content}>
            {

              this.props.messages.map(message => {
                if (message.mtype == 1 ) {
                  return <Alert key={message.id} message={message} />
                } else {
                  return <Message key={message.id} message={message} onMessageClick={this.props.onMessageClick}  />
                }
              })
            }

          </div>
          {emptyState}
          <LeftNav
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <div style={styles.leftbarHeader}>
              <img src="assets/img/logo_draw.png" width="45%"/><br />
              <img src="assets/img/logo_text.png" width="35%"/>
            </div>
            <MenuItem onTouchTap={this.handleMessagesScreen}>Liste des messages</MenuItem>
            <MenuItem onTouchTap={this.handleCodes}>Gestion des codes</MenuItem>
          </LeftNav>
          <Snackbar
            style={styles.snackbar}
            open={this.props.snackbar.show}
            message={this.props.snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </MuiThemeProvider>
    )
  }
});

export default MessageList;

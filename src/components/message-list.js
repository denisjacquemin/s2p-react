import React, {Component} from 'react'

import Message from './message'
import Alert from './alert'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import s2pTheme from '../theme';

var Scroll    = require('react-scroll');
var scroll    = Scroll.animateScroll;

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import School from 'material-ui/svg-icons/social/school';
import MailOutline from 'material-ui/svg-icons/communication/mail-outline';
import People from 'material-ui/svg-icons/social/people';
import LinearProgress from 'material-ui/LinearProgress';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconMenu from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';


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
  },

  handleMessagesScreen: function(e) {
    this.setState({open: false});
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
        paddingTop: '0px',
        top: '0'
      },
      bottomBar: {
        position: 'fixed',
        bottom: '0',
        display: 'block',
        textAlign: 'center',
        webkitBoxShadow: '0 -7px 6px -6px #999',
        mozBoxShadow: '0 -7px 6px -6px #999',
        boxShadow: '0 -7px 6px -6px #999'
      },
      bottomBarButton: {
        width:'50%'
      },
      iconRefresh: {
        fill: '#ffffff',
        color: '#ffffff'
      },
      progress: {
        position: 'fixed',
        top: '64px',
        borderRadius: '0',
        zIndex: '100'
      },
      content: {
        position: 'absolute',
        top: '60px',
        width:  '100%',
        backgroundColor: '#dadada',
        paddingBottom: '60px'
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
        fontFamily: 'Roboto, sans-serif',
        WebkitFontSmoothing: 'antialiased'
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
      },
      icon: {
        display: 'block',
        /**
         * Used to ensure SVG icons are centered
         * https://github.com/callemall/material-ui/pull/4982/files
         */
        width: '100%'
      }
    };
    return styles;
  },

  render: function() {

    const styles = this.getStyles();

    let starIcon = <IconButton iconStyle={styles.iconRefresh} onTouchTap={this.toggleShowImportant}><StarBorder/></IconButton>
    if (this.props.showImportant) {
      starIcon = <IconButton  iconStyle={styles.iconRefresh} onTouchTap={this.toggleShowImportant}><Star/></IconButton>
    }

    let refreshIcon = <IconButton iconStyle={styles.iconRefresh} onTouchTap={this.handleRefresh}><NavigationRefresh /></IconButton>
    let progress
    if (this.props.isFetching) {
      refreshIcon = <IconButton iconStyle={styles.iconRefresh} onTouchTap={this.handleRefresh}><NavigationRefresh /></IconButton>
      progress = <LinearProgress id="progress" mode="indeterminate" style={styles.progress} color="#f44336" />
    }

    let emptyState
    console.log('this.props.messages.length' + this.props.messages.length)
    if (this.props.messages.length === 0) {
      emptyState = <div style={styles.emptyState} className="animated fadeIn content">
        <div>
          <MailOutline style={styles.mailOutline} />
          <p>Aucun message</p>
        </div>
      </div>
    }

    let messages
    if (typeof this.props.messages != "undefined" && this.props.messages != null && this.props.messages.length > 0) {
      messages = <div className="fade-in content" style={styles.content}>
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
    }

    return (
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        <div>
          <AppBar id="header" title="Messages"
            style={styles.appBar}
            showMenuIconButton={false}
            iconElementRight={
              <div >
                {refreshIcon}
              </div>
            }
          />
          {progress}
          {messages}
          {emptyState}
          <Snackbar
            style={styles.snackbar}
            open={this.props.snackbar.show}
            message={this.props.snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <BottomNavigation selectedIndex={0} style={styles.bottomBar}>
            <BottomNavigationItem
              icon=<MailOutline style={styles.icon} />
              onTouchTap={() => this.handleMessagesScreen()}
              label="Messages"
              style={styles.bottomBarButton}
            />
            <BottomNavigationItem
              icon=<People style={styles.icon} />
              label="Gestion codes"
              onTouchTap={() => this.handleCodes()}
              style={styles.bottomBarButton}
            />
          </BottomNavigation>
        </div>
      </MuiThemeProvider>
    )
  }
});


//onLeftIconButtonTouchTap={this.handleLeftMenu}
// <Drawer
//   docked={false}
//   width={200}
//   open={this.state.open}
//   onRequestChange={open => this.setState({ open })}
// >
//   <div style={styles.leftbarHeader}>
//     <img src="assets/img/logo_draw.png" width="45%"/><br />
//     <img src="assets/img/logo_text.png" width="35%"/>
//   </div>
//   <Menu>
//     <MenuItem onTouchTap={this.handleMessagesScreen} leftIcon={<MailOutline />}>Messages</MenuItem>
//     <MenuItem onTouchTap={this.handleCodes} leftIcon={<People/>}>Gestion codes</MenuItem>
//   </Menu>
// </Drawer>




export default MessageList;

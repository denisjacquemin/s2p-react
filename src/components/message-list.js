import React, {Component} from 'react'

import Message from './message'

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import s2pTheme from '../theme';


import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import Star from 'material-ui/lib/svg-icons/toggle/star';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import NavigationRefresh from 'material-ui/lib/svg-icons/navigation/refresh';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {Spacing} from 'material-ui/lib/styles';


const s2pMuiTheme = getMuiTheme(s2pTheme);

var MessageList = React.createClass( {

  getInitialState: function() {
    return { open: false };
  },

  componentWillMount: function() {
    this.props.fetchMessages()
  },

  componentDidMount: function() {
  },

  handleLeftMenu: function(e) {
    this.setState({open: !this.state.open});
    e.preventDefault();
  },

  handleLeftMenuClose: function(e) {
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
      content: {
        position: 'absolute',
        top: '60px'
      },
      loading: {
        display: 'inline-block',
      	textAlign: 'center',
      	opacity: '.4',
      	margin: '12px 0 0 5px'
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

    return (
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        <div>
          <AppBar id="header" title="App"
            style={styles.appBar}
            onLeftIconButtonTouchTap={this.handleLeftMenu}
            iconElementRight={
              <div >
                {starIcon}
                <IconButton iconStyle={styles.icon} onTouchTap={this.handleRefresh}><NavigationRefresh /></IconButton>
              </div>
            }
          />
          <List className="fade-in" style={styles.content}>
            {
              this.props.messages.map(message =>
                <ListItem key={message.id}
                  children=<Message message={message} onMessageClick={this.props.onMessageClick} />
                />
            )}
          </List>
          <LeftNav
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem onTouchTap={this.handleLeftMenuClose}>Liste des messages</MenuItem>
            <MenuItem onTouchTap={this.handleLeftMenuClose}>Infos importantes</MenuItem>
          </LeftNav>
        </div>
      </MuiThemeProvider>
    )
  }
});

export default MessageList;


// <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded is-small-screen">
//   <Header />
//   <Drawer />
//   <main className="mdl-layout__content">
//     <div className="mdl-grid">
//       {
//         this.props.messages.map(message =>
//           <Message
//             key={message.id}
//             {...message}
//             onMessageTap={() => this.props.onMessageClick(message.id)}
//           />
//       )}
//     </div>
//   </main>
// </div>

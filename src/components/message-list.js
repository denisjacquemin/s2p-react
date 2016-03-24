import React, {Component} from 'react'

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import ToggleStarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import NavigationRefresh from 'material-ui/lib/svg-icons/navigation/refresh';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import {Spacing} from 'material-ui/lib/styles';

import ReactPullToRefresh from 'react-pull-to-refresh'
import RefreshIndicator from 'material-ui/lib/refresh-indicator';



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
        top: 0,
        paddingTop: '10px'
      },
      icon: {
        fill: '#ffffff',
        color: '#ffffff'
      },
      root: {
        paddingTop: '80px',
        minHeight: 400
      },
      content: {
        margin: Spacing.desktopGutter,
      },
      card: {
        margin: '12px 8px'
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

    return (
      <div>
        <AppBar id="header" title="App"
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.handleLeftMenu}
          iconElementRight={
            <div >
              <IconButton iconStyle={styles.icon} onTouchTap={this.toggleShowImportant}><ToggleStarBorder/></IconButton>
              <IconButton iconStyle={styles.icon} onTouchTap={this.handleRefresh}><NavigationRefresh /></IconButton>
            </div>
          }
        />
        <div style={styles.root}>
          {
            this.props.messages.map(message =>
              <Card key={message.id} style={styles.card}>
                <CardTitle title={message.title} subtitle="Aujourd'hui" />
                <CardText>{ message.content }</CardText>
                <CardActions>
                  <FlatButton label="LA SUITE" onTouchTap={() => this.props.onMessageClick(message.id)}/>
                </CardActions>
              </Card>
          )}
        </div>
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

import React, {Component} from 'react'

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import IconButton from 'material-ui/lib/icon-button';
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


var MessageList = React.createClass( {

  getInitialState: function() {
    return { open: false };
  },

  componentWillMount: function() {
    console.log('MESSAGELIST ######### componentWillMount')
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

  getStyles: function() {
    const styles = {
      appBar: {
        position: 'fixed',
        top: 0,
        paddingTop: '10px'
      },
      root: {
        paddingTop: Spacing.desktopKeylineIncrement + 10,
        minHeight: 400,
      },
      content: {
        margin: Spacing.desktopGutter,
      },
      card: {
        margin: '12px 8px'
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
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }/>

        <div style={styles.root}>
          {
            this.props.messages.map(message =>
              <Card key={message.id} style={styles.card}>
                <CardTitle title={message.title} subtitle="Aujourd'hui" />
                <CardText>{ message.content }</CardText>
                <CardActions>
                  <FlatButton label="LA SUITE" onTouchTap={() => this.props.onMessageClick(message)}/>
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

import React, {Component} from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import s2pTheme from '../theme';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MailOutline from 'material-ui/svg-icons/communication/mail-outline';
import People from 'material-ui/svg-icons/social/people';
import Delete from 'material-ui/svg-icons/action/delete';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import {Card} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const s2pMuiTheme = getMuiTheme(s2pTheme);

var CodeListComponent = React.createClass( {

  getInitialState: function() {
    return { showAddCode: false, newCode: '' };
  },

  componentWillMount: function() {
    this.resetErrorMessage();
  },

  resetErrorMessage: function() {
    this.props.resetErrorMessage();
  },

  handleOnFocus: function(e) {
    this.resetErrorMessage();
  },

  // componentWillReceiveProps: function() {
  //   if (this.props.validCode) {
  //     this.resetErrorMessage()
  //     this.setState({showAddCode: false})
  //   } else {
  //     this.setState({showAddCode: true})
  //   }
  // },

  handleLeftMenu: function(e) {
    this.setState({open: !this.state.open});
    e.preventDefault();
  },

  handleLeftMenuClose: function(e) {
    this.setState({open: false});
    e.preventDefault();
  },

  handleCodes: function(e) {
    this.setState({open: false});
  },

  handleMessagesScreen: function(e) {
    this.props.showMessagesScreen()
    this.setState({open: false});
  },

  getStyles: function() {
    const styles = {
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
      progress: {
        position: 'absolute',
        top: '74px',
        borderRadius: '0'
      },
      snackbar: {
        fontFamily: 'Roboto, sans-serif',
        WebkitFontSmoothing: 'antialiased'
      },
      content: {
        position: 'absolute',
        top: '70px',
        width: '100%',
        paddingBottom: '60px'
      },
      add: {
        position: 'absolute',
        bottom: '80px',
        right: '25px'
      },
      form: {
        width:'100%',
        textAlign: 'center',
        padding: '40px 0 0 0'
      },
      formElem: {
        width:'70%',
        margin: '25px 0 0 0'
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
      people: {
        marginTop: '40%',
        height: '110px',
        width: '110px',
        fill: '#d0d0d0'
      },
      errorMessage: {
        margin: '5px 0 15px 0',
        color: '#F00'
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

  handleNewCodeChange: function(e) {
    this.setState({newCode: e.target.value})
    e.preventDefault()
  },
  handleAddCode: function(e) {
    this.resetErrorMessage();
    this.props.onAddCode(this.state.newCode);
    e.preventDefault()
  },
  handleShowAddCodeForm: function(e) {
    this.props.onShowAddCodeForm(true)
    e.preventDefault()
  },

  handleShowCodeListScreen: function(e) {
    this.resetErrorMessage()
    this.props.onShowAddCodeForm(false)
    e.preventDefault()
  },

  handleDeleteCode: function(code, e) {
    this.props.onDeleteCode(code);
    e.stopPropagation()
  },

  getAddCodeForm: function() {
    const styles = this.getStyles();
    return (
      <div>
        <AppBar id="header" title="Ajouter un code"
          className="appbar"
          iconElementLeft={<IconButton onTouchTap={this.handleShowCodeListScreen}><NavigationClose /></IconButton>}
        />
        <div className="fade-in content" style={styles.content}>
          <div style={styles.form}>
            <TextField hintText="Code" style={styles.formElem} autoCapitalize="none" autoCorrect="none" onChange={this.handleNewCodeChange} onFocus={this.handleOnFocus}/>
            <div style={styles.errorMessage}>{this.props.invalidCodeMessage}</div>
            <RaisedButton label="Enregistrer" style={styles.formElem} secondary={true}  onTouchTap={this.handleAddCode} />
          </div>
        </div>
      </div>
    )
  },

  getCodeList: function() {
    const styles = this.getStyles();

    let content
    if (this.props.codes.length === 0) {
      content = <div style={styles.emptyState} className="animated fadeIn content">
                  <div>
                    <People style={styles.people} />
                    <p>Aucun code</p>
                  </div>
                </div>
    } else {
      content = <div className="fade-in content" style={styles.content}>
                  <List>
                    {
                      this.props.codes.map(c =>
                        <ListItem
                          key={c.code}
                          primaryText={c.fullname}
                          secondaryText={
                            <p>
                              <span>{c.code} - {c.schoolname}</span>
                            </p>
                          }
                          rightIconButton={<IconButton onTouchTap={(e) => this.handleDeleteCode(c.code, e)}><Delete /></IconButton>}
                        />
                    )}
                  </List>
                </div>
    }

    return(
      <div>
        <AppBar id="header" title="Gestion des codes"
          className="appbar"
          showMenuIconButton={false}
        />
        {content}
        <FloatingActionButton style={styles.add} secondary={true} onTouchEnd={this.handleShowAddCodeForm}>
          <ContentAdd />
        </FloatingActionButton>
        <Snackbar
          className="snackbar"
          style={styles.snackbar}
          open={this.props.snackbar.show}
          message={this.props.snackbar.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <BottomNavigation selectedIndex={1} style={styles.bottomBar}>
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
    )
  },

  render: function() {
    const styles = this.getStyles();


    let body = this.getCodeList()
    console.log("this.props.showAddCodeForm: " + this.props.showAddCodeForm)
    if (this.props.showAddCodeForm) {
      body = this.getAddCodeForm()
    }

    return(
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        {body}
      </MuiThemeProvider>
    )
  }
});

export default CodeListComponent;

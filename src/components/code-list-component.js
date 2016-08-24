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

  componentDidMount: function() {
    try {
      window.analytics.trackView('Liste des Codes')
    } catch(e) {
      console.error(e);
    }
  },

  componentWillReceiveProps: function() {
    if (this.props.validCode) {
      this.resetErrorMessage()
      this.setState({showAddCode: false})
    }
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
    this.setState({open: false});
    e.preventDefault();
  },

  handleMessagesScreen: function(e) {
    this.props.showMessagesScreen()
    this.setState({open: false});
    e.preventDefault();
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
        width: '100%'
      },
      add: {
        position: 'absolute',
        bottom: '25px',
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
      }
    };
    return styles;
  },

  handleNewCodeChange: function(e) {
    this.setState({newCode: e.target.value})
    e.preventDefault()
  },
  handleAddCode: function(e) {
    this.props.onAddCode(this.state.newCode);
    e.preventDefault()
  },
  handleShowAddCodeForm: function(e) {
    this.setState({showAddCode: true})
    e.preventDefault()
  },

  handleShowCodeListScreen: function(e) {
    this.resetErrorMessage()
    this.setState({showAddCode: false})
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
        <AppBar title="Ajouter un code"
          style={styles.appBar}
          iconElementLeft={<IconButton onTouchTap={this.handleShowCodeListScreen}><NavigationClose /></IconButton>}
        />
        <div className="fade-in" style={styles.content}>
          <div style={styles.form}>
            <TextField hintText="Code" style={styles.formElem} ref="textfield" autoCapitalize="none" autoCorrect="none" onChange={this.handleNewCodeChange} onFocus={this.handleOnFocus}/>
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
      content = <div style={styles.emptyState} className="animated fadeIn">
                  <div>
                    <People style={styles.people} />
                    <p>Aucun code</p>
                  </div>
                </div>
    } else {
      content = <div className="fade-in" style={styles.content}>
                  <List>
                    {
                      this.props.codes.map(c =>
                        <ListItem
                          key={c.code}
                          primaryText={c.fullname}
                          secondaryText={
                            <p>
                              <span>{c.code}</span>
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
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.handleLeftMenu}
        />
        {content}
        <FloatingActionButton style={styles.add} secondary={true} onTouchEnd={this.handleShowAddCodeForm}>
          <ContentAdd />
        </FloatingActionButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <div style={styles.leftbarHeader}>
            <img src="assets/img/logo_draw.png" width="45%"/><br />
            <img src="assets/img/logo_text.png" width="35%"/>
          </div>
          <MenuItem onTouchTap={this.handleMessagesScreen} leftIcon={<MailOutline/>}> Messages</MenuItem>
          <MenuItem onTouchTap={this.handleCodes} leftIcon={<People/>}>Gestion codes</MenuItem>

        </Drawer>
        <Snackbar
          style={styles.snackbar}
          open={this.props.snackbar.show}
          message={this.props.snackbar.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  },

  render: function() {
    const styles = this.getStyles();


    let body = this.getCodeList()
    if (this.state.showAddCode) {
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

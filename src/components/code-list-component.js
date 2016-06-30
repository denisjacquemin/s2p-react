import React, {Component} from 'react'

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import s2pTheme from '../theme';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import People from 'material-ui/lib/svg-icons/social/people';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Card from 'material-ui/lib/card/card';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


const s2pMuiTheme = getMuiTheme(s2pTheme);

var CodeListComponent = React.createClass( {

  getInitialState: function() {
    return { showAddCode: false, newCode: '' };
  },

  componentDidMount: function() {
    window.analytics.trackView('Liste des Codes')
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
        height: '150px',
        backgroundColor: '#1976d2'
      },
      emptyState: {
        textAlign: 'center',
        width: '100%',
        fontFamily: 'Roboto, sans-serif',
        color: '#dddddd'
      },
      people: {
        marginTop: '40%',
        height: '110px',
        width: '110px',
        fill: '#dddddd'
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
    this.setState({ showAddCode: false })
    e.preventDefault()
  },
  handleShowAddCodeForm: function(e) {
    this.setState({showAddCode: true})
    e.preventDefault()
  },

  handleShowCodeListScreen: function(e) {
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
            <TextField hintText="Code" style={styles.formElem} ref="textfield" autoCapitalize="none" autoCorrect="none" onChange={this.handleNewCodeChange}/>
            <RaisedButton label="Enregistrer" style={styles.formElem} secondary={true}  onTouchTap={this.handleAddCode} />
          </div>
        </div>
      </div>
    )
  },

  getCodeList: function() {
    const styles = this.getStyles();

    let emptyState
    if (this.props.codes.length === 0) {
      emptyState = <div style={styles.emptyState}>
          <People style={styles.people} />
          <p>Aucun code</p>
        </div>
    }

    return(
      <div>
        <AppBar id="header" title="Gestion des codes"
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.handleLeftMenu}
        />
        <div className="fade-in" style={styles.content}>
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
          {emptyState}
        </div>
        <FloatingActionButton style={styles.add} secondary={true} onTouchEnd={this.handleShowAddCodeForm}>
          <ContentAdd />
        </FloatingActionButton>
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <div style={styles.leftbarHeader}></div>
          <MenuItem onTouchTap={this.handleMessagesScreen}>Liste des messages</MenuItem>
          <MenuItem onTouchTap={this.handleCodes}>Gestion des codes</MenuItem>

        </LeftNav>
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

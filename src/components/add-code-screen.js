import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import School from 'material-ui/svg-icons/social/school';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import s2pTheme from '../theme';


const s2pMuiTheme = getMuiTheme(s2pTheme);

var AddCodeScreen = React.createClass( {

  getCodeSaved: function () {

    const cardStyle = {
      margin: '70% 10% 20% 10%',
      padding: '0 0 5% 0'
    };

    const actionsStyle = {
      margin: '10% 0 0 0',
      textAlign: 'center'
    }

    const buttonYesStyle = {
      width: '30%'
    }

    const buttonNoStyle = {
      width: '30%',
      margin: '0 0 0 15%'
    }


    return (
      <Card style={cardStyle} className="animated fadeIn">
        <CardTitle title="Code Enregistré" />
        <CardText>
          Avez-vous un autre code à rentrer?
        </CardText>>
        <CardActions style={actionsStyle}>
          <RaisedButton style={buttonYesStyle}  label="Oui" onTouchTap={this.handleShowCodeForm} />
          <RaisedButton style={buttonNoStyle} label="Non" onTouchTap={this.handleShowMessagesScreen} secondary={true}/>
        </CardActions>
      </Card>
    )
  },

  getAddCodeForm: function() {

    const cardStyle = {
      //margin: '70% 10% 20% 10%',
      padding: '0 0 10% 0',
      bottom: '50px',
      position: 'absolute',
      width: '80%',
      margin: '0 10%'
    };

    const formStyle = {
      textAlign: 'center'
    };

    const fieldStyle = {
      margin: '20px 0 20% 0',
      width: '70%'
    };

    const buttonStyle = {
      width: '70%'
    };

    const schoolStyle ={
      marginTop: '40%',
      height: '110px',
      marginLeft: '20%',
      margingRight: '20%',
      width: '60%',
      fill: '#ffffff'
    };

    const logoContainerStyle = {
      textAlign: 'center',
      width: '100%',
      fontFamily: 'Roboto, sans-serif',
      color: '#dddddd'
    };

    return (
      <div>
        <div style={logoContainerStyle}>
          <div style={schoolStyle}>
            <img className="animated bounceInDown" src="assets/img/logo2x.png" width="100%"/>
          </div>
        </div>
        <Card style={cardStyle} ref="card" className="animated fadeIn">
          <CardTitle title="Entrez un code" subtitle="Le code fourni par l'école" />
          <div style={formStyle}>
            <TextField hintText="Code" style={fieldStyle} ref="textfield" autoCapitalize="none" autoCorrect="none" onFocus={this.handleOnFocus} onChange={this.handleNewCodeChange}/>
            <RaisedButton label="Enregistrer" secondary={true} style={buttonStyle} onTouchTap={this.handleAddCode} />
          </div>
        </Card>
      </div>
    )
  },

  getInitialState: function() {
    return { showCodeSaved: false, newCode: '' };
  },

  handleAddCode: function(code) {
    this.props.onAddCode(this.state.newCode);
    this.setState({ showCodeSaved: true })
  },

  handleNewCodeChange: function(e) {
    this.setState({newCode: e.target.value})
    if (e.target.value.length > 5) {
      console.log('Validate code') // si valide afficher le nom prenom de l'eleve et permetre de l'enregister
    }
  },

  handleShowCodeForm: function() {
    this.setState({ showCodeSaved: false })
  },

  handleShowMessagesScreen: function() {
    this.props.onShowMessagesScreen()
  },

  handleOnFocus: function(e) {
    console.log('focus ' +  e.target.style)
    this.refs.card.style = {backgroundColor: 'red'}
  },

  render: function() {

    let body = this.getAddCodeForm()
    if (this.state.showCodeSaved) {
      body = this.getCodeSaved()
    }


    return (
      <MuiThemeProvider muiTheme={s2pMuiTheme}>
        <div className="codes">
          {body}
        </div>
      </MuiThemeProvider>
    )
  }
});
export default AddCodeScreen;

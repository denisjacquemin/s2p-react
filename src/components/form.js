import React from 'react'
import fetch from 'isomorphic-fetch'


import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';


var Form = React.createClass( {

  getInitialState: function() {
      return {
        submitPlaceholder: 'button'
      }
  },

  updateSubmitPlaceHolder: function(status) {
    this.setState({submitPlaceholder: status})
  },

  handleSubmitForm: function(e) {
    e.preventDefault();
    if (this.state.form == undefined) {
        this.props.showSnackbar("Le formulaire n'est pas rempli.");
        return;
    }


    this.setState({submitPlaceholder: 'progress'})
    //this.props.onSubmitForm(this.state, this.props.muuid);
    console.log('submitting form')

    const showSnackbar = this.props.showSnackbar
    const updateSubmitPlaceHolder = this.updateSubmitPlaceHolder

    var formdata = []
    for (var key in this.state.form) {
      if (this.state.form.hasOwnProperty(key)) {
        if (Array.isArray(this.state.form[key])) {
          for (var i=0; i<this.state.form[key].length; i++) {
            formdata.push({
              name: key + '[]',
              value: this.state.form[key][i]['value'],
              label: this.state.form[key][i]['label']
            })
          }
        } else {
          formdata.push({
            name: key,
            value: this.state.form[key]['value'],
            label: this.state.form[key]['label']
          })
        }
      }
    }

    let data = new FormData()
    data.append('formdata', JSON.stringify(formdata))
    data.append('muuid', this.props.muuid)
    return fetch('HOST_API/saveform', {
      method: 'POST',
      body: data
    })
    .then(function(response) {
      if(response.ok) {
        console.log('save form ok')
        return response.json().then(function(json) {
          setTimeout(
            function(){
              showSnackbar('Le formulaire a bien été envoyé.')
              updateSubmitPlaceHolder('button')
            },
            2000
          )
        })
      } else {
        setTimeout(
          function(){
            showSnackbar("Le formulaire n'a pu être envoyé.")
            updateSubmitPlaceHolder('button')
          },
          1000
        )
      }
    })
    .catch(function(err) {
      //dispatch(handleFetchError())
      setTimeout(
        function(){
          showSnackbar('Pas de connexion.')
          updateSubmitPlaceHolder('button')
        },
        1000
      )
      console.log('Pas de connexion' + err);
    })



  },

  handleCheckboxChange: function(e, isInputChecked) {
    console.log('e.target.value: ' + e.target.value + ' for ' + e.target.name + ' value is: ' + isInputChecked)
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: {
          value: e.target.value,
          label: e.target.dataset['label']
        }

      }
    });
  },

  handleCheckboxGroupChange: function(e, isInputChecked) {
    console.log('e.target.value: ' + e.target.value + ' for ' + e.target.name + ' value is: ' + isInputChecked)
    let listOfCheckbox = []
    if (this.state.form != undefined && this.state.form[e.target.name] != undefined) {
      listOfCheckbox = this.state.form[e.target.name]
    }
    if (isInputChecked) {
      listOfCheckbox.push({
        value: e.target.dataset['value'],
        label: e.target.dataset['label']
      })
    } else {
      var index = -1
      for (var i = 0; i < listOfCheckbox.length; i++) {
         if (listOfCheckbox[i]['value'] == e.target.dataset['value']
              && listOfCheckbox[i]['label'] == e.target.dataset['label']) {
                  index = i;
                  break;
         }
      }
      if (index > -1) {
          listOfCheckbox.splice(index, 1);
      }
    }
    this.setState({
      form: {
          ...this.state.form,
          [e.target.name]: listOfCheckbox
      }
    });

  },

  handleTextChange: function(e, value) {
    console.log('Value changed for text ' + e.target.name + ' to ' + value)
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: {
          value: value,
          label: e.target.dataset['label']
        }
      }
    });
  },

  render: function() {

    const styles = {
      form: {
        margin: '0 20px',
      },
      text: {
        marginBottom: 17,
        paddingLeft: 10,
        width: '96%',
        borderLeft: '2px solid #006bb8',
      },
      textarea: {
        marginBottom: 17,
        paddingLeft: 10,
        width: '96%',
        borderLeft: '2px solid #006bb8',
      },
      checkbox: {
        marginBottom: 17,
        paddingLeft: 10,
        borderLeft: '2px solid #006bb8',
      },
      checkboxgroupcontainer: {
        marginBottom: 25,
        paddingLeft: 10,
        borderLeft: '2px solid #006bb8',
      },
      checkboxgroup: {
        marginBottom: 10,
        paddingLeft: 8,
      },
      paragraph: {
        margin: '20px 0',
      },
      button: {
        margin: '15px 0 30px 0',
        width: '100%',
      },
      submitPlaceholderContainer: {
        textAlign: 'center',
      },
    };


    let formRendered;
    if (this.props.formjson != undefined) {
      let formElements = []
      const formjson = JSON.parse(this.props.formjson);
      for (let i in formjson) {
         switch (formjson[i].type) {
           case 'text': {
             formElements.push(<TextField
                hintText=""
                floatingLabelText={formjson[i].label}
                floatingLabelFixed={true}
                style={styles.text}
                name={formjson[i].name}
                onChange={this.handleTextChange}
                data-label={formjson[i].label}
                fullWidth={true}
              />);
             break;
           }
           case 'textarea': {
             formElements.push(<TextField
                hintText=""
                floatingLabelText={formjson[i].label}
                floatingLabelFixed={true}
                multiLine={false}
                rows={2}
                style={styles.textarea}
                name={formjson[i].name}
                onChange={this.handleTextChange}
                data-label={formjson[i].label}
              />);
             break;
           }
           case 'checkbox': {
             formElements.push(<Checkbox
                label={formjson[i].label}
                style={styles.checkbox}
                name={formjson[i].name}
                onCheck={this.handleCheckboxChange}
                data-label={formjson[i].label}
                data-value={formjson[i].value}
              />);
             break;
           }
           case 'checkbox-group': {
            let checkboxGroup = []
            checkboxGroup.push(<h4>{formjson[i].label}</h4>)
            const options = formjson[i].values
            for (let j in options) {
              checkboxGroup.push(<Checkbox
                 label={options[j].label}
                 style={styles.checkboxgroup}
                 name={formjson[i].name}
                 onCheck={this.handleCheckboxGroupChange}
                 data-label={formjson[i].label}
                 data-value={options[j].value}
               />);
            }
            formElements.push(<div style={styles.checkboxgroupcontainer}>{checkboxGroup}</div>);
            break;
           }
           case 'paragraph': {
             formElements.push(<p style={styles.paragraph}>{formjson[i].label}</p>);
             break;
           }
         }
      }

      let submitPlaceholder
      if (this.state.submitPlaceholder == 'progress') {
        submitPlaceholder = <CircularProgress />
      } else {
        submitPlaceholder = <RaisedButton label="Envoyer" primary={true} style={styles.button} onTouchTap={this.handleSubmitForm}/>
      }

      formRendered = <form id="theForm">
        {formElements}
        <div style={styles.submitPlaceholderContainer}>{submitPlaceholder}</div>
      </form>
    }

    return (
      <div style={styles.form}>
        {formRendered}
      </div>
    )
  }
});

export default Form;

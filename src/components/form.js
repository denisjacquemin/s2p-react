import React from 'react'
import fetch from 'isomorphic-fetch'


import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import ActionDone from 'material-ui/svg-icons/action/done';
import Warning from 'material-ui/svg-icons/alert/warning'
import {List, ListItem} from 'material-ui/List';


var Form = React.createClass( {

  getInitialState: function() {
      return {
        submitPlaceholder: 'button',
        select: {}
      }
  },

  updateSubmitPlaceHolder: function(status) {
    this.setState({submitPlaceholder: status})
  },

  missingRequiredFields: function() {
    let missingField = false
    let requireds  = $('[data-required]');

    for (var i = 0; i < requireds.length; i++) {
      switch ($(requireds[i]).data('type')) {
        case 'checkbox-group':
          if ($(requireds[i]).find('input:checked').length == 0) {
            if ($(requireds[i]).find('.warning').length == 0) {
              $(requireds[i]).prepend('<div style="color:red;"class="warning">Ce champ est requis</div>')
            }
            missingField = true
          } else {
            $(requireds[i]).find('.warning').remove();
          }
          break;
        case 'text':
          if ($(requireds[i]).find('input').val() == undefined || $(requireds[i]).find('input').val() == "") {
            if ($(requireds[i]).find('.warning').length == 0) {
              $(requireds[i]).prepend('<div style="color:red;"class="warning">Ce champ est requis</div>')
            }
            missingField = true
          } else {
            $(requireds[i]).find('.warning').remove();
          }
          break;
        case 'textarea':
          if (this.state.form[$(requireds[i]).data('name')] == undefined || this.state.form[$(requireds[i]).data('name')].value == "") {
            if ($(requireds[i]).find('.warning').length == 0) {
              $(requireds[i]).prepend('<div style="color:red;"class="warning">Ce champ est requis</div>')
            }
            missingField = true
          } else {
            $(requireds[i]).find('.warning').remove();
          }
          break;
        case 'select':
          if (this.state.form[$(requireds[i]).data('name')] == undefined || this.state.form[$(requireds[i]).data('name')].value == null) {
            if ($(requireds[i]).find('.warning').length == 0) {
              $(requireds[i]).prepend('<div style="color:red;"class="warning">Ce champ est requis</div>')
            }
            missingField = true
          } else {
            $(requireds[i]).find('.warning').remove();
          }
          break;
      }
    }

    // if (this.state.form.hasOwnProperty(inputs))
    return missingField;
  },

  handleSubmitForm: function(e) {
    e.preventDefault();
    if (this.state.form == undefined) {
      $('#sendForm').addClass('animated shake');
      this.props.showSnackbar("Le formulaire n'est pas rempli.");
      setTimeout(function(){ $('#sendForm').removeClass('animated shake'); }, 3000);
      return;
    }

    if (this.missingRequiredFields()) {
      $('#sendForm').addClass('animated shake');
      this.props.showSnackbar("Un champ requis manquant");
      setTimeout(function(){ $('#sendForm').removeClass('animated shake'); }, 3000);
      return;
    }


    this.setState({submitPlaceholder: 'progress'})
    //this.props.onSubmitForm(this.state, this.props.muuid);
    console.log('submitting form')

    const showSnackbar = this.props.showSnackbar
    const updateSubmitPlaceHolder = this.updateSubmitPlaceHolder
    const fetchMessages = this.props.fetchMessages

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
    data.append('uuid', device.uuid)
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
              fetchMessages()
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

  handleSelectChange: function(name, e, index, value) {
    this.setState({
      form: {
        ...this.state.form,
        [name]: {
          value: value,
          label: $('#' + name).text()
        }
      }
    });

    this.setState({
      select: {
        ...this.state.select,
        [name]: value
      }
    });
  },

  getStyles: function() {
    const styles = {
      form: {
        margin: '0 20px',
      },
      h4: {
        marginTop: '0',
      },
      label: {
        fontWeight: 'bold'
      },
      text: {
        marginBottom: 17,
        paddingLeft: 10,
        width: '96%',
        borderLeft: '2px solid #006bb8',
      },
      select: {
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
    return styles;
  },

  render: function() {
    const styles = this.getStyles();

    // render form
    let formRendered;
    if (this.props.formjson != undefined && this.props.formjson != "[]") {
      let formElements = []
      let formSubmitted = []


      let formSubmittedList
      if (this.props.forms != undefined && this.props.forms.length > 0) {
        let formsSubmittedMessages = this.props.forms
        for (let i in formsSubmittedMessages) {
          formSubmitted.push(<ListItem primaryText="Formulaire envoyé" secondaryText={formsSubmittedMessages[i]} leftIcon={<ActionDone />} />)
        }


        if (formSubmitted != []) {
          formSubmittedList = <List>
            {formSubmitted}
          </List>
        }
      }

      const formjson = JSON.parse(this.props.formjson);
      for (let i in formjson) {
         switch (formjson[i].type) {
           case 'select': {
             let label = formjson[i].label;
             if (formjson[i].required) {
               label += ' *';
             }
             let options = [];
             options.push(<MenuItem value={null} primaryText="" />)
             for (let j = 0; j < formjson[i].values.length; j++) {
                options.push(<MenuItem value={formjson[i].values[j].value} primaryText={formjson[i].values[j].label} />)
             }
             formElements.push(<div style={styles.select} data-name={formjson[i].name} data-required={formjson[i].required} data-type="select">
               <label id={formjson[i].name} style={styles.label}>{label}</label>
                 <SelectField
                    value={this.state['select'][formjson[i].name]}
                    fullWidth={true}
                    maxHeight={150}
                    onChange={this.handleSelectChange.bind(this, formjson[i].name)}
                    className="select-field"
                    >
                    {options}
                 </SelectField>
             </div>);
             break;
           }
           case 'text': {
             let label = formjson[i].label;
             if (formjson[i].required) {
               label += ' *';
             }
             formElements.push(<div style={styles.text} data-label={formjson[i].label} data-required={formjson[i].required} data-type="text">
               <label style={styles.label}>{label}</label>
               <TextField
                  hintText=""
                  name={formjson[i].name}
                  onChange={this.handleTextChange}
                  data-label={formjson[i].label}
                  fullWidth={true}
                />
             </div>);
             break;
           }
           case 'textarea': {
             let label = formjson[i].label;
             if (formjson[i].required) {
               label += ' *';
             }
             formElements.push(
               <div style={styles.text} data-name={formjson[i].name} data-required={formjson[i].required} data-type="textarea">
                 <label style={styles.label}>{label}</label>
                   <TextField
                    hintText=""
                    multiLine={false} // false for ios true for android
                    rows={1} // 2 for android 1 for ios
                    name={formjson[i].name}
                    data-label={formjson[i].label}
                    onChange={this.handleTextChange}
                  />
               </div>);
             break;
           }
           case 'checkbox': {
             let label = formjson[i].label;
             formElements.push(<Checkbox
                label={label}
                style={styles.checkbox}
                name={formjson[i].name}
                onCheck={this.handleCheckboxChange}
                data-label={label}
                data-value={formjson[i].value}
              />);
             break;
           }
           case 'checkbox-group': {
              let label = formjson[i].label;
              if (formjson[i].required) {
                label += ' *';
              }
              let checkboxGroup = []
              checkboxGroup.push(<h4 style={styles.h4}>{label}</h4>)
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
              formElements.push(<div style={styles.checkboxgroupcontainer} data-required={formjson[i].required} data-name={formjson[i].name} data-type="checkbox-group">{checkboxGroup}</div>);
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
        submitPlaceholder = <RaisedButton id="sendForm" label="Envoyer" primary={true} style={styles.button} onTouchTap={this.handleSubmitForm}/>
      }

      formRendered = <form id="theForm">
        {formElements}
        {formSubmittedList}
        <div style={styles.submitPlaceholderContainer}>{submitPlaceholder}</div>
      </form>
    }
    // end render form

    return (
      <div style={styles.form}>
        {formRendered}
      </div>
    )
  }
});

export default Form;

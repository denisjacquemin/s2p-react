import React from 'react'


import VisibleMessageList from '../containers/visible-message-list'
import AddCode from '../containers/add-code'
import FullMessage from '../containers/full-message'
import CodeList from '../containers/code-list'

var AppComponent = React.createClass( {

  componentWillMount: function() {
    this.props.fetchMessages()
  },

  render: function() {
    console.log('this.props.currentScreen: ' + this.props.currentScreen)
    let screenToShow;
    switch (this.props.currentScreen) {
      case 'messages':
        screenToShow = <VisibleMessageList />;
        break;
      case 'full_message':
        screenToShow = <FullMessage />;
        break;
      case 'codes':
        screenToShow = <CodeList />;
        break;
      default:
        screenToShow = <AddCode />;
    };

    return (
      <div>
        {screenToShow}
      </div>
    )
  }
});

export default AppComponent;

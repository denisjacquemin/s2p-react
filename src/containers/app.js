import React, { Component } from 'react'
import { connect } from 'react-redux'
import VisibleMessageList from '../containers/visible-message-list'
import AddCode from './add-code'
import FullMessage from './full-message'

class App extends Component {
  componentWillMount() {
    console.log('App componentWillMount: ' + this.props.currentScreen)
  }

  componentDidUpdate() {
    console.log('App componentDidUpdate: ' + this.props.currentScreen)
  }

  render() {
    let screenToShow;
    switch (this.props.currentScreen) {
      case 'messages':
        screenToShow = <VisibleMessageList />;
        break;
      case 'full_message':
        screenToShow = <FullMessage />;
        break;
      default:
        screenToShow = <AddCode />;
    };


    // console.log('App render: ' + this.props.currentScreen);
    //
    // if (this.props.currentScreen === 'messages') {
    //   screenToShow = <VisibleMessageList />
    // }
    return (
      <div>
        {screenToShow}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentScreen: state.currentScreen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onShowMessagesScreen: () => {
      dispatch(showMessagesScreen())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

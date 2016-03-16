import React, { Component } from 'react'
import { connect } from 'react-redux'
import VisibleMessageList from '../containers/visible-message-list'
import AddCode from './add-code'


class App extends Component {
  componentWillMount() {
    console.log('App componentWillMount: ' + this.props.currentScreen)
  }

  componentDidUpdate() {
    console.log('App componentDidUpdate: ' + this.props.currentScreen)
  }

  render() {
    console.log('App render: ' + this.props.currentScreen);
    let screenToShow = <AddCode />
    if (this.props.currentScreen === 'messages') {
      screenToShow = <VisibleMessageList />
    }
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

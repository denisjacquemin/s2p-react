import React, { Component } from 'react'
import { connect } from 'react-redux'
import VisibleMessageList from '../containers/visible-message-list'
import AddCode from './add-code'
import { fetchMessages } from '../actions'


class App extends Component {
  componentWillMount() {
    if (this.props.current_screen === 'messages') {
      let params = {}
      this.props.store.dispatch(fetchMessages(params)).then(() =>
        console.log(this.props.getState())
      )
    }
  }

  render() {
    console.log('App.render' + this.props.currentScreen);
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

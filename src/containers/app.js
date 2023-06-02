import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hideSnackbar, fetchMessages, resetIsFetching, resetCodesOnServer} from '../actions'
import AppComponent from '../components/app-component'
import { Device } from "@capacitor/device";



const getVisibleMessages = (messages = [], showOnlyImportant) => {
  if (showOnlyImportant) {
    return messages.filter(m => m.important)
  }
  return messages
}

const mapStateToProps = (state) => {
  return {
    currentScreen: state.currentScreen,
    currentMessage: state.currentMessage.id,
    messages: getVisibleMessages(
      state.messages.items,
      state.showOnlyImportant
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: () => {
      dispatch(resetIsFetching());
      dispatch(hideSnackbar());
      dispatch(fetchMessages());
    },
    resetCodesOnServer: () => {
      Device.getId().then((deviceId) => {
        dispatch(resetCodesOnServer(deviceId.identifier));
      });

      
    }
  };
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;

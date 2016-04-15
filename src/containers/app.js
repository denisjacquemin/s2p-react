import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hideSnackbar, fetchMessages, resetIsFetching} from '../actions'
import AppComponent from '../components/app-component'


const mapStateToProps = (state) => {
  return {
    currentScreen: state.currentScreen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: () => {
      dispatch(resetIsFetching());
      dispatch(hideSnackbar());
      dispatch(fetchMessages());
    }
  };
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;

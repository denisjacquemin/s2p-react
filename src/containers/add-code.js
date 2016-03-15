import React from 'react'
import { connect } from 'react-redux'
import { addCode, showModal } from '../actions'

import AddCodeForm from '../components/add-code-form'

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCode: (code) => {
      dispatch(addCode(code))
      dispatch(showModal('Voulez vous entrer un autre Code?'))
    }
  };
};

const AddCode = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCodeForm);

export default AddCode;

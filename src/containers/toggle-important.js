import React from 'react'
import { connect } from 'react-redux'
import { toggleShowImportant } from '../actions'
import Switch from '../components/switch'


const mapStateToProps = (state) => {
  return {
    active: state.showOnlyImportant
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => {
      dispatch(toggleShowImportant())
    }
  };
};

const ToggleImportant = connect(
  mapStateToProps,
  mapDispatchToProps
)(Switch);

// class ToggleImportant extends React.Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }
//
//   componentWilllUnmount() {
//     this.unsubscribe()
//   }
//
//   render() {
//     const { store } = this.context;
//     const state = store.getState();
//
//     return (
//       <Switch
//         active = {store.showOnlyImportant}
//         onClick = {() =>
//           store.dispatch({
//             type: 'TOGGLE_IMPORTANT'
//           })
//         }
//       />
//     )
//
//   }
// }
// ToggleImportant.contextTypes = {
//   store: React.PropTypes.object
// };
export default ToggleImportant;

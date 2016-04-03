import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';


export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#1976d2', //Colors.blue700,
    primary2Color: '#0d47a1', //Colors.blue700,
    primary3Color: 'rgba(0, 0, 0, 0.54)', //Colors.lightBlack,
    accent1Color: '#ce93d8', //Colors.purple200,
    accent2Color: '#f5f5f5', //Colors.grey100,
    accent3Color: '#9e9e9e', //Colors.grey500,
    textColor: 'rgba(0, 0, 0, 0.87)', //Colors.darkBlack,
    alternateTextColor: '#ffffff', //Colors.white,
    canvasColor: '#ffffff', //Colors.white,
    borderColor: '#e0e0e0', //Colors.grey300,
    disabledColor: ColorManipulator.fade('rgba(0, 0, 0, 0.87)', 0.3), //Colors.darkBlack
    pickerHeaderColor: '#f44336', //Colors.red500,
  }
};

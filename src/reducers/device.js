const initialDeviceState = {}


const currentDevice = (state = initialDeviceState, action) => {
  switch (action.type) {
    case 'SAVE_DEVICE_TOKEN':
      return { token: action.token}
      break;
    default:
      return state;
  }
};

export default currentDevice

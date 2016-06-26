const initialDeviceState = {}


const currentDevice = (state = initialDeviceState, action) => {
  switch (action.type) {
    case 'SAVE_REGISTRATION_ID':
      return {
        registrationId: action.registrationId,
        uuid: action.uuid
      }
      break;
    default:
      return state;
  }
};

export default currentDevice

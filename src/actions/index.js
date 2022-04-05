import fetch from "isomorphic-fetch";
import moment from "moment";

import { Device } from "@capacitor/device";
import CommunicationStayPrimaryLandscape from "material-ui/svg-icons/communication/stay-primary-landscape";

export const showFullMessage = (id) => {
  return {
    type: "SHOW_FULL_MESSAGE",
    id: id,
  };
};

export const saveCurrentScrollPositionY = () => {
  var currentPositionY = function () {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
    return supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
  };
  return {
    type: "SAVE_CURRENT_POSITIONY",
    currentScrollPositionY: currentPositionY(),
  };
};

export const toggleShowImportant = () => {
  return {
    type: "TOGGLE_SHOW_IMPORTANT",
  };
};

export const toggleImportant = (message_id) => {
  return {
    type: "TOGGLE_IMPORTANT",
    id: message_id,
  };
};

export const requestMessages = (params = {}) => {
  return {
    type: "REQUEST_MESSAGES",
  };
};

export const receiveMessages = (json) => {
  return {
    type: "RECEIVE_MESSAGES",
    messages: json,
    receivedAt: moment().utc().format("YYYY-MM-DD [[]HH:mm:ss[]]"), // now(UTC) yyyy-mm-dd [hh:mm:ss]
  };
};

export const handleFetchError = () => {
  return {
    type: "HANDLE_REQUEST_MESSAGES_ERROR",
  };
};

export const resetIsFetching = () => {
  return {
    type: "RESET_IS_FETCHING",
  };
};

export const messageViewedAnalytics = (mid, sid, uuid) => {
  return function (dispatch, getState) {
    return fetch(
      "HOST_ANALYTICS_API/v1/messages/mobileview?uuid=" +
        uuid +
        "&sid=" +
        sid +
        "&mid=" +
        mid,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          console.log("fetch response ok");
          return response.json().then(function (json) {});
        } else {
          console.log("fetch response not ok, reset messages.isFetching");
          // nothing to display to user if request failed, just analytics request
        }
      })
      .catch(function (err) {
        console.debug("messageViewedAnalytics:" + err);
      });
  };
};

export const resetCodesOnServer = (uuid) => {
  return function (dispatch, getState) {
    return fetch("HOST_API/resetcodeonserver/?uuid=" + uuid, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          console.log("fetch response ok");
          return response.json().then(function (json) {});
        } else {
          console.log("fetch response not ok, reset messages.isFetching");
          dispatch(handleFetchError());
        }
      })
      .catch(function (err) {
        console.debug("resetCodesOnServer:" + err);
        dispatch(handleFetchError());
        dispatch(showSnackbar("Pas de connexion"));
        console.log("Pas de connexion (resetCodesOnServer)" + err);
      });
  };
};

// export const submitForm = (state, muuid) => {
//
//   console.log('In actions.submitform');
//   var formdata = []
//   for (var key in state) {
//     if (state.hasOwnProperty(key)) {
//       if (Array.isArray(state[key])) {
//         for (var i=0; i<state[key].length; i++) {
//           formdata.push({
//             name: key + '[]',
//             value: state[key][i]['value'],
//             label: state[key][i]['label']
//           })
//         }
//       } else {
//         formdata.push({
//           name: key,
//           value: state[key]['value'],
//           label: state[key]['label']
//         })
//       }
//     }
//   }
//   console.log('formdata: ' + JSON.stringify(formdata));
//
//   return function (dispatch, getState) {
//     // check if another fetch request is still in progress
//
//     var data = new FormData()
//     data.append('formdata', JSON.stringify(formdata))
//     data.append('muuid', muuid)
//     data.append('uuid', device.uuid)
//     return fetch('HOST_API/saveform', {
//       method: 'POST',
//       body: data
//     })
//     .then(function(response) {
//       if(response.ok) {
//         console.log('save form ok')
//         return response.json().then(function(json) {
//           setTimeout(
//             function(){ dispatch(showSnackbar('Le formulaire a bien été enregistré')) },
//             2000
//           )
//
//         })
//       } else {
//         dispatch(showSnackbar("Le formulaire n'a pu être enregistré"))
//         //dispatch(handleFetchError())
//       }
//     })
//     .catch(function(err) {
//       //dispatch(handleFetchError())
//       dispatch(showSnackbar('Pas de connexion'))
//       console.log('Pas de connexion (fetchMessages)' + err);
//     })
//
//   }
//
//
//
// }

export const syncCodesFromDevice = (uuid, codes) => {
  return function (dispatch, getState) {
    // var params = "uuid=" + device.uuid
    // for(let c of codes) {
    //   params += '&codes[]=' + c.code
    // }

    let params = "?uuid=" + uuid;
    for (let code of codes) {
      params += "&codes[]=" + code;
    }

    return fetch("HOST_API/synccodesfromdevice" + params, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          console.log("syncCodesFromDevice fetch response ok");
          return response.json().then(function (json) {
            // dispatch(receiveSyncCodes(json))
          });
        } else {
          console.log("syncCodesFromDevice fetch response not ok");
        }
      })
      .catch(function (err) {
        console.log(
          "syncCodesFromDevice - pas de connexion (fetchMessages)" + err
        );
      });

    console.log("In syncCodesFromDevice");
  };
};

export const fetchMessagesAndShowFullMessage = (showFullMessageId = 0) => {
  return function (dispatch, getState) {
    dispatch(fetchMessages()).then(() => {
      dispatch(showFullMessage(showFullMessageId));
    });
  };
};

export const fetchMessages = () => {
  return function (dispatch, getState) {
    // check if another fetch request is still in progress
    const { codes, messages } = getState();
    if (!messages.isFetching) {
      dispatch(requestMessages());

      let lastUpdate = messages.lastUpdate;
      if (lastUpdate === undefined) {
        lastUpdate = moment().utc().format("YYYY-MM-DD [[]HH:mm:ss[]]"); // now(UTC) yyyy-mm-dd [hh:mm:ss]
      }
      Device.getId().then((deviceId) => {
        console.log("In FetchMessages before deviceId");
        console.log("deviceId.uuid: " + deviceId.uuid);
        let params = "?uuid=" + deviceId.uuid;
        for (let c of codes) {
          params += "&codes[]=" + c.code;
        }

        return fetch("HOST_API/messages" + params, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.ok) {
              console.log("fetch response ok");
              return response.json().then(function (json) {
                dispatch(receiveMessages(json));
              });
            } else {
              console.log("fetch response not ok, reset messages.isFetching");
              dispatch(handleFetchError());
            }
          })
          .catch(function (err) {
            dispatch(handleFetchError());
            dispatch(showSnackbar("Pas de connexion"));
            console.log("Pas de connexion (fetchMessages)" + err);
          });
      });
    }
  };
};

export const deleteCode = (code) => {
  return {
    type: "DELETE_CODE",
    code: code,
  };
};

export const addCode = (code) => {
  return function (dispatch, getState) {
    // https://s2p-api-prod.herokuapp.com
    try {
      fetch("HOST_API/getfullnamebycode/" + code, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response.ok) {
            console.log("fetch response ok");
            response
              .json()
              .then(function (json) {
                if (json.fullname == "notfound") {
                  dispatch(codeValid(false));
                  dispatch(codeInvalidMessage("Code invalide"));
                } else {
                  dispatch(codeValid(true));
                  dispatch(showAddCodeForm(false));
                  Device.getInfo().then((deviceInfo) => {
                    Device.getId().then((deviceId) => {
                      dispatch(
                        linkCodeToDevice(
                          code,
                          deviceId.uuid,
                          deviceInfo.platform
                        )
                      );
                    });
                  });
                  dispatch(receiveFullnameByCode(json));
                }
              })
              .catch(function (err) {
                console.log("response.json() error: " + err);
              });
          } else {
            console.log("fetch response not ok, reset messages.isFetching");
            dispatch(codeValid(false));
            dispatch(handleFetchError());
          }
        })
        .catch(function (err) {
          dispatch(codeValid(false));
          dispatch(handleFetchError());
          dispatch(codeInvalidMessage("Pas de connexion"));
          console.log("Pas de connexion (addCode)" + err);
        });
    } catch (err) {
      console.log("addCode arror catched" + err);
    }
  };
};

export const codeInvalidMessage = (message) => {
  return {
    type: "CODE_INVALID_MESSAGE",
    message: message,
  };
};

export const showAddCodeForm = (value) => {
  return {
    type: "SHOW_ADD_CODE_FORM",
    showAddCodeForm: value,
  };
};

export const codeValid = (value) => {
  return {
    type: "CODE_VALID",
    isCodeValid: value,
  };
};

export const receiveFullnameByCode = (json) => {
  return {
    type: "ADD_CODE",
    fullname: json.fullname,
    code: json.code,
    schoolname: json.schoolname,
    receivedAt: moment().utc().format("YYYY-MM-DD [[]HH:mm:ss[]]"), // now(UTC) yyyy-mm-dd [hh:mm:ss]
  };
};

export const showCodeSaved = () => {
  return {
    type: "SHOW_CODE_SAVED",
  };
};

export const showCodeList = () => {
  return {
    type: "SHOW_CODE_LIST",
  };
};

export const showMessagesScreen = () => {
  return {
    type: "SHOW_MESSAGES_SCREEN",
  };
};

export const showSnackbar = (message) => {
  return {
    type: "SHOW_SNACKBAR",
    message: message,
  };
};

export const hideSnackbar = () => {
  return {
    type: "HIDE_SNACKBAR",
  };
};

// export const saveDeviceToken = (token) => {
//   return {
//     type: 'SAVE_DEVICE_TOKEN',
//     token: token
//   }
// }

export const saveRegistrationId = (registrationId, uuid) => {
  return {
    type: "SAVE_REGISTRATION_ID",
    registrationId: registrationId,
    uuid: uuid,
  };
};

export const saveDeviceStateToServer = (
  registrationId,
  uuid,
  platform,
  codes
) => {
  return function (dispatch, getState) {
    const { device } = getState();

    let params =
      "?rid=" + registrationId + "&uuid=" + uuid + "&platform=" + platform;
    for (let code of codes) {
      params += "&codes[]=" + code;
    }

    return fetch("HOST_API/savedevicestatetoserver" + params, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          console.log("fetch response ok");
          return response.json().then(function (json) {});
        } else {
          console.log("saveDeviceStateToServer fetch response not ok");
          dispatch(handleFetchError());
        }
      })
      .catch(function (err) {
        console.debug("saveDeviceStateToServer:" + err);
        //dispatch(handleFetchError())
        //dispatch(showSnackbar('Pas de connexion'))
        console.log("Pas de connexion (saveDeviceStateToServer)" + err);
      });
  };
};

export const saveRegistrationIdToServer = (registrationId, uuid, platform) => {
  return function (dispatch, getState) {
    const { device } = getState();

    return fetch(
      "HOST_API/saveregistrationid/?rid=" +
        registrationId +
        "&uuid=" +
        uuid +
        "&platform=" +
        platform,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          console.log("fetch response ok");
          return response.json().then(function (json) {});
        } else {
          console.log("fetch response not ok, reset messages.isFetching");
          dispatch(handleFetchError());
        }
      })
      .catch(function (err) {
        console.debug("saveRegistrationIdToServer:" + err);
        dispatch(handleFetchError());
        dispatch(showSnackbar("Pas de connexion"));
        console.log("Pas de connexion (saveRegistrationIdToServer)" + err);
      });
  };
};

export const linkCodeToDevice = (code, uuid, platform) => {
  return function (dispatch, getState) {
    const { device } = getState();

    return fetch(
      "HOST_API/linkcodetodevice/?uuid=" +
        uuid +
        "&code=" +
        code +
        "&platform=" +
        platform,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          console.log("linkCodeToDevice response ok");
          return true;
        } else {
          console.log("linkCodeToDevice response not ok");
          dispatch(handleFetchError());
        }
      })
      .catch(function (err) {
        dispatch(handleFetchError());
        dispatch(showSnackbar("Pas de connexion"));
        console.log("Pas de connexion (linkCodeToDevice)" + err);
      });
  };
};

export const enableDeviceNotification = (uuid, platform) => {
  return function (dispatch, getState) {
    const { device } = getState();
    return fetch(
      "HOST_API/enabledevicenotifictation/?uuid=" +
        uuid +
        "&platform=" +
        platform,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          console.log("fetch response ok");
          return response.json().then(function (json) {});
        } else {
          console.log("fetch response not ok, reset messages.isFetching");
          dispatch(handleFetchError());
        }
      })
      .catch(function (err) {
        dispatch(handleFetchError());
        dispatch(showSnackbar("Pas de connexion"));
        console.log("Pas de connexion (enableDeviceNotification)" + err);
      });
  };
};

export const disableDeviceNotification = (uuid, platform) => {
  return function (dispatch, getState) {
    const { device } = getState();
    return fetch(
      "HOST_API/disabledevicenotifictation/?uuid=" +
        uuid +
        "&platform=" +
        platform,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          console.log("fetch response ok");
          return response.json().then(function (json) {});
        } else {
          console.log("fetch response not ok, reset messages.isFetching");
          dispatch(handleFetchError());
        }
      })
      .catch(function (err) {
        dispatch(handleFetchError());
        dispatch(showSnackbar("Pas de connexion"));
        console.log("Pas de connexion (disableDeviceNotification)" + err);
      });
  };
};

export const unlinkCodeToDevice = (code, uuid) => {
  return function (dispatch, getState) {
    const { device } = getState();
    return fetch(
      "HOST_API/unlinkcodetodevice/?uuid=" + uuid + "&code=" + code,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          console.log("unlinkCodeToDevice response ok");
          return true;
        } else {
          console.log("unlinkCodeToDevice response not ok");
          dispatch(handleFetchError());
        }
      })
      .catch(function (err) {
        dispatch(handleFetchError());
        dispatch(showSnackbar("Pas de connexion"));
        console.log("Pas de connexion (unlinkCodeToDevice)" + err);
      });
  };
};

function timeout(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(reject, duration);
  });
}

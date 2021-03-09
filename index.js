import * as axios from 'axios';
import React from 'react';
import { AppRegistry } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import SendSMS from 'react-native-sms-x';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';

const MyHeadlessTask = async () => {
  axios
    .get('http://dummy.restapiexample.com/api/v1/employees')
    .then((res) => {
      console.log(res.data.status, res.data.data.length);

      check(PERMISSIONS.ANDROID.SEND_SMS)
        .then((result) => {
          const sensSMS = () =>
            SendSMS.send(
              123,
              '+40742644552',
              `${res.data.stats}: ${res.data.data.length}`,
              (msg) => console.log(msg)
            );
          switch (result) {
            case RESULTS.GRANTED:
              sensSMS();
              console.log(RESULTS.GRANTED);
              break;
            default:
              request(PERMISSIONS.ANDROID.SEND_SMS)
                .then((result) => {
                  switch (result) {
                    case RESULTS.GRANTED:
                      sensSMS();
                      break;
                    default:
                      console.log(
                        `Permission to send and read sms denied`,
                        result
                      );
                      break;
                  }
                })
                .catch((err) => console.error(err));
              break;
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));

  console.log(`Receiving HeartBeat! ${new Date().getSeconds()}`);

  // send sms to +40742644552
  store.dispatch(setHeartBeat(true));
  setTimeout(() => {
    store.dispatch(setHeartBeat(false));
  }, 1000);
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);

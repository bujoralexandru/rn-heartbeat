import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import { setPhoneNumber, startService, stopService, store } from './store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10
  },
  text: {
    fontSize: 20,
    color: 'white'
  }
});

const App = ({ isServiceRunning, phoneNumber }) => {
  const buttonText = isServiceRunning ? 'Stop' : 'Start';
  const toggleService = () => {
    switch (isServiceRunning) {
      case true:
        Heartbeat.stopService();
        store.dispatch(stopService());
        break;
      case false:
        if (!phoneNumber) {
          return;
        }

        Heartbeat.startService();
        store.dispatch(startService());
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <PhoneInput
          defaultCode='RO'
          layout='first'
          onChangeFormattedText={(text) => {
            store.dispatch(setPhoneNumber(text));
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <TouchableOpacity style={styles.button} onPress={toggleService}>
          <Text style={styles.instructions}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  isServiceRunning: store.App.isServiceRunning,
  phoneNumber: store.App.phoneNumber
});

export default connect(mapStateToProps)(App);

/**
 * @flow
*/

import React, { Component } from 'react';
import Instructions, {Instruction} from './components/Instructions';
import SignUp from './components/SignUp';
import {
  Platform,
  View,
  StyleSheet,
  Text,
} from 'react-native';


export default class App extends Component<{}> {
  render() {
    return (
      <View>
          <Text> Form </Text>
          <SignUp/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

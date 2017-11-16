/**
 * @flow
*/

import React, { Component } from 'react';
import Instructions, {Instruction} from './components/Instructions';
import Form from './components/Form';
import Welcome from './components/Welcome';

import {
  Platform,
  View,
  StyleSheet,
  Text,
} from 'react-native';


export default class App extends Component<{}> {
  constructor() {
    super();
    
    this.state = {
      currentView: '',
    }
  }
  
  updateView = (currentView) => {
    this.setState({currentView});
  }
  
  render() {
    console.log(this.state);
    let comp = !this.state.currentView ? <Welcome viewUpdate={this.updateView} /> : <Form signin={this.state.currentView === 'signin'}/>
    return (
      <View style={styles.container}>
        {comp}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#607D8B',
    flexDirection: 'row'
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

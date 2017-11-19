/**
 * @flow
*/

import React, { Component } from 'react';
import Instructions, {Instruction} from './components/Instructions';
import Form from './components/Form';
import Welcome from './components/Welcome';
import Router from './components/Router';

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
    this.router = new Router();
    /* only have a few views so will manage toggling by self w/o router*/
  }
  
  updateView = (currentView) => {
    this.router.addPage( currentView );
    this.setState({currentView});
  }
  
  goBack = () => {
    this.router.back();
    let currentView = this.router.currentPage;
    this.setState({currentView});
  }
    
  renderView() {
    // do rendering stuff here
    //switch case based on view
  }
 
  render() {
    console.log(this.state);
    let comp = !this.state.currentView ? <Welcome viewUpdate={this.updateView} /> 
            : <Form signin={this.state.currentView === 'signin'} goBack={this.goBack}/>
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

/**
 * @flow
*/

import React, { Component } from 'react';
import Instructions, {Instruction} from './components/Instructions';
import Form from './components/Form';
import Welcome from './components/Welcome';
import Router from './components/Router';
import Marks from './components/Marks';

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
    console.log('currentView', currentView);
    this.setState({currentView});
  }


  forceUpdate = (currentView) => {
    this.router.clear();
    this.setState({ currentView });
  }
  
  goBack = () => {
    this.router.back();
    let currentView = this.router.currentPage;
    this.setState({currentView});
  }
    
  renderView() {
    // do rendering stuff here
    //switch case based on view
    console.log('current', this.state.currentView);
    switch(this.state.currentView) {
      case 'signin':
      case 'signup':
        return <Form signin={this.state.currentView === 'signin'} goBack={this.goBack} update={this.forceUpdate}/>
      case 'marks':
        return <Marks/>
      default:
        return <Welcome viewUpdate={this.updateView} />
    }
  }
 
  render() {
    let comp = !this.state.currentView ? <Welcome viewUpdate={this.updateView} /> 
            : <Form signin={this.state.currentView === 'signin'} goBack={this.goBack} update={this.forceUpdate}/>
    return (
      <View style={styles.container}>
        {this.renderView()}
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

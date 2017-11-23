/**
 * @flow
*/

import React, { Component } from 'react';
import Instructions, {Instruction} from './components/Instructions';
import Form from './components/Form';
import Welcome from './components/Welcome';
import Router from './components/Router';
import Marks from './components/Marks';
import Mark from './components/MarkForm';

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
    //add in ability to store props
    this.setState({currentView});
  }


  forceUpdate = (currentView,props, clear = false) => {
    if (clear) {
      this.router.clear();
    }
    console.log('props in add', props);
    this.router.addPage(currentView);
    this.router.addProps(currentView, props);
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
    let props = this.router.currentPageWithProps;
    console.log('props', props);
    switch(this.state.currentView) {
      case 'signin':
      case 'signup':
        return <Form signin={this.state.currentView === 'signin'} goBack={this.goBack} update={this.forceUpdate} {...props} />
      case 'marks':
        return <Marks update={this.forceUpdate} {...props} />
      case 'mark':
        return <Mark back={this.goBack} update={this.forceUpdate} {...props} />
      default:
        return <Welcome viewUpdate={this.updateView} />
    }
  }
 
  render() {
  console.log('current' ,this.state.currentView, this.router.currentPage);
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

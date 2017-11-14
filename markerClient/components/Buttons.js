import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class Button extends Component {
  render() {
    /* generic button base */
  }  
}


let styles = StyleSheet.create({
  base: {
    height: 50;
    textDecoration: 'none';
    textAlign: 'center';
    verticalAlign: 'middle';
    backgroundImage: 'none';  
    display: 'inline-block';
    padding: 12 30;
    fontSize: 21;
    fontWeight: 'bold';
    borderRadius: 4;
  }
});

import React, { Component } from 'react';

import {
  Button,
  Text,
  View,
  StyleSheet
} from 'react-native';


export default class extends Component {
  render() {
    return (
      <Button
        color="#FFF"
        title={this.props.title}
        onPress={this.props.onClick}
      />
    )
  }
}


import React, { Component } from 'react';
import { get, getFromStorage } from './request';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage,
} from 'react-native';

import BaseButton from './Button';
/*
  author,
  name,
  location -> can be page number, website, etc,
  notes,
  kleft to do: mamke this mark form, single park view,
  then make maks view with all the marks
*/
export default class extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      author: props.defaultAuthor || '',
      name: props.defaultName || '',
      location: props.defaultLocation || '',
      notes: props.defaultNotes || ''
    }
  }
  
  render() {
    return (
      <View>
        <BaseButton title="Back" onClick={this.props.back}/>
        {Object.keys(this.state).map(elem => (
          <View>
            <TextInput 
              style={styles.inputStyle} 
              onChangeText={(elem) => {
                this.setState({elem});
              }}
              value={this.state[elem]}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
            /> 
          </View>
        ))}
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 30, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput
} from 'react-native';

import BaseButton from './Button';

export default class extends Component {

  constructor() {
    super();
    this.state = { text:'', password: ''} 
  }
  
  render() {
    console.log('props', this.props);
    let button = this.props.signin ? <BaseButton title="sign in" onClick={() => console.log( 'sign in ')} /> : <BaseButton title="sign up" onClick={() => console.log('up')} />
    return (
      <View>
        <View>
          <TextInput 
            style={{height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => {
              this.setState({text})
              }}
            value={this.state.text}
            placeholder='Email'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
          />
        </View>
        <View>
          <TextInput
            style={{height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(password) => {
              this.setState({password});
            }}
            autoCapitalize='none'   
            autoCorrect={false}   
            placeholder='Password'
            secureTextEntry={true}
          />
        </View>
        {button} 
      </View>
    )
  }
}


const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

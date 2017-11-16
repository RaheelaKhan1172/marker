import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput
} from 'react-native';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = { text:'', password: ''} 
  }
  
  render() {
    console.log('email', this.state.text);
    console.log('password', this.state.password);
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
      </View>
    )
  }
}


const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

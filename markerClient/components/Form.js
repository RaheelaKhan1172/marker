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
    let { goBack } = this.props;
    let button = this.props.signin ? <BaseButton title="Sign In" onClick={() => console.log( 'sign in ')} /> :
                                     <BaseButton title="Sign Up" onClick={() => console.log('up')} />
    return (
      <View>
        <BaseButton title="Back" onClick={goBack}/>
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

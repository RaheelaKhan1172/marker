import React, { Component } from 'react';
import { post } from './request';
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
    let button = this.props.signin ? <BaseButton title="Sign In" onClick={() => {
                                        post('http://127.0.0.1:5000/token', {username: this.state.text, password: this.state.password}, true)
                                        .then(d => {
                                          console.log('success', d);
                                          this.props.update('marks');
                                        })
                                        .catch(e => console.log('e', e));
                                      }} /> :
                                     <BaseButton title="Sign Up" onClick={() => {
                                        if (this.state.text && this.state.password) {
                                          post('http://127.0.0.1:5000/users', {email: this.state.text, password: this.state.password})
                                          .then(d => {
                                            console.log('done yo', d);
                                            this.props.update('marks');
                                          })
                                          .catch(e => console.warn('e', e));
                                        }
                                        console.log('up', this.state.text, this.state.password)
                                      }} />
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

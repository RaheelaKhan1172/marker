import React, { Component } from 'react';
import { post } from './request';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';

import BaseButton from './Button';

export default class extends Component {

  constructor() {
    super();
    this.state = { text:'', password: ''} 
  }
  // set isn't working neither is get 
  render() {
    let { goBack } = this.props;
    let button = this.props.signin ? <BaseButton title="Sign In" onClick={() => {
                                        post('http://127.0.0.1:5000/token', {username: this.state.text, password: this.state.password}, true)
                                        .then(d => {
                                          this.props.update('marks', {},true);
                                        })
                                        .catch(e => console.log('e', e));
                                      }} /> :
                                     <BaseButton title="Sign Up" onClick={() => {
                                        if (this.state.text && this.state.password) {
                                          post('http://127.0.0.1:5000/users', {email: this.state.text, password: this.state.password})
                                          .then(d => {
                                            //get token
                                            return new Promise((resolve, reject) => {
                                              post('http://127.0.0.1:5000/token', {username: this.state.text, password: this.state.password}, true)
                                              .then((token) => {
                                                try {
                                                  console.log(token, JSON.parse(token))
                                                  let parsed = JSON.parse(token);
                                                  AsyncStorage.setItem('token', parsed.token);
                                                  AsyncStorage.setItem('uid', parsed.uid.toString());
                                                  resolve();
                                                } catch (error) {
                                                  reject(error);
                                                }
                                              }) 
                                          })})
                                          .then(() => this.props.update('marks', {}, true))
                                          .catch(e => console.warn('e', e));
                                        }
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

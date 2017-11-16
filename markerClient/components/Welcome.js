import React, { Component } from 'react';
  
import {
  Platform,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import BaseButton from './Button';

export default class extends Component {
  render() {
    return (
      <View>
        <Text style={{fontWeight: '400', fontSize: 25, color: '#FFF', textAlign: 'center'}}> 
          Welcome
        </Text>
        <Text style={styles.text}> 
          Please sign in or sign up to start marking!
         </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginRight: 10,backgroundColor: '#7C4DFF', borderRadius: 10, borderWidth: 1, borderColor: '#7C4DFF', marginTop: 10}}>
            <BaseButton 
              title="Sign In" 
              onClick={() => this.props.viewUpdate('signin')}
            />
          </View>
          <View style={{marginLeft: 10, backgroundColor: '#7C4DFF', borderRadius: 10, borderWidth: 1, borderColor: '#7C4DFF', marginTop: 10}}>
          <BaseButton
            title="Sign Up"
            onClick={() => this.props.viewUpdate('signup')}
           />
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400'
  }
});

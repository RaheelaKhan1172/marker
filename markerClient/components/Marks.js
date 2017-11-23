/*
  @flow
*/

import React, { Component } from 'react';
import { get, getFromStorage } from './request';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

import BaseButton from './Button';

export default class extends React.Component {
  state = {
    loading: true,
    data: []
  } 

  constructor() {
    super();
    //get data in here, and then render component if authenticatd
    this.getData();
  }

  async getData() {
    let id = await getFromStorage('uid');
    console.log('id', id);
    if (id) {
      get('http://127.0.0.1:5000/users/'+id+'/marks')
      .then(d =>  {
        let parsed = JSON.parse(d);
        console.log('parsed', parsed);
        this.setState({data: parsed.marks });
      })
      .catch(e => console.log('error in marks', e))
      .then(() => this.setState({loading: false}))
      // add marks
    }
  }
  
  render() {
    return (
      <ScrollView>
        {this.state.loading && <Text> .. Loading </Text> }
        {!this.state.loading && 
          <View> 
          <Text> Your Marks </Text>
          <BaseButton 
            title="Add A Mark"
            onClick={() => {
              console.log("Add");
              this.props.update('mark');
              //open MarkForm with data prepopulated values
            }}
          />
          {this.state.data.map(elem => (
            {...elem}
          ))}
          </View>
        }
      </ScrollView>
    );
  }
}

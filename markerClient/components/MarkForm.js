import React, { Component } from 'react';
import { get, post, getFromStorage } from './request';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage,
  FlatList
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
      notes: props.defaultNotes || '',
      editing: props.editing
    }
  }
  
  renderList() {
    return (
      <View>
        <FlatList
          data={Object.keys(this.state).map(elem => ({
            key: elem
          }))}
          renderItem={({item}) => <Text> {item.key} </Text>}
        />
      </View>
    );
  } 
   
  renderForm() {
    return (
      <View>
        <BaseButton title="Back" onClick={this.props.back}/>
        {Object.keys(this.state).map(elem => (
          <View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(el) => {
                var state = {...this.state};
                //state[elem] = 
                console.log(this.state, elem);
                state[elem] = el;
                this.setState(state);
              }}
              value={this.state[elem]}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
            />
          </View>
        ))}
        <BaseButton
          title="Add"
          onClick={() => {
          //make post request here for form
          //this component will be responsible for all updates to marks 
          //add in check to see if this is update || new mark, think this should be a list, and then render as input if you click
          //and if you press 'edit', should hav e boolean that sets everything to input, after submit, it should all go back to list
          let { id } = this.props;
          let url = `http://127.0.0.1:5000/users/${id}/marks`;
          post(url, {username: this.props.user, password: ''}, true)
              .then(() => console.log('done'))
              .catch(e => console.log('warn', e))
              .then(() => this.setState({editing: false}));
          }}
        />
      </View>
    );
  }
   
  render() {
    console.log('state', this.state);
    return (
      this.state.editing ? 
      this.renderForm() : this.renderList()
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

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRender: false,
      currentElemIndex: 0,
      total: React.Children.count(this.props.children)
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.skip = this.skip.bind(this);
  } 

  skip() {
    /*this.setState(() => ({
      ...this.state,
      initialRender: false
    }));*/
  }

  next() {
    /*this.setState(() => ({
      ...this.state,
      currentElemIndex: this.currentElemIndex += 1
    }));*/
  }

  previous() {
    /*this.setState(() => ({
      {...this.state},
      currentElemIndex: this.currentElemIndex -= 1
    })); */
  }

  render() {
    console.log(React.Children);
    console.log(React.Children.count(this.props.children));
    console.log(this.props.children);
    return (
      <View>
        {this.props.children}
      </View>
    );
  }
}

export class Instruction extends Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.instructions}
        </Text>
        {this.props.children}
      </View>
    )
    /*return (
      <View>
        (this.props.renderInstruction && 
          <View>
            {this.props.instructions}
            {this.props.children}
          <View> 
        )
        (!this.props.renderInstruction &&
        <View>
        {this.props.children}
        </View>)
      </View>
    )*/
  }
}

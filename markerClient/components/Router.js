import React, { Component } from 'react';

export default class Router {

  pages = [];
  props = {};
  constructor() {

  }

  addPage(view) {
    this.pages.push(view);
  }
  
  addProps(view, props) {
    this.props[view] = props;
  }

  get currentPage() {
    return this.pages[this.pages.length - 1 ];
  }

  get currentPageWithProps() {
    return this.props[this.pages[this.pages.length - 1]];
  }
  
  back = () => {
    this.pages.pop();
  } 
  
  clear = () => {
    this.pages = [];
  }
}

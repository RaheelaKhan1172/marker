import React, { Component } from 'react';

export default class Router {

  pages = [];
  constructor() {

  }

  addPage(view) {
    this.pages.push(view);
  }

  get currentPage() {
    return this.pages[this.pages.length - 1 ];
  }

  back = () => {
    this.pages.pop();
  } 
}

'use strict';

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', url);
      
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          resolve(request.response);
        }
      }

      request.onerror = () => {
        reject(request.statusText);
      }

      request.send();
  });
}

export const post = (url, params, addHeader) => {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    if ( addHeader ) {
      request.setRequestHeader("Authorization", "Basic " + btoa(params.username + ":" + params.password));
    } 
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE && (request.status === 200 || request.status === 201)) {
        resolve(request.response);
      } else if (request.readyState === XMLHttpRequest.DONE && request.status !== 200) {
        reject(request);
      }
    }

    request.onerror = () => {
      reject(request.statusText);
    } 

    request.send(JSON.stringify(params)); 
  });
}

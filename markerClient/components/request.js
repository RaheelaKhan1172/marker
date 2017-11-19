'use strict';
import { AsyncStorage } from 'react-native';

export const getFromStorage = async (which) => {
  let result = null;
  try {
    result = await AsyncStorage.getItem(which);  
    console.log('result', result);
  } catch (e) {
    console.log('e', e);
  }

  return result;
}

export const get = async (url, params, addHeader = true) => {
  return new Promise( async(resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', url);
      if ( addHeader ) {
        let user = null;
        try {
          user = await AsyncStorage.getItem("token");
          console.log('user', user);
        } catch (e) {
          console.log('error in request -> get -> async storage', e);
        }
        if (user) {
          request.setRequestHeader('Authorization', 'Basic ' + btoa(user + ':'));
        }
      }
 
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

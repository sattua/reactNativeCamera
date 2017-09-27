'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';

@inject('AlbumStore')
@observer
export default class MyCamera extends React.Component {

  static navigationOptions = {
       title: 'Camera',
       headerBackTitle: null
    };
  render() {
    return (
     
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Button style={styles.capture}
            title='Press'
            icon={{name:'camera-enhance'}}
            backgroundColor={ '#ff4646'}
            borderRadius={10}
            onPress={this.takePicture.bind(this)} />
        </Camera>
     
    );
  }
 
  takePicture() {
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => {
        this.props.AlbumStore.cameraFileSrc = data.path;
        this.props.toggleFunction();
        return console.log(data);
      })
      .catch(err => console.error(err));
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    padding: 10,
    margin: 35,
    marginBottom: 5,
  }
});
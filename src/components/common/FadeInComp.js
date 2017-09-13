import React from 'react';
import { Animated, Text, View } from 'react-native';
import { Button } from 'react-native-elements'

export default class FadeInComp extends React.Component {

  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
 
  animating(value, callback = ()=>{}) {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: value,                   // Animate to opacity: 1 (opaque)
        duration: this.props.duration || 1000,              // Make it take a while
      }
    ).start(callback);                        // Starts the animation
  }
 
  componentDidMount(){
    this.animating(1);
  }

  fadeOut(){
    this.animating(0, this.props.action);
  }

  render() {
    let { fadeAnim } = this.state;
    return (<View style={{ backgroundColor:"#ffffff", padding:20 }}>
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
        <Button
          title='Unselected'
          icon={{name:'autorenew'}}
          backgroundColor={ '#438eff'}
          onPress={this.fadeOut.bind(this)} />
      </Animated.View>
      </View>
    );
  }
}
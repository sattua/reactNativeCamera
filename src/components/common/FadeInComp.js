import React from 'react';
import { Animated, Text, View, Button } from 'react-native';
 
export default class FadeInComp extends React.Component {

  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
 
  animating(value) {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: value,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }
 
  componentDidMount(){
    this.animating(1);
  }

  componentWillUnmount(){
    this.animating(0);
  }

  render() {
    let { fadeAnim } = this.state;
    return (<View>
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
      </View>
    );
  }
}
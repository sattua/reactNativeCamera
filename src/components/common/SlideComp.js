import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated
} = ReactNative;


var isHidden = true;

export default class SlideComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(100),  //This is the initial position of the subview
    };
  }


  _toggleSubview(isVisible) {    

    var toValue = 100;

    if(isVisible) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 9,
        tension: 8,
        friction: 3,
      }
    ).start();
  }

  componentDidMount(){
    this._toggleSubview(this.props.isVisible);
  }

  componentWillUnmount(){
    this._toggleSubview(!this.props.isVisible);
  }

  render() {
    return (
      <View style={styles.container}>
          <Animated.View style={[styles.subView,{transform: [{translateY: this.state.bounceValue}]}]} >
            {this.props.children}
          </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {

  },
  subView: {

  }
});

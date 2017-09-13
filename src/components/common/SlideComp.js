import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
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
      bounceValue: new Animated.Value(0),  //This is the initial position of the subview
    };
  }


  _toggleSubview() {

    Animated.spring(
      this.state.bounceValue, // From here
      {
        toValue: 20, // To here
        velocity: 1,
        tension: 5,
        friction: 5,
      }
    ).start();
  }

  componentDidMount(){
    this._toggleSubview();
  }

  componentWillUnmount(){
    this._toggleSubview();
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
    paddingBottom: 20
  },
  subView: {
  }
});

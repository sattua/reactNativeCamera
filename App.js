import React from 'react';
import { StyleSheet, Text, View, AsyncStorage,TextInput } from 'react-native';
import Album from './src/stores/AlbumStore';
import TabNav from './src/routers/Router';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {myKey: ''};
  }

  componentDidMount(){
    AsyncStorage.getItem("myKey").then((value) => {
        this.setState({myKey: value});
    }).done();
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNav  screenProps= {Album} />
         {/*  <MyList style={styles.mylistContainer} albumData= {Album} />
{/*         <TextInput value={this.state.myKey} placeholder="Type here!" onChangeText={(value) =>{
          AsyncStorage.setItem("myKey", value);
          this.setState({myKey: value});
          }} /> */} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mylistContainer:{
    marginTop:50,
  }
});

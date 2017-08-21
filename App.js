import React from 'react';
import { StyleSheet, Text, View, AsyncStorage,TextInput } from 'react-native';
import Album from './src/stores/AlbumStore';
import TabNav from './src/routers/Router';
import {observer} from 'mobx-react';

@observer
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {storaged: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNav screenProps= {Album} />
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

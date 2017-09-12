import React from 'react';
import { Text, StyleSheet, Image, View, ScrollView, Alert, Animated } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import {observer} from 'mobx-react';
import { StackNavigator } from 'react-navigation';
import ProfileCard from '../card/ProfileCard';
import FadeInComp from '../common/FadeInComp';

@observer
export default class MyList extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      selectedProfiles: [],
    }
  }

  showProfile(profile, index){
    this.props.screenProps.selectedProfile = profile;
    this.props.navigation.navigate( "ProfileCard", { 'store': this.props.screenProps, 'index': index } );
  }

  selectProfile(index){
    let selectedProfiles = this.state.selectedProfiles;
    selectedProfiles.push(index);
    this.setState({
      selectedProfiles
    });
  }

  doRemoveSelected(){
    const { screenProps } = this.props;

    screenProps.removeProfiles(this.state.selectedProfiles);
    this.UnselectElements();
  }

  removeSelected(){
    Alert.alert(
        'Remove',
        'Are you sure you want to remove selected profiles?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => this.doRemoveSelected() },
        ]
    );
  }

  UnselectElements(){
    this.setState({
      selectedProfiles: []
    });
  }

  getSelectedMenu(){
    if(this.state.selectedProfiles.length){
      return <FadeInComp>
          <View style={{backgroundColor:"#ffffff",padding:20}}>
            <Text style={{margin:10}} >Selected profiles: {this.state.selectedProfiles.length}</Text>
            <View style={{marginBottom:10}}>
              <Button
                style={{margin:10}}
                title='Remove selected'
                icon={{name:'delete'}}
                backgroundColor={ '#ff4646'}
                onPress={this.removeSelected.bind(this)} />
            </View>
            <Button
              title='Unselected'
              icon={{name:'autorenew'}}
              backgroundColor={ '#438eff'}
              onPress={this.UnselectElements.bind(this)} />
        </View>
      </FadeInComp>
    }
    return;
  }

  render() {
      const { screenProps } = this.props;
      const {selectedProfiles} = this.state;
      return (
        <ScrollView>
          {this.getSelectedMenu()}
          <List containerStyle={{marginBottom: 20}}>
          { screenProps.profiles.length ?
              screenProps.profiles.map((profile, i) => (
                  <ListItem
                      roundAvatar
                      avatar={{uri:profile.avatar_url}}
                      key={i}
                      title={profile.name}
                      onPress={ this.showProfile.bind(this, profile, i) }
                      onLongPress={ this.selectProfile.bind(this, i) }
                      containerStyle={{ backgroundColor: selectedProfiles.indexOf(i) >= 0 ? "#f1f1f1" : "#ffffff" }}
                  />
              )) : undefined
          }
          </List>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  imageContainer:{
      justifyContent: 'flex-start',
      flexDirection: 'row',
  }
});
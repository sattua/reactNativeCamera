import React from 'react';
import { Text, StyleSheet, Image, View, ScrollView, Alert, Animated } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import ProfileCard from '../card/ProfileCard';
import FadeInComp from '../common/FadeInComp';
import { inject, observer } from 'mobx-react/native';

@inject('AlbumStore')
@observer
export default class MyList extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      selectedProfiles: [],
    }
  }

  showProfile(profile, index){
    this.props.AlbumStore.setSelectedProfile(profile);
    this.props.navigation.navigate( "ProfileCard", { 'index': index } );
  }

  selectProfile(index){
    let selectedProfiles = this.state.selectedProfiles;
    selectedProfiles.push(index);
    this.setState({
      selectedProfiles
    });
  }

  doRemoveSelected(){
    const { AlbumStore } = this.props;

    AlbumStore.removeProfiles(this.state.selectedProfiles);
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
      return(
      <FadeInComp duration={500} action={this.UnselectElements.bind(this)}>
          <View>
            <Text style={{margin:10}} >Selected profiles: {this.state.selectedProfiles.length}</Text>
            <View style={{marginBottom:10}}>
              <Button
                style={{margin:10}}
                title='Remove selected'
                icon={{name:'delete'}}
                backgroundColor={ '#ff4646'}
                onPress={this.removeSelected.bind(this)} />
            </View>
        </View>
      </FadeInComp>);
    }
    return;
  }

  render() {
    debugger;
    const { AlbumStore } = this.props;
    const {selectedProfiles} = this.state;
    return (
      <ScrollView>
        {this.getSelectedMenu()}
        <List containerStyle={{marginBottom: 20}}>
        { AlbumStore.profiles.length ?
          AlbumStore.profiles.map((profile, i) => (
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
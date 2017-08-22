import React from 'react';
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import {observer} from 'mobx-react';
import { StackNavigator } from 'react-navigation';
import ProfileCard from '../card/ProfileCard'

@observer
export default class MyList extends React.Component{

showProfile(profile){
  this.props.screenProps.selectedProfile = profile;
  this.props.navigation.navigate( "ProfileCard", { 'store': this.props.screenProps } );
  
}

render() {
    const { screenProps } = this.props;

    return (
      <ScrollView>
        <List containerStyle={{marginBottom: 20}}>
        { screenProps.profiles.length ?
            screenProps.profiles.map((profile, i) => (
                <ListItem
                    roundAvatar
                    avatar={{uri:profile.avatar_url}}
                    key={i}
                    title={profile.name}
                    onPress={ this.showProfile.bind(this, profile) }
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
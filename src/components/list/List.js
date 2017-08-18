import React from 'react';
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default class MyList extends React.Component{
 render() {
    const { screenProps } = this.props;
   // debugger;
    return (
      <ScrollView>
        <List containerStyle={{marginBottom: 20}}>
        {
            screenProps.album.map((l, i) => (
                <ListItem
                    roundAvatar
                    avatar={{uri:l.avatar_url}}
                    key={i}
                    title={l.name}
                />
            ))
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
import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import MyCamera from '../camera/MyCamera';
import {observer} from 'mobx-react';

@observer
export default class ProfileCard extends React.Component{
    constructor(props){
        super(props);
        const {screenProps} = this.props;       
        this.state = {
            name: screenProps.selectedProfile.name,
            description: screenProps.selectedProfile.description,
            avatar_url: screenProps.selectedProfile.avatar_url
            
        }
    }

    render(){
        const {screenProps} = this.props;
        return (
            <View style={styles.profileContainer}>
                 <Card title='Photo info!' image = { {uri:this.state.avatar_url} } >
                    <Text>{this.state.name}</Text>
                    <Text>{this.state.description}</Text>
                 </Card>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        paddingTop: 50,
    },
});

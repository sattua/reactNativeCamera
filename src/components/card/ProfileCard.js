import React from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';

@inject('AlbumStore')
@observer
export default class ProfileCard extends React.Component{
    constructor(props){
        super(props);
        const {AlbumStore} = this.props;

        this.state = {
            name: AlbumStore.selectedProfile.name,
            description: AlbumStore.selectedProfile.description,
            avatar_url: AlbumStore.selectedProfile.avatar_url,
            index: this.props.navigation.state.params.index
        }
    }
    static navigationOptions = {
        title: 'Back to list',
     };

    doRemove(){
        const {index} = this.state;
        const {AlbumStore, navigation} = this.props;
        AlbumStore.removeProfile(index);
        navigation.goBack();
    }

    removeRecord(){
        Alert.alert(
            'Remove',
            'Are you sure you want to remove this profile?',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => this.doRemove() },
            ]
        );
    }

    render(){
        
        return (
            <View style={styles.profileContainer}>
                 <Card title='Photo info!' image = { {uri:this.state.avatar_url} } >
                    <Text style={{fontWeight: 'bold'}}>{this.state.name}</Text>
                    <Text>{this.state.description}</Text>
                    <Button
                        icon={{name: 'delete'}}
                        backgroundColor='#ef3434'
                        buttonStyle={{marginLeft: 0, marginRight: 0, marginTop: 15, marginBottom: 15}}
                        onPress={this.removeRecord.bind(this)}
                        title='Remove Record' />
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

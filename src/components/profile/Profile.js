import React from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import MyCamera from '../camera/MyCamera';

const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
]

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            camaraOn: false,
        }
    }
    static navigationOptions = {
       title: 'Welcome',
       headerBackTitle: null
    };
    render(){
        const { navigate } = this.props.navigation;
        let content = null;
        if (this.state.camaraOn){
            content = <MyCamera/>;
        }
        else{
            content = (                
                    <Card title='Photo info!'>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="black"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="black"
                        style={styles.input}
                    />
                    </Card>
        );  
        }
        return (
            <View style={styles.profileContainer}>
                {content}
                 <Button
                        icon={{name: 'photo'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        onPress={this.getCamera.bind(this)}
                        title='toggle camara' />
                 <Button
                        icon={{name: 'photo'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        onPress={this.createProfile.bind(this)}
                        title='generate' />
            </View>
        )
    }

    getCamera(){
        if(this.state.camaraOn){
            this.setState({
                camaraOn: false,
            }); 
        }else{
             this.setState({
                camaraOn: true,
            });
        }
    }

    createProfile(){
        debugger;

    }
}
const StackNav = StackNavigator({
  MyCamera: { 
    screen: MyCamera, 
  },
});

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        paddingTop: 50,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 15,
        color: '#000',
        paddingHorizontal: 10
    },
});

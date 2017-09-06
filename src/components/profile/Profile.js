import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, AsyncStorage, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Card, ListItem, Button, FormInput, FormLabel } from 'react-native-elements';
import MyCamera from '../camera/MyCamera';
import {observer} from 'mobx-react';

@observer
export default class Profile extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            camaraOn: false,
            name: "",
            description: "",
            avatar_url: undefined
        }
    }

    static navigationOptions = {
       title: 'Profile',
    };

    componentDidMount(){
        let global = this; //so we don't lose scope from component
        AsyncStorage.getItem("myCamAppData")
        .then((value) => {
            if(value){
                global.props.screenProps.profiles = JSON.parse(value);
            }
        }).done();
    }

    doCreate(){
        debugger;
        this.props.screenProps.profiles.push({
            name: this.state.name,
            avatar_url: this.props.screenProps.cameraFileSrc,
            description: this.state.description
        });

        AsyncStorage.setItem('myCamAppData', JSON.stringify(this.props.screenProps.profiles));

        this.props.screenProps.cameraFileSrc = "https://facebook.github.io/react/img/logo_og.png";

        this.setState({
            name: "",
            description: "",
        });
    }
        
    createProfile(){
        if(this.state.name && this.state.description){
            try {
                this.doCreate();
            } catch (error) {
                debugger;
                Alert.alert(`Error on saving...${error}`);
            }
        }else{
            Alert.alert("Please add a name and description");
        }
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

    render(){
        const { navigate } = this.props.navigation;
        const {screenProps} = this.props;
        let content = null;

        if (this.state.camaraOn){
            content = <MyCamera myStore={screenProps} toggleFunction= {this.getCamera.bind(this)} />;
        }
        else{
            content = (                
                <Card title='Photo info!' image = { { uri: this.state.avatar_url || screenProps.cameraFileSrc } } >
                    <FormLabel>Name</FormLabel>
                    <FormInput
                        onSubmitEditing={Keyboard.dismiss}
                        returnKeyType ="done"
                        placeholder="Name"
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    <FormLabel>Description</FormLabel>
                    <FormInput
                        onSubmitEditing={Keyboard.dismiss}
                        returnKeyType ="done"
                        placeholder="Description"
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                </Card>
        );}

        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.profileContainer}>
                { content }
                <View style={{marginTop:20}}>
                    <Button
                        icon={{name: 'camera-enhance'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        onPress={this.getCamera.bind(this)}
                        title='Toggle camara' />
                </View>
                <View style={{marginTop:20}}>
                    <Button
                        icon={{name: 'done'}}
                        backgroundColor='#76a977'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        onPress={this.createProfile.bind(this)}
                        title='Create' />
                </View>
            </View>
        </TouchableWithoutFeedback>
        )
    }
    
}

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

import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
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
        }
    }

    static navigationOptions = {
       title: 'Welcome',
       headerBackTitle: null
    };

    componentDidMount(){
        let global = this;
        AsyncStorage.getItem("myCamAppData")
        .then((value) => {
            if(value){
                global.props.screenProps.album = JSON.parse(value);
            }
        }).done();
    }

    render(){
        const { navigate } = this.props.navigation;
        let content = null;
        if (this.state.camaraOn){
            content = <MyCamera myStore={this.props.screenProps} toggleFunction= {this.getCamera.bind(this)} />;
        }
        else{
            content = (                
                    <Card title='Photo info!' image ={{uri:this.props.screenProps.cameraFileSrc}} >
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="black"
                        style={styles.input}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="black"
                        style={styles.input}
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                    </Card>
        );}
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

    doCreate(){

        this.props.screenProps.album.push({
            name: this.state.name,
            avatar_url: this.props.screenProps.cameraFileSrc,
            subtitle: this.state.description
        });

        AsyncStorage.setItem('myCamAppData', JSON.stringify(this.props.screenProps.album));

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
                Alert.alert("Error on saving...");
            }
        }else{
            Alert.alert("Please add a name and description");
        }
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

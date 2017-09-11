import React from 'react';
import { ScrollView, View, Text, Alert} from 'react-native';
import { Card, List, ListItem, Button, FormInput, FormLabel } from 'react-native-elements';
import {observer} from 'mobx-react';

@observer
export default class ImportProfiles extends React.Component{
    constructor(props){
        super(props);   
        this.state = {
            data: undefined,
            url: 'https://jsonplaceholder.typicode.com/users'
        }
    }

    static navigationOptions = {
       title: 'Importing',
    };


    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        fetch(this.state.url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data: responseJson})
                return responseJson.movies;
            })
            .catch((error) => {
               //error
            });
    }

    selectedEntry(selectedEntry){
        let temp = this.state.data;
        temp.map((entry, i) =>{
            if(selectedEntry.id === entry.id){
                entry.isSelected = !entry.isSelected;
                return;
            }
        });

        this.setState({data:temp});
    }

    unselectAllEntries(){
        let temp = this.state.data;
        temp.map((entry, i) =>{
            entry.isSelected = false;
        });

        this.setState({data:temp});
    }

    getSelectedEntries (){ 
        if(this.state.data){
            return this.state.data.filter((entry, i)=>{
                return entry.isSelected;
            });
        }
        
        return [];
    }

    renderAvailableRecords(){
        if(this.state.data){
            let entries = [];
            this.state.data.map((entry, i) =>{
                entries.push(<ListItem
                    onPress={ ()=> this.selectedEntry(entry) }
                    key={i}
                    subtitle={entry.username}
                    title={ entry.name }
                    rightTitle= { entry.email }
                    containerStyle={{ backgroundColor: entry.isSelected ? "#ece9e9" : "#ffffff" }}
                />);
            });
            return entries;
        }
        return;
    }

    importSelected(){
        const { screenProps } = this.props; 
        const selected = this.getSelectedEntries();
        let tempList = [];

        if(selected.length){
            selected.map((entry, i)=>{
                tempList.push({
                    name: entry.name,
                    avatar_url: "https://facebook.github.io/react/img/logo_og.png",
                    description: entry.email
                });
            });
            screenProps.addProfiles(tempList);
            this.unselectAllEntries();
        }
    }

    render(){
        const selectedItemCounter = this.getSelectedEntries();
        return (
        <ScrollView >
            <Card title={"Import Data"}>
                <Text style={{fontWeight:'bold'}} >Available Records</Text>
                <Text>Selected { selectedItemCounter.length } </Text>
                { selectedItemCounter.length > 0 && 
                    <Button
                        onPress={ this.importSelected.bind(this)}
                        icon={{name: 'get-app'  }}
                        backgroundColor={ '#03A9F4'}
                        buttonStyle={{marginTop: 10}}
                        title={ 'Import Selected' }  /> 
                }
                { this.state.data &&
                   <List>{ this.renderAvailableRecords() }</List>
                }
            </Card>
        </ScrollView>
        )
    }
    
}

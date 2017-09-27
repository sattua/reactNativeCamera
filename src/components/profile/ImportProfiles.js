import React from 'react';
import { ScrollView, View, Text, Alert, Picker} from 'react-native';
import { Card, List, ListItem, Button, FormInput, FormLabel } from 'react-native-elements';
import SlideComp from '../common/SlideComp';
import { inject, observer } from 'mobx-react/native';

@inject('AlbumStore')
@observer
export default class ImportProfiles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            //sourceUrl: 'https://jsonplaceholder.typicode.com/users'
            sourceUrl: 'https://reqres.in/api/users',
            isLoading: false
        }
    }

    static navigationOptions = {
       title: 'Importing',
    };


    componentDidMount() {
        this.fetchData()
    }

    async fetchData(sourceUrl = this.state.sourceUrl) {
        this.setState({
            isLoading: true,
            data: undefined,
        });
        fetch(sourceUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.data || responseJson,
                    sourceUrl: sourceUrl,
                    isLoading: false
                });
                return responseJson;
            })
            .catch((error) => {
               //error
               this.setState({
                    isLoading: false 
                });
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

    getAvailableRecords(){
        if(this.state.data){
            let entries = [];
            this.state.data.map((entry, i) =>{
                entries.push(<ListItem
                    onPress={ ()=> this.selectedEntry(entry) }
                    key={i}
                    subtitle={ entry.username || entry.first_name}
                    title={ entry.name || entry.last_name }
                    rightTitle= { entry.email }
                    containerStyle={{ backgroundColor: entry.isSelected ? "#ece9e9" : "#ffffff" }}
                />);
            });
            return entries;
        }
        return;
    }

    importSelected(){
        const { AlbumStore } = this.props; 
        const selected = this.getSelectedEntries();
        let tempList = [];

        if(selected.length){
            selected.map((entry, i)=>{
                tempList.push({
                    name: entry.name || entry.first_name,
                    avatar_url: entry.avatar || "https://facebook.github.io/react/img/logo_og.png",
                    description: entry.email || "none"
                });
            });
            AlbumStore.addProfiles(tempList);
            this.unselectAllEntries();
        }
    }

    loadSourceUrl(itemValue){
        this.fetchData(itemValue);
    }

    renderResultList(){
        if(this.state.data){
        return <SlideComp isVisible={true} >
            <List>{ this.getAvailableRecords() }</List>
        </SlideComp>
        }
        return;
    }

    render(){
        const selectedItemCounter = this.getSelectedEntries();
        return (
        <ScrollView >
            <Card title={"Data Sources"}>
                <Picker selectedValue={this.state.sourceUrl} onValueChange={(itemValue) =>this.loadSourceUrl(itemValue) } >
                    <Picker.Item label="typicode.com" value="https://jsonplaceholder.typicode.com/users" />
                    <Picker.Item label="reqres.in" value="https://reqres.in/api/users" />
                </Picker>
                <Text>{ this.state.isLoading ? "Loading..." : "" }</Text>
            </Card>
            
            <Card title={"Data"}>
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
                {
                    this.renderResultList()
                }
            </Card>
            
        </ScrollView>
        )
    }
    
}

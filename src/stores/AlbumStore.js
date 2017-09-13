import {computed, observable, action} from 'mobx';
import { AsyncStorage } from 'react-native';
 
class _AlbumStore {
    @observable cameraFileSrc = "https://facebook.github.io/react/img/logo_og.png";
    @observable storageName = "myCamAppData";
    @observable profiles = []; 
    @observable selectedProfile = {};

    @computed get storageURI(){
        return this.storageName;
    }

    @action setSelectedProfile(profile) {
        this.selectedProfile = profile;
    }

    @action addProfile(profile) {
        this.profiles.push(profile);
        AsyncStorage.setItem(this.storageURI, JSON.stringify(this.profiles));
        this.cameraFileSrc = "https://facebook.github.io/react/img/logo_og.png";
    }

    @action addProfiles(profiles) {
        //TODO
        //this.profiles.concat(profiles);
        profiles.map((p, i)=>{
            this.profiles.push(p);
        });
        AsyncStorage.setItem(this.storageURI, JSON.stringify(this.profiles));
    }

    @action removeProfile(index) {
        //TODO
        //this.profiles.remove(profile)
        const temp = this.profiles.filter((profile, i)=>{
            return i !== index;
        });
        
        this.profiles = temp;
        AsyncStorage.setItem(this.storageURI, JSON.stringify(this.profiles));
    }

    @action removeProfiles(indexes) {
        const temp = this.profiles.filter((profile, i)=>{
            return indexes.indexOf(i) < 0;
        });
        
        this.profiles = temp;
        AsyncStorage.setItem(this.storageURI, JSON.stringify(this.profiles));
    }
    
}
 
const AlbumStore = new _AlbumStore();
 
export default AlbumStore;
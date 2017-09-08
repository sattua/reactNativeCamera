import {computed, observable} from 'mobx';
 
class _AlbumStore {
    @observable profiles = [];

    @observable selectedProfile = {};

    @observable cameraFileSrc = "https://facebook.github.io/react/img/logo_og.png";
    
}
 
const AlbumStore = new _AlbumStore();
 
export default AlbumStore;
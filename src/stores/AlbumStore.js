import {computed, observable} from 'mobx';
 
class _AlbumStore {
    @observable profiles = [];

    @observable selectedProfile = {};

    @observable cameraFileSrc = "https://facebook.github.io/react/img/logo_og.png";
 
    /*@computed get unfinishedTodoCount() {
        return this.album.filter(album => !album.finished).length;
    }*/
    
}
 
const AlbumStore = new _AlbumStore();
 
export default AlbumStore;
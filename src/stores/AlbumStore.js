import {computed, observable} from 'mobx';
 
class AlbumStore {
    @observable album = [
    ];

    @observable cameraFileSrc = "https://facebook.github.io/react/img/logo_og.png";
 
    @computed get unfinishedTodoCount() {
        return this.album.filter(album => !album.finished).length;
    } 
}
 
const Album = new AlbumStore();
 
export default Album;
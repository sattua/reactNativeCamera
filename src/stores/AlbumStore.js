import {computed, observable} from 'mobx';
 
class AlbumStore {
    @observable album = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
    ];
 
    @computed get unfinishedTodoCount() {
        return this.album.filter(album => !album.finished).length;
    } 
}
 
const Album = new AlbumStore();
 
export default Album;
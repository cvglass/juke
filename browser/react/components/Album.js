import React, { Component } from 'react';
import Songs from '../components/Songs';


class Album extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount () {
    const albumId = this.props.routeParams.id;
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);
  }


  render (){
    return (
      <div className="album">
        <div>
          <h3>{ this.props.album.name }</h3>
          <img src={ this.props.album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={this.props.album.songs}
          currentSong={this.props.currentSong}
          isPlaying={this.props.isPlaying}
          toggleOne={this.props.toggleOne} />
      </div>
    );
  }
}

export default Album;

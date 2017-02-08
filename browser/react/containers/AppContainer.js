import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, skip, convertArtists } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
  }

  componentDidMount () {
    const getAlbums = axios.get('/api/albums/');
    const getArtists = axios.get('/api/artists');
      // .then(res => res.data)
      // .then(album => this.onLoad(convertAlbums(album)));

    Promise.all([getAlbums, getArtists])
      .then(arrOfResponses => {
        this.onLoad(
          convertAlbums(arrOfResponses[0].data),
          arrOfResponses[1].data
        );
      })



    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums, artists) {
    this.setState({
      albums: albums,
      artists: artists
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  selectArtist (artistId) {

    const artist = axios.get(`api/artists/${artistId}`);
    const artistAlbums = axios.get(`api/artists/${artistId}/albums`);
    const artistSongs = axios.get(`api/artists/${artistId}/songs`);

    Promise.all([artist, artistAlbums, artistSongs])
    .then(([theArtist, albums, songs]) => {
      this.setState({
        selectedArtist: convertArtists(theArtist.data, albums.data, songs.data)
      });
    })
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
          {
            this.props.children ? React.cloneElement(this.props.children,
            {
              album: this.state.selectedAlbum,
              currentSong: this.state.currentSong,
              isPlaying: this.state.isPlaying,
              toggleOne: this.toggleOne,

              albums: this.state.albums,
              selectAlbum: this.selectAlbum,

              artists: this.state.artists,
              selectArtist: this.selectArtist,
              selectedArtist: this.state.selectedArtist
            }) : null
          }

        {/*
          this.state.selectedAlbum.id ?
          <Album
            album={this.state.selectedAlbum}
            currentSong={this.state.currentSong}
            isPlaying={this.state.isPlaying}
            toggleOne={this.toggleOne}
          /> :
          <Albums
            albums={this.state.albums}
            selectAlbum={this.selectAlbum}
          />*/}
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

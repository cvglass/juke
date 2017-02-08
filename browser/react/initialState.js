const initialState = {
  albums: [],
  selectedAlbum: {},
  artists: [],
  selectedArtist: {
    albums: [],
    songs: []
  },
  currentSong: {},
  currentSongList: [],
  isPlaying: false,
  progress: 0
};

export default initialState;

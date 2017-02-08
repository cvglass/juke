import React, { Component } from 'react';
import { Link } from 'react-router';
import Albums from './Albums';
import Songs from './Songs';


const Artist = (props) => {
  const selectedArtist = props.selectedArtist;
  const children = props.children;
  const propsToPassToChildren = {
    /**todo: make sure to include all the props that the child components need! **/
    songs: selectedArtist.songs,
    albums: selectedArtist.albums
  }

  return (
    <div>
      <h3>{ selectedArtist.name }</h3>
      <ul className="nav nav-tabs">
        <li><Link to={`artists/${selectedArtist.id}/albums`}>ALBUMS</Link></li>
        <li><Link to={`artists/${selectedArtist.id}/songs`}>SONGS</Link></li>
      </ul>
      { children && React.cloneElement(children, propsToPassToChildren) }
    </div>
  )
}

export default Artist;

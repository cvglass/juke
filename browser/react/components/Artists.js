import React, { Component } from 'react';
import { Link } from 'react-router';

const Artists = (props) => {
  const artists = props.artists;
  const selectArtist = props.selectArtist;

  return (
    <div>
      <h3>Artists</h3>
        <div className="list-group">
        {
          artists.map(artist => {
            return (
              <div className="list-group-item" key={artist.id}>
                {/* determine where to actually Link to later! */}
                <Link to={ `/artists/${artist.id}` } onClick={() => selectArtist(artist.id) }>{ artist.name }</Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );

}

export default Artists;

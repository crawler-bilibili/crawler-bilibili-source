'use strict';

import React from 'react';
import AnimePreview from './AnimePreview';
import Animes from '../data/MockAnimes';

export default class MainPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="animes-selector">
          {Animes.map(animeData => <AnimePreview key={animeData.aid} {...animeData} />)}
        </div>
      </div>
    );
  }
}

'use strict';

import React from 'react';
import AnimePreview from './AnimePreview';
import Animes from '../data/MockAnimes';
import axios from 'axios';

export default class MainPage extends React.Component {
	constructor (props) {
		super (props);
		this.state = {data : []};

	}


 	componentDidMount() {
 			axios.get('http://localhost:3000/api/anime').then(res => {
 			this.setState({ data: res.data });
 		})
 	}

  render() {
    return (
      <div className="home">
        <div className="animes-selector">
          {this.state.data.map(animeData => <AnimePreview key={animeData.aid} {...animeData} />)}

        </div>
      </div>
    );
  }
}

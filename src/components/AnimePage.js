'use strict';

import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class AnimePage extends React.Component {

	constructor (props) {
		super (props);
		this.state = {data_mainPage : [], data_newAnimesPage : []};

	}

	componentDidMount() {
		//ajax to get json
		axios.get('/api/anime').then(res => {
 			this.setState({ data_mainPage: res.data });
 		})
 		axios.get('/api/newanime').then(res => {
 			this.setState({ data_newAnimesPage: res.data });
 		})
 		// link to bilibili
 		document.getElementById('animeLink').setAttribute('href', 'http://www.bilibili.com/html/player.html?aid='+this.props.params.id+'&as_wide=1&autoplay=true');
 	}


	render(){
		//find anime match id
		var anime = this.state.data_mainPage.filter((anime) => anime.aid === this.props.params.id)[0];
		if (anime === undefined) {
			anime = this.state.data_newAnimesPage.filter((anime) => anime.aid === this.props.params.id)[0];
		}

		if (anime != undefined) {
			const headerStyle = { backgroundImage: `url(/img/background.jpg)` };
		return(
			<div>
        		<div className="anime">
          			<header style={headerStyle}/>
          			<div className="picture-container">
            			<img src={anime.pic}/>
          			</div>
          			<span className="description">
          				{anime.title}
          				<br/>
          				Description:
          				<br/>
            			Total play: {anime.play}
            			<br/>
            			Total favorites: {anime.favorites}
            			<br/>
            			Total danmaku: {anime.danmaku}
            			<br/>
            			Time created: {anime.create}
            			<br/>
            			<a href='' id="animeLink">
							<strong>Play Anime</strong>
						</a>
          			</span>
        		</div>
        		<div className="navigateBack">
          			<Link to="/">« Back to the index</Link>
        		</div>
			</div>
			)
		}
		else return(
				<div/>
			)
	}
}

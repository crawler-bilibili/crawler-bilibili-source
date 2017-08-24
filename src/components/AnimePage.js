'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class AnimePage extends React.Component {

	componentDidMount() {
 		document.getElementById('animeLink').setAttribute('href', 'http://www.bilibili.com/html/player.html?aid='+this.props.params.id+'&as_wide=1&autoplay=true');
 	}


	render(){
		return(
			<div>
			<a href='' id="animeLink">
			B站
			</a>
			<div class="bilibili-player-video">
				<video src="blob:http://www.bilibili.com/d148cd65-aa17-4515-bbeb-2e275b29c6cd"></video>
			</div>

			</div>

		)
	}
}

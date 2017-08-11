'use strict';

import React from 'react';
import Clock from './Clock';

export default class Toggle extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isToggleOn:true,
			isTimeShown:true
		};
		this.handleClick = this.handleClick.bind(this);
	}

	
	handleClick () {
		this.setState (prevState => ({
			isToggleOn : !prevState.isToggleOn,
			isTimeShown : !prevState.isTimeShown
		}));
	}

	render(){
		return (
			<div>
			{this.state.isTimeShown ? <Clock /> : null}
			<button onClick={this.handleClick}>
				{this.state.isToggleOn? 'On':'Off'}
			</button>
			</div>
			);
	}
}


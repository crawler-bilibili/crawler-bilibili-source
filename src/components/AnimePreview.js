'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class AnimePreview extends React.Component {
  render() {
    return (
      <Link to={`/anime/${this.props.aid}`}>
        <div className="anime-preview">
          <img src={`${this.props.pic}`}/>
          <h2 className="name">{this.props.title}</h2>
        </div>
      </Link>
    );
  }
}

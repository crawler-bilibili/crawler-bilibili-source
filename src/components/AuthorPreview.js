'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class AuthorPreview extends React.Component {
  render() {
    return (
      <Link to={`/author/${this.props.mid}`}>
        <div className="author-preview">
          <img src={`${this.props.face}`}/>
          <h2 className="name">{this.props.name}</h2>
        </div>
      </Link>
    );
  }
}
'use strict';

import React from 'react';
import AuthorPreview from './AuthorPreview';
import axios from 'axios';

export default class TopAuthor extends React.Component {
	constructor (props) {
		super (props);
		this.state = {data : []};

	}


 	componentDidMount() {
 			axios.get('/api/author').then(res => {
 			this.setState({ data: res.data });
 		})
 	}

  render() {
    return (
      <div className="home">
        <div className="author-selector">
          {this.state.data.map(authorData => <AuthorPreview key={authorData.mid} {...authorData} />)}

        </div>
      </div>
    );
  }
}
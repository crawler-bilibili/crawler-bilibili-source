'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <img className="logo" src="/img/bilibili.png"/>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            A place for Bilibili fun statistic and top rated/most recent animes.
          </p>
          <p>
            Built with <strong>❤</strong>︎ and <strong>Passion</strong> by two bilibili Fans.
          </p>
        </footer>
      </div>
    );
  }
}

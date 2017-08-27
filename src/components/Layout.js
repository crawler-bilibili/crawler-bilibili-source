'use strict';

import React from 'react';
import { Link } from 'react-router';
import Clock from './Clock';
import Toggle from './Toggle';
import LoginControl from './LoginControl';
import sidebar from './sidebar';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Toggle />
          <LoginControl />
          <Link to="/">
            <img className="logo" src="/img/bilibili.png"/>
          </Link>
        </header>
        <sidebar />
        <div className="app-content">{this.props.children}</div>

        <div className='header-wrapper'>
            <div id='mainmenu'>
             <ul>

                <li>
                  <a href='/' className='header-link'>
                        MainPage
                  </a>
                </li>

                <li>
                  <a href='/author' className='header-link'>
                        TopAuthor
                  </a>
                </li>

                <li>
                  <a href='/' className='header-link'>
                        DatatoChart
                  </a>
                </li>
                <li>
                  <a href='/newanime' className='header-link'>
                        NewAnime
                  </a>
                </li>
                <li>
                  <a href='/' className='header-link'>
                        MyAccount
                  </a>
                </li>

                <li>
                  <form id="fullSearch">
                    <input className='header-search' placeholder='Search...' id="fullURL"/>
                  </form>
                </li>

                <li>
                  <a href='/' className='header-link'>
                        Login/Logout
                  </a>
                </li>
              </ul>
            </div>
        </div>

         

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

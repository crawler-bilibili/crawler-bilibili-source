'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import MainPage from './components/MainPage';
// import ChartPage from './components/ChartPage';
import AnimePage from './components/AnimePage';
import TopAuthors from './components/TopAuthors';
import NewAnimesPage from './components/NewAnimesPage';
// import AuthorPage from './components/AuthorPage';
// import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
	<IndexRoute component={MainPage} />
	<Route path="anime/:id" component={AnimePage}/>
	<Route path="author" component={TopAuthors}/>
	<Route path="newanime" component={NewAnimesPage}/>
  </Route>
);

export default routes;

    /// <Route path="AuthorPage/:id" component={AuthorPage}/>
    
    // <Route path="ChartPage" component={ChartPage}/>
    // <Route path="*" component={NotFoundPage}/>
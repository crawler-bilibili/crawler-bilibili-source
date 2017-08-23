'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import MainPage from './components/MainPage';
// import ChartPage from './components/ChartPage';
// import AnimePage from './components/AnimePage';
// import AuthorPage from './components/AuthorPage';
// import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
	<IndexRoute component={MainPage} />
  </Route>
);

export default routes;

    /// <Route path="AuthorPage/:id" component={AuthorPage}/>
    // <Route path="AnimePage/:id" component={AnimePage}/>
    // <Route path="ChartPage" component={ChartPage}/>
    // <Route path="*" component={NotFoundPage}/>
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {GlobalFeed, Article, Authentication} from 'pages';

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={GlobalFeed} />
      <Route path='/login' component={Authentication} />
      <Route path='/register' component={Authentication} />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  );
};

import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {GlobalFeed, Article, Authentication, TagFeed} from 'pages';

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={GlobalFeed} />
      <Route path='/tags/:slug' component={TagFeed} />
      <Route path='/login' component={Authentication} />
      <Route path='/register' component={Authentication} />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  );
};

import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {
  GlobalFeed,
  Article,
  Authentication,
  TagFeed,
  YourFeed,
  CreateArticle,
  EditArticle,
  Settings,
} from 'pages';

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={GlobalFeed} />
      <Route path='/articles/new' component={CreateArticle} />
      <Route path='/articles/:slug/edit' component={EditArticle} />
      <Route path='/feed' component={YourFeed} />
      <Route path='/tags/:slug' component={TagFeed} />
      <Route path='/login' component={Authentication} />
      <Route path='/settings' component={Settings} />
      <Route path='/register' component={Authentication} />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  );
};

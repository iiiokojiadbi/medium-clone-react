import React from 'react';
import Routes from 'routes';
import {BrowserRouter} from 'react-router-dom';
import 'blocks/app.scss';
import 'blocks/main.scss';

import {Header} from 'components';
import {CurrentUserProvider} from 'context/CurrentUserContext';

export const App = () => {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Header />
        <div className='main'>
          <Routes />
        </div>
      </BrowserRouter>
    </CurrentUserProvider>
  );
};

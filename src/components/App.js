import React from 'react';
import Routes from 'routes';
import {BrowserRouter} from 'react-router-dom';
import {Header} from 'components';
import 'blocks/app.scss';
import 'blocks/main.scss';

export const App= () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='main'>
          <Routes />
        </div>
      </BrowserRouter>
    </>
  );
};

import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import useFetch from 'hooks/useFetch';

import 'blocks/auth.scss';

export const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{isLoading, response, error}, doFetch] = useFetch('/users/login');

  console.log('das', isLoading, response, error);

  const submitHandler = (event) => {
    event.preventDefault();
    doFetch({
      method: 'POST',
      body: JSON.stringify({
        users: {
          email: 'Dwadw@dwwadaw.com',
          password: 'dwadwadw',
        },
      }),
    });
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h1 className='auth__title'>Login</h1>
        <Link className='auth__link' to='register'>
          Need an account?
        </Link>
        <form className='auth__form' onSubmit={submitHandler}>
          <fieldset className='auth__set'>
            <input
              className='auth__input'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </fieldset>
          <fieldset className='auth__set'>
            <input
              className='auth__input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </fieldset>
          <button type='submit' className='auth__btn' disabled={isLoading}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

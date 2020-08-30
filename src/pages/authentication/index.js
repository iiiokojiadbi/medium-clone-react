import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';

import 'blocks/auth.scss';

export const Authentication = (props) => {
  const isLogin = props.match.path === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descriptionLink = isLogin ? '/register' : '/login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [{isLoading, response}, doFetch] = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage('token');

  const submitHandler = (event) => {
    event.preventDefault();

    const user = isLogin
      ? {
          email,
          password,
        }
      : {email, password, username};

    doFetch({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    });
  };

  useEffect(() => {
    if (response) {
      setToken(response.user.token);
      setIsSuccessSubmit(true);
    }
  }, [response, setToken]);

  if (isSuccessSubmit) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h1 className='auth__title'>{pageTitle}</h1>
        <Link className='auth__link' to={descriptionLink}>
          {descriptionText}
        </Link>
        <form className='auth__form' onSubmit={submitHandler}>
          {!isLogin && (
            <fieldset className='auth__set'>
              <input
                className='auth__input'
                type='text'
                placeholder='Username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </fieldset>
          )}
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
            {pageTitle}
          </button>
        </form>
      </div>
    </div>
  );
};

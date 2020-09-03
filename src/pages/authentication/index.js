import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';

import {BackendErrorMessages} from 'pages/authentication/components/BackendErrorMessages';
import {CurrentUserContext} from 'context/CurrentUserContext';

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

  const [{isLoading, response, error}, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage('token');

  const [, dispatch] = useContext(CurrentUserContext);

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
    if (!response) {
      return;
    }
    setToken(response.user.token);
    setIsSuccessSubmit(true);
    dispatch({type: 'SET_AUTHORIZED', payload: response.user});
  }, [response, setToken, dispatch]);

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
          {error && <BackendErrorMessages backendErrors={error.errors} />}
          <div className='auth__set-group'>
            {!isLogin && (
              <fieldset className='auth__set'>
                <input
                  className='auth__input'
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
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
              />
            </fieldset>
            <fieldset className='auth__set'>
              <input
                className='auth__input'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </fieldset>
            <button type='submit' className='auth__btn' disabled={isLoading}>
              {pageTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

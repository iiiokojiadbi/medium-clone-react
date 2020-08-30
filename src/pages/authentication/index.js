import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import useFetch from 'hooks/useFetch';

import 'blocks/auth.scss';

export const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [{isLoading, response, error}, doFetch] = useFetch('login');

  console.log('das', isLoading, response, error);

  useEffect(() => {
    if (isSubmitting) {
      fetch('https://conduit.productionready.io/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          users: {
            email,
            password,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);
        });
    }
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(email, password);
    setIsSubmitting(true);
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
          <button type='submit' className='auth__btn' disabled={isSubmitting}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';
import {CurrentUserContext} from 'context/CurrentUserContext';
import {BackendErrorMessages} from 'components';

export const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const apiUrl = '/user';
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useLocalStorage('token');
  const [isSuccessLogout, setIsSuccessLogout] = useState(false);

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }

    const {image, email, bio, username} = currentUserState.currentUser;

    setImage(image);
    setEmail(email);
    setBio(bio);
    setName(username);
  }, [currentUserState.currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      ...currentUserState.currentUser,
      image,
      username: name,
      email,
      password,
      bio,
    };

    doFetch({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(user),
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch({type: 'SET_AUTHORIZED', payload: response.user});
  }, [response, dispatch]);

  const logout = (event) => {
    event.preventDefault();

    setToken('');
    dispatch({type: 'LOGOUT'});
    setIsSuccessLogout(true);
  };

  if (isSuccessLogout) {
    return <Redirect to='/' />;
  }

  return (
    <div className='settings-page'>
      <h3 className='text-xs-center'>Your settings</h3>
      {error && <BackendErrorMessages backendErrors={error} />}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset>
            <input
              type='text'
              placeholder='URL of profile picture'
              value={image || ''}
              onChange={(e) => setImage(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <input
              type='text'
              placeholder='Username'
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <textarea
              type='text'
              placeholder='Short bio'
              value={bio || ''}
              rows='8'
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </fieldset>
          <fieldset>
            <input
              type='text'
              placeholder='Email'
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <input
              type='password'
              placeholder='New password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <button type='submit'>Update settings</button>
        </fieldset>
      </form>
      <hr />
      <button onClick={logout}>Or click here to logout.</button>
    </div>
  );
};

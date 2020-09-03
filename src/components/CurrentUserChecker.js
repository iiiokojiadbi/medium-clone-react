import {useEffect, useContext} from 'react';
import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';

import {CurrentUserContext} from 'context/CurrentUserContext';

export const CurrentUserChecker = ({children}) => {
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');
  const [{response}, doFetch] = useFetch('/user');

  useEffect(() => {
    if (!token) {
      dispatch({type: 'SET_UNAUTHORIZED'});
      return;
    }

    doFetch({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
      },
    });
    dispatch({type: 'LOADING'});
  }, [token, dispatch, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({type: 'SET_AUTHORIZED', payload: response.user});
  }, [response, dispatch]);

  return children;
};

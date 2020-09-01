import {useEffect, useContext} from 'react';
import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';

import {CurrentUserContext} from 'context/CurrentUserContext';

export const CurrentUserChecker = ({children}) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');
  const [{response}, doFetch] = useFetch('/user');

  useEffect(() => {
    if (!token) {
      setCurrentUserState((prevState) => ({
        ...prevState,
        isLoggedIn: false,
      }));
      return;
    }

    doFetch({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
      },
    });
    setCurrentUserState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
  }, [token, setCurrentUserState, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentUserState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setCurrentUserState]);

  return children;
};

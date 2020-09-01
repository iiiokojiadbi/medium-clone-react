import React, {useEffect, useContext} from 'react';
import useFetch from 'hooks/useFetch';
import {CurrentUserContext} from 'context/CurrentUserContext';

export const CurrentUserChecker = ({children}) => {
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const [{response}, doFetch] = useFetch('/user');

  useEffect(() => {
    console.log('init');
    doFetch();
    setCurrentUserState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
  }, []);

  return children;
};

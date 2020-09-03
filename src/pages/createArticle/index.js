import React, {useEffect, useState, useContext} from 'react';

import {ArticleForm} from 'components';
import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from 'context/CurrentUserContext';

export const CreateArticle = () => {
  const apiUrl = '/articles';
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [token] = useLocalStorage('token');
  const [currentUserContext] = useContext(CurrentUserContext);

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const handleSubmit = (article) => {
    console.log(article);

    doFetch({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessSubmit(true);
  }, [response, setIsSuccessSubmit]);

  if (currentUserContext.isLoggedIn === false) {
    return <Redirect to='/' />;
  }

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  );
};

import React from 'react';

import {ArticleForm} from 'components';
import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';

export const CreateArticle = () => {
  const apiUrl = '/articles';
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [token] = useLocalStorage('token');

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

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

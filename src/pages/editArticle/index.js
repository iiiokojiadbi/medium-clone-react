import React, {useEffect, useState, useContext} from 'react';
import {ArticleForm} from 'components';
import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';
import {Redirect} from 'react-router-dom';
import {CurrentUserContext} from 'context/CurrentUserContext';

export const EditArticle = ({match}) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl);
  const [
    {
      response: updateArticleResponse,
      isLoading: isLoadingUpdateArticle,
      error: updateArticleError,
    },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [token] = useLocalStorage('token');
  const [initialValues, setInitialValuse] = useState(null);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [currentUserContext] = useContext(CurrentUserContext);

  useEffect(() => {
    doFetchArticle({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    const {title, description, body, tagList} = fetchArticleResponse.article;

    setInitialValuse({
      title,
      description,
      body,
      tagList,
    });
  }, [fetchArticleResponse]);

  const handleSubmit = (article) => {
    console.log(article);

    doUpdateArticle({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });
  };

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setIsSuccessSubmit(true);
  }, [updateArticleResponse, setIsSuccessSubmit]);

  if (currentUserContext.isLoggedIn === false) {
    return <Redirect to='/' />;
  }

  if (isSuccessSubmit) {
    return <Redirect to={`/articles/${updateArticleResponse.article.slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || []}
      initialValues={initialValues}
      isLoading={isLoadingUpdateArticle}
    />
  );
};

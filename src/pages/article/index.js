import React, {useEffect, useContext, useState} from 'react';
import useFetch from 'hooks/useFetch';
import {Link, Redirect} from 'react-router-dom';
import {Loading, TagList, ErrorMessage} from 'components';
import {CurrentUserContext} from 'context/CurrentUserContext';
import useLocalStorage from 'hooks/useLocalStorage';

export const Article = ({match}) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [
    {
      response: responseArticleFetch,
      error: errorArticle,
      isLoading: isLoadingArticle,
    },
    doFetchArticle,
  ] = useFetch(apiUrl);
  const [{response: responseArticleDelete}, doDeleteArticle] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);

  const isAuthor = () => {
    if (!responseArticleFetch || !currentUserState.isLoggedIn) {
      return false;
    }

    return (
      responseArticleFetch.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  useEffect(() => {
    doFetchArticle({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
      },
    });
  }, [doFetchArticle, token]);

  useEffect(() => {
    if (!responseArticleDelete) {
      return;
    }

    setIsSuccessDelete(true);
  }, [responseArticleDelete]);

  const handleDeleteArticle = () => {
    doDeleteArticle({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
      },
    });
  };

  if (isSuccessDelete) {
    return <Redirect to='/' />;
  }

  return (
    <div className='article-page'>
      <div className='banner'>
        {!isLoadingArticle && responseArticleFetch && (
          <>
            <h1 className='banner__title'>
              {responseArticleFetch.article.title}
            </h1>
            <div className='article__meta banner__desc'>
              <Link
                className='article__link article__link_image'
                to={`/profiles/${responseArticleFetch.article.author.username}`}
              >
                <img
                  className='article__image'
                  src={responseArticleFetch.article.author.image}
                  alt=''
                />
              </Link>
              <Link
                className='article__link article__link_name'
                to={`/profiles/${responseArticleFetch.article.author.username}`}
              >
                {responseArticleFetch.article.author.username}
              </Link>
              <span className='article__date'>
                {responseArticleFetch.article.createdAt}
              </span>
            </div>
            {isAuthor() && (
              <>
                <span>
                  <Link
                    to={`/articles/${responseArticleFetch.article.slug}/edit`}
                  >
                    Edit post
                  </Link>
                </span>
                <button onClick={handleDeleteArticle}>Delete post</button>
              </>
            )}
          </>
        )}
      </div>
      <div className='article-page__main'>
        {isLoadingArticle && <Loading />}
        {errorArticle && <ErrorMessage />}
        {!isLoadingArticle && responseArticleFetch && (
          <>
            <div>
              <p>{responseArticleFetch.article.body}</p>
            </div>
            <TagList tags={responseArticleFetch.article.tagList} />
          </>
        )}
      </div>
    </div>
  );
};

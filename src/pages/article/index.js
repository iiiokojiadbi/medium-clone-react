import React, {useEffect} from 'react';
import useFetch from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import {Loading, ErrorMessage, TagList} from 'components';

export const Article = ({match}) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [doFetch]);

  return (
    <div className='article-page'>
      <div className='banner'>
        {!isLoading && response && (
          <>
            <h1 className='banner__title'>{response.article.title}</h1>
            <div className='article__meta banner__desc'>
              <Link
                className='article__link article__link_image'
                to={`/profiles/${response.article.author.username}`}
              >
                <img
                  className='article__image'
                  src={response.article.author.image}
                  alt=''
                />
              </Link>
              <Link
                className='article__link article__link_name'
                to={`/profiles/${response.article.author.username}`}
              >
                {response.article.author.username}
              </Link>
              <span className='article__date'>
                {response.article.createdAt}
              </span>
            </div>
          </>
        )}
      </div>
      <div className='article-page__main'>
        {isLoading && <Loading />}
        {error && <ErrorMessage />}
        {!isLoading && response && (
          <>
            <div>
              <p>{response.article.body}</p>
            </div>
            <TagList tags={response.article.tagList} />
          </>
        )}
      </div>
    </div>
  );
};

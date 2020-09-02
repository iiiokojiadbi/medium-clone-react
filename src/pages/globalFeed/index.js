import React, {useEffect} from 'react';
import useFetch from 'hooks/useFetch';
import {Feed, Pagination, PopularTags, ErrorMessage, Loading} from 'components';
import {getPaginator, limit} from 'utils';
import {stringify} from 'query-string';
import 'blocks/banner.scss';
import 'blocks/homePage.scss';

export const GlobalFeed = ({location, match}) => {
  const {offset, currentPage} = getPaginator(location.search);
  const stringifyParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles?${stringifyParams}`;
  const url = match.url;
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [doFetch, currentPage]);

  return (
    <div className='home-page'>
      <div className='home-page__banner banner'>
        <h1 className='banner__title'>Medium clone</h1>
        <p className='banner__desc'>A place to share knowledge</p>
      </div>
      <div className='home-page__container'>
        <div className='home-page__main'>
          {isLoading && <Loading />}
          {error && <ErrorMessage />}
          {!isLoading && response && (
            <>
              <Feed articles={response.articles} />
              <Pagination
                total={response.articlesCount}
                limit={limit}
                url={url}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
        <PopularTags optionalClasses='home-page__tags' />
      </div>
    </div>
  );
};

import React, {useEffect} from 'react';
import useFetch from 'hooks/useFetch';
import {Loading, ErrorMessage} from 'components';
import {Link} from 'react-router-dom';

import 'blocks/sidebar.scss';

export const PopularTags = ({optionalClasses}) => {
  const [{response, isLoading, error}, doFetch] = useFetch('/tags');

  useEffect(() => {
    doFetch({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [doFetch]);
  console.log(response === null);

  if (response == null || isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className={`sidebar ${optionalClasses}`}>
      <p className='sidebar__title'>Popular tags</p>
      <div className='sidebar__list'>
        {response.tags.reverse().map((tag, index) => {
          return (
            <Link
              to={`/tags/${tag}`}
              className='sidebar__item-list'
              key={`${tag}${index}`}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

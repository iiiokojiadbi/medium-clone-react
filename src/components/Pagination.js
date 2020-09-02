import React from 'react';
import {range} from 'utils';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import 'blocks/pagination.scss';

const PaginationItem = ({page, currentPage, url}) => {
  const linkClasses = classNames({
    pagination__link: true,
    pagination__link_active: currentPage === page,
  });

  return (
    <li className='pagination__item'>
      <Link to={`${url}?page=${page}`} className={linkClasses}>
        {page}
      </Link>
    </li>
  );
};

export const Pagination = ({total, limit, url, currentPage}) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className='pagination'>
      {pages.map((page) => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      ))}
    </ul>
  );
};

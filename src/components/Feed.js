import React from 'react';
import {Link} from 'react-router-dom';
import {TagList} from './TagList';

import 'blocks/feed.scss';
import 'blocks/article.scss';

export const Feed = ({articles}) => {
  return (
    <div className='feed'>
      {articles.map((article, index) => (
        <div className='feed__article article' key={index}>
          <div className='article__meta'>
            <Link
              className='article__link article__link_image'
              to={`/profiles/${article.author.username}`}
            >
              <img
                className='article__image'
                src={article.author.image}
                alt=''
              />
            </Link>
            <Link
              className='article__link article__link_name'
              to={`/profiles/${article.author.username}`}
            >
              {article.author.username}
            </Link>
            <span className='article__date'>{article.createdAt}</span>
          </div>
          <Link
            className='article__link article__link_post'
            to={`/articles/${articles.slug}`}
          >
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <span>Read more...</span>
            <TagList
              tags={article.tagList}
              optionalClasses='article__tag-list'
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

import React from 'react';
import {Link} from 'react-router-dom';

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
          <Link className='article__link' to={`/articles/${articles.slug}`}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <span>Read more...</span>
            <ul className='tag-list'>
              {article.tagList.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Link>
        </div>
      ))}
    </div>
  );
};

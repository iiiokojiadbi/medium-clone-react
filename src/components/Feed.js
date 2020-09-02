import React from 'react';
import {Link} from 'react-router-dom';

export const Feed = ({articles}) => {
  return (
    <div className='feed'>
      {articles.map((article, index) => (
        <div className='feed__article article' key={index}>
          <div className='article__meta'>
            <Link
              className='article__link'
              to={`/profiles/${article.author.userName}`}
            >
              <img
                className='article__image'
                src={article.author.image}
                alt=''
              />
            </Link>
            <div>
              <Link
                className='article__link'
                to={`/profiles/${article.author.userName}`}
              >
                {article.author.userName}
              </Link>
              <span className='aticle__date'>{article.createdAt}</span>
            </div>
          </div>
          <Link className='article__link' to={`/articles/${articles.slug}`}>
            <h1>{article.title}</h1>
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

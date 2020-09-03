import React from 'react';
import 'blocks/tagList.scss';
import classNames from 'classnames';

export const TagList = ({tags, optionalClasses}) => {
  const listClasses = classNames({
    'tag-list': true,
    [optionalClasses]: optionalClasses,
  });

  console.log(listClasses);

  return (
    <ul className={listClasses}>
      {tags.map((tag) => (
        <li key={tag} className='tag-list__item-list'>
          {tag}
        </li>
      ))}
    </ul>
  );
};

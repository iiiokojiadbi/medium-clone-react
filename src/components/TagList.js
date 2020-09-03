import React from 'react';
import 'blocks/tagList.scss';
import classNames from 'classnames';

export const TagList = ({tags, optionalClasses}) => {
  const listClasses = classNames({
    'tag-list': true,
    [optionalClasses]: optionalClasses,
    'tag-list_block': !tags.length,
  });

  console.log(listClasses);

  return (
    <ul className={listClasses}>
      {tags.map((tag) => {
        return (
          <li key={tag} className='tag-list__item-list'>
            {tag}
          </li>
        );
      })}
    </ul>
  );
};

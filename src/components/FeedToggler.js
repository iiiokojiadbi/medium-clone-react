import React from 'react';
import {NavLink} from 'react-router-dom';
import 'blocks/feedToggler.scss';

export const FeedToggler = ({tagName}) => {
  return (
    <section className='feed-toggler'>
      <ul className='feed-toggler__list'>
        <li className='feed-toggler__item-list'>
          <NavLink
            to='/feed'
            className='feed-toggler__link'
            activeClassName='feed-toggler__link_active feed-toggler__item-list_active'
          >
            Your feed
          </NavLink>
        </li>
        <li className='feed-toggler__item-list'>
          <NavLink
            to='/'
            className='feed-toggler__link'
            activeClassName='feed-toggler__link_active feed-toggler__item-list_active'
            exact
          >
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className='feed-toggler__item-list'>
            <NavLink
              to={`/tags/${tagName}`}
              className='feed-toggler__link'
              activeClassName='feed-toggler__link_active feed-toggler__item-list_active'
            >
              #{tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </section>
  );
};

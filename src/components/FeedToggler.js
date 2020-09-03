import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import 'blocks/feedToggler.scss';
import {CurrentUserContext} from 'context/CurrentUserContext';

export const FeedToggler = ({tagName}) => {
  const [currentUserContext] = useContext(CurrentUserContext);

  return (
    <section className='feed-toggler'>
      <ul className='feed-toggler__list'>
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
        {currentUserContext.isLoggedIn && (
          <li className='feed-toggler__item-list'>
            <NavLink
              to='/feed'
              className='feed-toggler__link'
              activeClassName='feed-toggler__link_active feed-toggler__item-list_active'
            >
              Your feed
            </NavLink>
          </li>
        )}
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

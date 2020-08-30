import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import 'blocks/topBar.scss';

export const TopBar = () => {
  return (
    <nav className='top-bar'>
      <div className='top-bar__wrapper'>
        <Link className='top-bar__link top-bar__link_logo' to='/'>
          Medium
        </Link>
        <ul className='top-bar__list'>
          <li className='top-bar__item-list'>
            <NavLink
              exact
              className='top-bar__link'
              activeClassName='top-bar__link_active'
              to='/'
            >
              Home
            </NavLink>
          </li>
          <li className='top-bar__item-list'>
            <NavLink
              className='top-bar__link'
              activeClassName='top-bar__link_active'
              to='/login'
            >
              Sign in
            </NavLink>
          </li>
          <li className='top-bar__item-list'>
            <NavLink
              className='top-bar__link'
              activeClassName='top-bar__link_active'
              to='/register'
            >
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import 'blocks/topBar.scss';
import {CurrentUserContext} from 'context/CurrentUserContext';

export const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <nav className='top-bar'>
      <div className='top-bar__wrapper'>
        <Link className='top-bar__link top-bar__link_logo' to='/'>
          <h2 className='top-bar__logo'>Medium</h2>
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
          {!currentUserState.isLoggedIn && (
            <>
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
            </>
          )}
          {currentUserState.isLoggedIn && (
            <>
              <li className='top-bar__item-list'>
                <NavLink
                  className='top-bar__link'
                  activeClassName='top-bar__link_active'
                  to='/articles/new'
                >
                  New Post
                </NavLink>
              </li>
              <li className='top-bar__item-list'>
                <NavLink
                  className='top-bar__link'
                  activeClassName='top-bar__link_active'
                  to={`/profiles/${currentUserState.currentUser.username}`}
                >
                  <img src={currentUserState.currentUser.image} alt='' />
                  {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

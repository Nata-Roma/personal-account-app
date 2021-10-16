import { NavLink } from 'react-router-dom';
import './header.css';

export const Header = ({ currentLang, changeCurrentLang, activeLang }) => {
  return (
    <div className='header_container'>
      <NavLink exact to='/' className='header_logo'>
        LOGO
      </NavLink>
      <nav className='header_nav'>
        <NavLink
          exact
          to='/'
          className='header_tab'
          activeClassName='header_tab_active'
        >
          {currentLang?.home}
        </NavLink>
        <NavLink
          to='/contacts'
          className='header_tab'
          activeClassName='header_tab_active'
        >
          {currentLang?.contacts}
        </NavLink>
      </nav>
      <div className='lang_toggle'>
        <div
          className={activeLang ? 'lang_name lang_name_active' : 'lang_name'}
        >
          En
        </div>
        <div
          className={activeLang ? 'lang_icon' : 'lang_icon lang_icon_toggled'}
          onClick={() => changeCurrentLang(!activeLang)}
        >
          <span className='iconify' data-icon='system-uicons:toggle'></span>
        </div>
        <div
          className={activeLang ? 'lang_name' : 'lang_name lang_name_active'}
        >
          Ru
        </div>
      </div>
    </div>
  );
};

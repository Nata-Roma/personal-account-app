import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './app.css';
import { ContactPage } from './contactPage/ContactPage';
import { Header } from './header/Header';
import { HomePage } from './homePage.js/HomePage';
import { langEn, langRu } from './utils/lang';

function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(langEn);
  const [activeLang, setActiveLang] = useState(true);

  const changeCurrentLang = (activeLang) => {
    setActiveLang(activeLang);
    activeLang ? setLang(langEn) : setLang(langRu);
  };

  const onGetUser = (userData) => {
    setUser(userData);
  };

  return (
    <div className='app_container'>
      <Header
        currentLang={lang.header}
        changeCurrentLang={changeCurrentLang}
        activeLang={activeLang}
      />
      <Switch>
        <Route exact path='/'>
          <HomePage onGetUser={onGetUser} user={user} currentLang={lang.home} />
        </Route>
        <Route path='/contacts'>
          {!user ? (
            <Redirect to='/' />
          ) : (
            <ContactPage user={user} currentLang={lang.contacts} />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;

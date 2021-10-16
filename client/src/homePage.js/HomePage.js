import { useCallback, useEffect, useState } from 'react';
import { getUserLogData } from '../api-services/api-services';
import { AuthPage } from '../authPage/AuthPage';
import './homePage.css';

export const HomePage = ({ onGetUser, user, currentLang }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [auth, setAuth] = useState(null);

  const onAuthClick = (inputName, inputPass) => {
    setIsConfirmed(true);
    setAuth({ name: inputName, password: inputPass });
  };

  const getUser = useCallback(async () => {
    const userFound = await getUserLogData(auth.name, auth.password);
    if (userFound) {
      setIsConfirmed(false);
      onGetUser(userFound);
      setAuth(null);
    } else {
      onGetUser(null);
    }
  }, [auth, onGetUser]);

  useEffect(() => {
    if (isConfirmed) {
      getUser();
    }
  }, [isConfirmed, getUser]);

  return (
    <div className='home_container'>
      {!user && (
        <AuthPage
          onAuthClick={onAuthClick}
          clearAuth={!!user}
          currentLang={currentLang.auth}
        />
      )}
      {user && 'Home Page. You are logged in'}
    </div>
  );
};

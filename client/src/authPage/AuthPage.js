import { useEffect, useState } from 'react';
import './authPage.css';

export const AuthPage = ({ clearAuth, onAuthClick, currentLang }) => {
  const [inputName, setInputName] = useState('');
  const [inputPass, setInputPass] = useState('');

  useEffect(() => {
    if (clearAuth) {
      setInputName('');
      setInputPass('');
    }
  }, [clearAuth]);

  return (
    <div className='auth_container'>
      <div className='auth_inner'>
        <div className='auth_title'>{currentLang.title}</div>
        <div className='auth_block-input'>
          <label htmlFor='name' className='auth_label'>
            {currentLang.name}
          </label>
          <input
            type='text'
            name='name'
            placeholder='...'
            className='auth_input'
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className='auth_block-input'>
          <label htmlFor='name' className='auth_label'>
          {currentLang.password}
          </label>
          <input
            type='password'
            name='password'
            placeholder='...'
            className='auth_input'
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
          />
        </div>
        <button
          className='auth_btn'
          onClick={() => onAuthClick(inputName, inputPass)}
        >
          {currentLang.confirm}
        </button>
      </div>
    </div>
  );
};

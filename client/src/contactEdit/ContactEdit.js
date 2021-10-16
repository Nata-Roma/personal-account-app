import { useCallback, useEffect, useState } from 'react';
import { contactActions } from '../utils/config';
import './contactEdit.css';

export const ContactEdit = ({
  contact,
  onEditConfirm,
  onCloseEdit,
  action,
  currentLang,
}) => {
  const [contactName, setContactName] = useState('');
  const [contactSurname, setContactSurname] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const onEditClick = () => {
    const amendedContact = {
      id: contact.id,
      name: contactName.trim(),
      surname: contactSurname.trim(),
      email: contactEmail.trim(),
    };
    onEditConfirm(action, amendedContact);
  };

  const setInitialData = useCallback(() => {
    setContactName(contact.name);
    setContactSurname(contact.surname);
    setContactEmail(contact.email);
  }, [contact]);

  useEffect(() => {
    setInitialData();
  }, [setInitialData]);

  return (
    <div className='edit_container'>
      <div className='edit_inner'>
        <div className='edit_title'>
          {action === contactActions.amend
            ? currentLang.titleEdit
            : currentLang.titleCreate}
        </div>
        <div className='edit_block-input'>
          <label htmlFor='name' className='edit_label'>
            {currentLang.name}
          </label>
          <input
            type='text'
            name='name'
            placeholder='...'
            className='edit_input'
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div className='edit_block-input'>
          <label htmlFor='surname' className='edit_label'>
            {currentLang.surname}
          </label>
          <input
            type='text'
            name='surname'
            placeholder='...'
            className='edit_input'
            value={contactSurname}
            onChange={(e) => setContactSurname(e.target.value)}
          />
        </div>
        <div className='edit_block-input'>
          <label htmlFor='name' className='edit_label'>
            {currentLang.email}
          </label>
          <input
            type='email'
            name='email'
            placeholder='...'
            className='edit_input'
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <div className='btn_container'>
          <button className='edit_btn' onClick={() => onEditClick()}>
            {currentLang.confirm}
          </button>
          <button className='edit_btn' onClick={onCloseEdit}>
            {currentLang.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

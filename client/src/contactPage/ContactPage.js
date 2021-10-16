import { useCallback, useEffect, useState } from 'react';
import { ContactCard } from '../contactCard/ContactCard';
import { ContactEdit } from '../contactEdit/ContactEdit';
import {
  deleteContact,
  getUserContacts,
  postNewContact,
  putAmendedContact,
  searchContacts,
} from '../api-services/api-services';
import './contactPage.css';
import { contactActions, nullContact } from '../utils/config';

export const ContactPage = ({ user, currentLang }) => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [createContact, setCreateContact] = useState(null);
  const [searchData, setSearchData] = useState('');

  const onEditContact = (id) => {
    const contactFound = contacts.find((contact) => contact.id === id);
    if (contactFound) {
      setEditContact(contactFound);
    }
  };

  const onCreateContact = () => {
    setCreateContact({ ...nullContact });
  };

  const onCloseEdit = () => {
    setEditContact(null);
    setCreateContact(null);
  };

  const onEditConfirm = async (action, contactAmended) => {
    if (action === contactActions.amend) {
      const putRes = await putAmendedContact(contactAmended);
      if (putRes === 200) {
        getContacts(user);
      }
    }
    if (action === contactActions.create) {
      delete contactAmended.id;
      const postRes = await postNewContact(contactAmended);
      if (postRes === 201) {
        getContacts(user);
      }
    }
    onCloseEdit();
  };

  const onDeleteContact = async (id) => {
    const deleteRes = await deleteContact(id);
    if (deleteRes === 200) {
      getContacts(user);
    }
  };

  const onSearchContactData = async () => {
    const searchResults = await searchContacts(searchData);
    if(searchResults) {
      setContacts(searchResults)
    }
  }

  const getContacts = useCallback(async (user) => {
    const contacts = await getUserContacts(user.name);
    setContacts(contacts);
  }, []);

  useEffect(() => {
    getContacts(user);
  }, [user, getContacts]);

  return (
    <div className='contacts_page'>
      <div className='contacts_header'>
        <div className='contacts_header_title_wrapper'>
          <div className='contacts_title'>{currentLang.title}</div>
          <div className='add_icon' onClick={onCreateContact}>
            <span className='iconify' data-icon='system-uicons:user-add'></span>
          </div>
        </div>

        <div className='search'>
          <input
            type='text'
            name='search'
            className='search_input'
            placeholder={currentLang.search}
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <div className='search_icon' onClick={onSearchContactData}>
            <span
              className='iconify'
              data-icon='system-uicons:search'
            ></span>
          </div>
        </div>
      </div>
      <div className='contacts_container'>
        {contacts &&
          contacts.map((contact) => (
            <ContactCard
              onEditContact={onEditContact}
              onDeleteContact={onDeleteContact}
              key={contact.id}
              contact={contact}
            />
          ))}
      </div>
      {editContact && (
        <ContactEdit
          contact={editContact}
          onEditConfirm={onEditConfirm}
          onCloseEdit={onCloseEdit}
          action={contactActions.amend}
          currentLang={currentLang.popup}
        />
      )}
      {createContact && (
        <ContactEdit
          contact={createContact}
          onEditConfirm={onEditConfirm}
          onCloseEdit={onCloseEdit}
          action={contactActions.create}
          currentLang={currentLang.popup}
        />
      )}
    </div>
  );
};

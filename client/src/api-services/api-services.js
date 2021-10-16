import { BASE_URL } from '../utils/config';

export const getUserLogData = async (name, password) => {
  const res = await fetch(`${BASE_URL}/users?name=${name}&q=${password}`);
  if (res.ok) {
    const users = await res.json();
    return users[0];
  }
};

export const getUserContacts = async (user) => {
  const res = await fetch(`${BASE_URL}/contacts`);
  if (res.ok) {
    const contacts = await res.json();
    return contacts;
  }
};

export const deleteContact = async (id) => {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.status;
};

export const postNewContact = async (contact) => {
  const res = await fetch(`${BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  return res.status;
};

export const putAmendedContact = async (contact) => {
  const res = await fetch(`${BASE_URL}/contacts/${contact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  return res.status;
};

export const searchContacts = async (searchData) => {
  const res = await fetch(`${BASE_URL}/contacts?q=${searchData}`);
  const data = await res.json();
  return data;
};

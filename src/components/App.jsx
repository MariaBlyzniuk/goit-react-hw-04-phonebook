import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import {ContactForm} from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import Notiflix from 'notiflix';

export function App() {
  const [contacts, setContacts] = useState([
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');


    useEffect(() => {
    // const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const handleAddContact = contact => {
    const addContact = { id: nanoid(3), ...contact };

    if (contacts.find(contact => contact.name.toLowerCase() === addContact.name.toLowerCase())) {
      Notiflix.Confirm.show(`${contact.name} is already in contacts.`);
    } else {
      setContacts(prevContacts  => [addContact, ...prevContacts] );
    }
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => id !== contact.id),
    );
  };

  const handleVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  
  const handleFilterContacts = e => {
    setFilter(e.currentTarget.value);
  };

    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit ={handleAddContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterContacts} />
        <ContactList
          contacts={handleVisibleContacts()}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  
}

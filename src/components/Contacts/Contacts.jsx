import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContactsError,
  selectContactsIsLoading,
} from 'redux/contactsReducer';

import s from './contacts.module.css';

import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Loader } from 'components/Loader/Loader';
import { requestContacts } from 'redux/contactsReducer';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(requestContacts());
  }, [dispatch]);

  return (
    <>
      <section className={s.contacts}>
        <Section title={'Phonebook'}>
          <ContactForm />
        </Section>

        <Section title={'Contacts'}>
          <Filter />
          {isLoading && !error && <Loader />}
          {error && <p>{error}</p>}
          <ContactList />
        </Section>
      </section>
    </>
  );
};

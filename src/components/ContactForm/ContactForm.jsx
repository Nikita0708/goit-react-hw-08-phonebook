import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'formik';
import 'yup-phone';

import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsReducer';
import { useSelector } from 'react-redux/es/exports';
import { selectContacts } from 'redux/contactsReducer';
import s from './contactform.module.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  number: yup.string().required('Number is required'),
});

const idInputName = nanoid();
const idInputNumber = nanoid();

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const hasName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasName) {
      alert(`${name} is alredy in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <div className={s.item}>
          <label htmlFor={idInputName}>Name</label>
          <Field
            id={idInputName}
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <ErrorMessage name="name" component="p" className={s.error} />
        </div>
        <div className={s.item}>
          <label htmlFor={idInputNumber}>Number</label>
          <Field
            id={idInputNumber}
            type="tel"
            name="number"
            placeholder="+0000000000000"
            required
          />
          <ErrorMessage name="number" component="p" className={s.error} />
        </div>

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

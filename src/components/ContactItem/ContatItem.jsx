import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux/es/exports';
import { deleteContact } from 'redux/contactsReducer';
import s from './contactitem.module.css';
export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  return (
    <li className={s.item}>
      <p className={s.text}>
        <b>{name}</b>:&nbsp;{number}
      </p>
      <button
        type="button"
        className={s.btn}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

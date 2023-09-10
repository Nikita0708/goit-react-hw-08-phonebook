import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux/es/exports';
import { deleteContact } from 'redux/operations';
import s from './contactitem.module.css';
export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  return (
    <li className={s.item}>
      <p>
        {name}:&nbsp;{number}
      </p>
      <button type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete contact
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

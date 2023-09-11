import { useDispatch, useSelector } from 'react-redux';
import { setFilterContacts } from 'redux/filterReducer';
import { selectFilter } from 'redux/selectors';
import s from './filter.module.css';
export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  return (
    <div className={s.wrap}>
      <label className={s.label}>Find contact by name</label>
      <input
        type="text"
        name="filter"
        value={filter}
        className={s.input}
        placeholder="Start typing..."
        onChange={event =>
          dispatch(setFilterContacts(event.currentTarget.value))
        }
      />
    </div>
  );
};

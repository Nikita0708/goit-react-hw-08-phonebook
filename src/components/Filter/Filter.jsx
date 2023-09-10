import { useDispatch, useSelector } from 'react-redux';
import { setFilterContacts } from 'redux/filterReducer';
import { selectFilter } from 'redux/selectors';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  return (
    <div>
      <label>Find contact by name</label>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={event =>
          dispatch(setFilterContacts(event.currentTarget.value))
        }
      />
    </div>
  );
};

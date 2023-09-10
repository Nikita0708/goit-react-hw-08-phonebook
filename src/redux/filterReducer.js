import { createSlice } from '@reduxjs/toolkit';

const filterInitialeState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialeState,
  reducers: {
    setFilterContacts(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setFilterContacts } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const token = {
  set: token => (instance.defaults.headers['Authorization'] = token),
  clear: () => {
    instance.defaults.headers['Authorization'] = '';
  },
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('users/signup', formData);
      token.set(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('users/login', formData);
      token.set(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async thunkApi => {
    try {
      await instance.post('users/logout');
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userToken = state.auth.token;

      token.set(userToken);
      const { data } = await instance.get('users/current');

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const token = state.auth.token;

      if (!token) return false;
    },
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    isLoading: false,
    authenticated: false,
    token: null,
    error: null,
  },
  extraReducers: builder =>
    builder
      // register
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // login
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = false;
        state.userData = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // refresh User
      .addCase(refreshUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const selectUserAuthentication = state => state.auth.authenticated;
export const selectUserData = state => state.auth.userData;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectUserToken = state => state.auth.token;

export const authReducer = authSlice.reducer;

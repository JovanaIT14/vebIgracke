import { createSlice } from '@reduxjs/toolkit';
import users from '../users';

const getStoredValue = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const getInitialUsers = () => {
  const storedUsers = getStoredValue('users', users);
  const hasAdmin = storedUsers.some((user) => user.isAdmin);

  return hasAdmin ? storedUsers : [users[0], ...storedUsers];
};

const saveAuthState = (state) => {
  localStorage.setItem('users', JSON.stringify(state.userList));
  localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
};

const initialState = {
  userList: getInitialUsers(),
  currentUser: getStoredValue('currentUser', null),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload._id || action.payload.token) {
        state.currentUser = {
          ...action.payload,
          id: action.payload._id || action.payload.id,
          orders: action.payload.orders || [],
        };
        saveAuthState(state);
        return;
      }

      const { email, password } = action.payload;
      const user = state.userList.find((item) => item.email === email && item.password === password);

      if (user) {
        state.currentUser = user;
        saveAuthState(state);
      }
    },
    register: (state, action) => {
      if (action.payload._id || action.payload.token) {
        const newUser = {
          ...action.payload,
          id: action.payload._id || action.payload.id,
          orders: action.payload.orders || [],
        };

        const existingUser = state.userList.find((item) => item.email === newUser.email);

        if (!existingUser) {
          state.userList.push(newUser);
        }

        state.currentUser = newUser;
        saveAuthState(state);
        return;
      }

      const { name, email, password } = action.payload;
      const existingUser = state.userList.find((item) => item.email === email);

      if (!existingUser) {
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          orders: [],
        };

        state.userList.push(newUser);
        state.currentUser = newUser;
        saveAuthState(state);
      }
    },
    logout: (state) => {
      state.currentUser = null;
      saveAuthState(state);
    },
    setCredentials: (state, action) => {
      state.currentUser = {
        ...action.payload,
        id: action.payload._id || action.payload.id,
        orders: action.payload.orders || [],
      };
      saveAuthState(state);
    },
  },
});

export const { login, register, logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;

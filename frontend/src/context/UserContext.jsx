import { createContext, useContext, useEffect, useState } from 'react';
import users from '../users';

const UserContext = createContext();

const getStoredValue = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState(() => getStoredValue('users', users));
  const [currentUser, setCurrentUser] = useState(() => getStoredValue('currentUser', null));

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userList));
  }, [userList]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (email, password) => {
    const user = userList.find((item) => item.email === email && item.password === password);

    if (!user) {
      return false;
    }

    setCurrentUser(user);
    return true;
  };

  const register = (name, email, password) => {
    const existingUser = userList.find((item) => item.email === email);

    if (existingUser) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      orders: [],
    };

    setUserList((items) => [...items, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ userList, currentUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

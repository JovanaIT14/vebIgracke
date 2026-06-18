import { useDispatch, useSelector } from 'react-redux';
import {
  login as loginAction,
  logout as logoutAction,
  register as registerAction,
} from '../slices/authSlice';

export const UserProvider = ({ children }) => {
  return children;
};

export const useUser = () => {
  const dispatch = useDispatch();
  const { userList, currentUser } = useSelector((state) => state.auth);

  const login = (email, password) => {
    const user = userList.find((item) => item.email === email && item.password === password);

    if (!user) {
      return false;
    }

    dispatch(loginAction({ email, password }));
    return true;
  };

  const register = (name, email, password) => {
    const existingUser = userList.find((item) => item.email === email);

    if (existingUser) {
      return false;
    }

    dispatch(registerAction({ name, email, password }));
    return true;
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return { userList, currentUser, login, register, logout };
};

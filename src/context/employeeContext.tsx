import { useState, useCallback, useMemo, createContext } from 'react';

import * as ApiLayer from '../api/apiLayer';

export declare interface IEmployee {
  name: string;
  firebaseId: string;
  businessId: string;
  role: string;
}

// @ts-expect-error
const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const initialState: IEmployee = {
  name: '',
  firebaseId: '',
  businessId: '',
  role: '',
};

const AuthProvider = (props: any): JSX.Element => {
  const [employee, setEmployee] = useState(initialState);

  const login = useCallback(
    async (form: IEmployee) =>
      await ApiLayer.login(form).then((data: IEmployee) => {
        setEmployee(data);
        sessionStorage.setItem('employee', JSON.stringify(data));
      }),
    [setEmployee],
  );

  const register = useCallback(
    async (form: IEmployee) =>
      await ApiLayer.register(form).then((data: IEmployee) => {
        setEmployee(data);
        sessionStorage.setItem('employee', JSON.stringify(data));
      }),
    [setEmployee],
  );

  const logout = useCallback(
    (callback: Function) => {
      ApiLayer.logout();
      setEmployee(initialState);
      sessionStorage.clear();
      callback();
    },
    [setEmployee],
  );

  const load = useCallback(() => {
    setEmployee(JSON.parse(sessionStorage.getItem('employee') ?? ''));
  }, [setEmployee]);

  const value = useMemo(
    () => ({ employee, login, logout, load, register }),
    [login, logout, register, load, employee],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, AuthContext };

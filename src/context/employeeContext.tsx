import { useState, useCallback, useMemo, createContext } from 'react';

import * as ApiLayer from '../api/apiLayer';

declare interface IEmployee {
  name: string
  firebaseId: string
  businessId: string
}

// @ts-expect-error
const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const initialState: IEmployee = {
  name: '',
  firebaseId: '',
  businessId: '',
};

const AuthProvider = (props: any): JSX.Element => {
  const [employee, setEmployee] = useState(initialState);

  const login = useCallback(
    async (form: IEmployee) => await ApiLayer.login(form).then((data: IEmployee) => setEmployee(data)),
    [setEmployee]
  );
  const register = useCallback(
    async (form: IEmployee) => await ApiLayer.register(form).then((data: IEmployee) => setEmployee(data)),
    [setEmployee]
  );
  const logout = useCallback(() => {
    ApiLayer.logout();
    setEmployee(initialState);
  }, [setEmployee]);

  const value = useMemo(
    () => ({ employee, login, logout, register }),
    [login, logout, register, employee]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, AuthContext };

import React, {useState} from 'react';

export const UserInfoContext = React.createContext();

export const UserInfoContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [rememberEmail, setRememberEmail] = useState();
  const [student, setStudent] = useState();

  return (
    <UserInfoContext.Provider
      value={{
        user,
        setUser,
        rememberEmail,
        setRememberEmail,
        student,
        setStudent,
      }}>
      {children}
    </UserInfoContext.Provider>
  );
};

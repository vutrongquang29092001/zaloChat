import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext = React.createContext();
// phụ trách đăng nhập chuyển hướng
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const i = 0;
  React.useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        navigate('/chatRoom');
        return;
      }

      // reset user info
      setUser({});
      setIsLoading(false);
      navigate('/login');
    });

    // clean function
    return () => {
      unsubscibed();
    };
  }, [navigate]);
  console.log({ user })

  return (
    <AuthContext.Provider value={{ user }}>

      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
}
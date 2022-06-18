import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { auth } from '../firebase/config';




const Context = createContext(undefined);



const Provider = ({ children }) => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

   {/** React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                
                setUser({
                    displayName, email, uid, photoURL
                });
                // chuyển hướng sang chat room
                setIsLoading(false)
                navigate('/chatRoom');
               
                return;
            }
            setUser({});
            setIsLoading(false);
            navigate('/login');
        });
        return () => {
            unsubscibed();
        };
    }, [navigate]);  */}
  return (
    <Context.Provider value={{ test: "123" }}>{children}</Context.Provider>
  );
};

export function useProvider() {
  const context = useContext(Context);
  if (typeof context === "undefined")
    throw new Error("useProvider must be within a Provider");
  return context;
}

export default Provider;

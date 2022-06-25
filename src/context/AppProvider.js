import React, { useState } from 'react';
import useFirestore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

// lấy dữ liệu rooms của acc
export default function AppProvider({ children }) {

    const [isAddRoomVisible, setIsAddRoomVisible] =  useState(false);
    const [selectedRoomId, setSelectedRoomId] =  useState('');
    const {
        user: { uid },
      } = React.useContext(AuthContext);
    
      const roomsCondition = React.useMemo(() => {
        return {
          fieldName: 'members',
          operator: 'array-contains',
          compareValue: uid,
        };
      }, [uid]);
    
      const rooms = useFirestore('rooms', roomsCondition);
       // console.log({rooms});
    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible,selectedRoomId, setSelectedRoomId }}>
            {children}
        </AppContext.Provider>
    );

}



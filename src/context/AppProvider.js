import React, { useEffect, useState } from 'react';
import useFirestore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';
import { db } from '../firebase/config';


export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [members, setMembers] = useState([]);


  const {
    user: { uid },
  } = React.useContext(AuthContext);

  // lấy rooms của user 
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore('rooms', roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  // const members = useFirestore('users', usersCondition);

  useEffect(() => {
    if(selectedRoomId) {
      db.collection("rooms").doc(selectedRoomId).onSnapshot((doc) => {
        const memberList = []
        const memberIds = doc.data().members

        db.collection("users").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            memberIds.forEach(member => {
              if(doc.data().uid === member) {
                memberList.push(doc.data())
              }
            })
          });

          setMembers(memberList)
        })
        
      });
    }
  }, [selectedRoomId])
 
  const clearState = () => {
    setSelectedRoomId('');
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
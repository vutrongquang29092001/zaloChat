import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoomModal from './Modals/AddRoomModal';
import InviteMemberModal from './Modals/inviteMemberModal';
function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={

          <AuthProvider>
            <AppProvider>
              <Login />
              <AddRoomModal />
              <InviteMemberModal/>
            </AppProvider>
          </AuthProvider>

        } />

        <Route path="/chatRoom" element={
          <AuthProvider>
            <AppProvider>
              <ChatRoom />
              <AddRoomModal />
              <InviteMemberModal/>
            </AppProvider>
          </AuthProvider>
        } />
      </Routes>

    </BrowserRouter >
  );
}

export default App;

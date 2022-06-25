import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoomModal from './Modals/AddRoomModal';
function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={

          <AuthProvider>
            <AppProvider>
              <Login />
              <AddRoomModal />
            </AppProvider>
          </AuthProvider>

        } />

        <Route path="/chatRoom" element={
          <AuthProvider>
            <AppProvider>
              <ChatRoom />
              <AddRoomModal />
            </AppProvider>
          </AuthProvider>
        } />
      </Routes>

    </BrowserRouter >
  );
}

export default App;

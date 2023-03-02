import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileList from './components/ProfileList';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/profileList' element={<ProfileList />} />
        <Route path='/profileDetails/:id' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

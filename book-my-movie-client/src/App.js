import React from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import SignInScreen from './screens/signin';
import SignUpScreen from './screens/signup';
import AdminPage from './screens/admin/index';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>}/>
        <Route path="/signup" element={<SignUpScreen/>}/>
        <Route path="/signin" element={<SignInScreen/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

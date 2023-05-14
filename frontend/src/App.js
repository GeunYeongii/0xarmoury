import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import MainHome from './mainPage';
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<MainHome />}></Route>
        <Route path = "SignIn" element = {<SignIn />}></Route>
        <Route path = "SignUp" element = {<SignUp />}></Route>
      </Routes>

      

    </Router>
  );
}

export default App;

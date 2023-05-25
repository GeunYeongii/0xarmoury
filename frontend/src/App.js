import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import MainHome from './mainPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Gallery from './Gallery';
import GalleryDetail from './GalleryDetail';
import ToolUpload from './ToolUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<MainHome />}></Route>
        <Route path = "SignIn" element = {<SignIn />}></Route>
        <Route path = "SignUp" element = {<SignUp />}></Route>
        <Route path = "Gallery" element = {<Gallery />}></Route>
        <Route path = "GalleryDetail" element = {<GalleryDetail />}></Route>
        <Route path = "ToolUpload" element = {<ToolUpload />}></Route>

      </Routes>

      

    </Router>
  );
}

export default App;

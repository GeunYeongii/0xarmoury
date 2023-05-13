import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import './App.css';

function MainPage(){
    const [jsonData, setHello] = useState('')

  useEffect(() => {
      axios.get('/api/test')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
  }, []);

    return(
        <div>
            <header className="App-header">
                <h3>This is main Page</h3>

                <Link to = './SignIn'>
                    <button>SignIn</button>
                </Link>

                <Link to = './SignUp'>
                    <button>SignUp</button>
                </Link>

                <Link to = './VncTest'>
                    <button>VNC</button>
                </Link>

                <p>
                    MITRE ATT&CK Json file
                </p>

                <div>
                    {JSON.stringify(jsonData)}
                </div>
            </header>
        </div>
    );
}

export default MainPage;
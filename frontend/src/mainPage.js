import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import './App.css';
import Button from '@mui/material/Button';
import './mainPage.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

function MainPage(){
    const [jsonData, setHello] = useState('')

  useEffect(() => {
      axios.get('/api/test')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
  }, []);

    return(
        <div>
            <div className="container">
                {/*logo*/}
                <Link href ="/">    
                    <Button startIcon={<img src="/img/armoury_logo.png" alt="Armoury" width={60} height={60}/>} sx={{
                    margin:1
                    ,fontSize:30
                    ,color:"black"
                    }}>
                    <strong>0xARMOURY</strong>
                    </Button>
                </Link>

                <div className='outline-container'>
                    <div className="button-container">
                        <Link href ="#" color='#000000'>Matric</Link>
                        <Link href="#" color='#000000'>Tools</Link>
                        <Link href ="#" color='#000000'>Training</Link>
                        <Link href ="#" color='#000000'>Gallery</Link>
                        <Link href ="#" color='#000000'>My page</Link>
                    </div>
                </div>
                
                <Box sx={{ '& > :not(style)': { m: 1 } , justifyContent: "flex-end"}}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                            <SearchIcon/>
                            </InputAdornment>
                        )
                        ,
                        }}
                        variant="standard"
                    />
                </Box>
            </div>
            {/*App.css*/}
            <header className="App-header">
                <h3>This is main Page</h3>

                <Link href = './SignIn'>
                    <button>SignIn</button>
                </Link>

                <Link href = './SignUp'>
                    <button>SignUp</button>
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


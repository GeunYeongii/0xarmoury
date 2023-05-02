import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
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
            <div className='container-right'>
                <div className="sign-container">
                    <Link href ="./SignIn" color='#000000'>Sign In</Link>
                    <Link href="./SignUp" color='#000000'>Sign Up</Link>
                </div>
            </div>
            <div className="container">
                {/*logo*/}
                <Link href ="/">    
                    <Button startIcon={<img src="/img/armoury_logo.png" alt="Armoury" width={60} height={60}/>} sx={{
                    mr:1
                    ,fontSize:30
                    ,color:"black"
                    }}>
                    <strong>0xARMOURY</strong>
                    </Button>
                </Link>

                <div className='container-right'>
                    <div className='outline-container'>
                        <div className="button-container">
                            <Link href ="#" color='#000000'>Matric</Link>
                            <Link href="/tools" color='#000000'>Tools</Link>
                            <Link href ="#" color='#000000'>Training</Link>
                            <Link href ="#" color='#000000'>Gallery</Link>
                            <Link href ="#" color='#000000'>My page</Link>
                        </div>
                    </div>
                    
                    <Box sx={{ '& > :not(style)': { m: 1 } , justifyContent: "flex-end"}}>
                        <TextField
                            id="input-with-icon-textfield"
                            
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
            </div>
            <div className = 'division-line'></div>
            <div className='container-body1' >
                <div className='container-body2'>
                    <h3>This is main Page</h3>

                    <p>
                        MITRE ATT&CK Json file
                    </p>

                    <div>
                        {JSON.stringify(jsonData)}
                    </div>
                </div>
                <div className='container-body3'>
                    <img src='/img/Main_logo.png' alt="Main_logo" width={'65%'} height={'65%'} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;


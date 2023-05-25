import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './GalleryDetail.css'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function MainPage(){
    const [jsonData, setHello] = useState('')

    {/* 
    useEffect(() => {
      axios.get('/api/test')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
    }, []);
    */}

    const Logout = () => {
        localStorage.removeItem("accessToken");
    }

    return(
        <div>
            <div className='container-right'>
                <div>
                    <div>
                    {
                        localStorage.getItem("accessToken") == null
                        ?<div className="sign-container"><Link href ="./SignIn" color='#000000'>Sign In</Link>
                        <Link href="./SignUp" color='#000000'>Sign Up</Link></div>
                        :<div className="sign-container"><Link href ="#" color='#000000'>username</Link>
                        <Link href="./" onClick={Logout} color='#000000'>logout</Link></div>
                    }
                    </div>
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
                            <Link href="#" color='#000000'>Tools</Link>
                            <Link href ="#" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#0042ED'>Gallery</Link>
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
                <div className='gallery-container'>
                    <div className='gallery-title'>
                        <div className='gallery-title-tool'>
                            Nmap
                        </div>
                        <div className='gallery-title-info'>
                            <div>user-name <AccountCircleIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', color: '#4C4C4C'}}/></div>
                            <div>2023-05-24</div>
                        </div>

                    </div>

                    <div className='gallery-division-line'></div>

                    <div className='gallery-body'>
                        <div className='gallery-body-tool'>
                            <DownloadForOfflineOutlinedIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', mr: '2px', color: 'black'}}/>
                            <Link sx={{color: '#050099'}}>http://tool_download_link_i_want_to_sleep.com</Link>
                        </div>
                        <div className='gallery-body-maintext'>
                                this is tool detail information. i want to sleep...<br></br>this is tool detail information. i want to sleep...<br></br>this is tool detail information. i want to sleep...<br></br>this is tool detail information. i want to sleep...<br></br>this is tool detail information. i want to sleep...<br></br>this is tool detail information. i want to sleep...<br></br>this is tool detail information. i want to sleep...<br></br>this is tool detail information. i want to sleep...<br></br>
                        </div>
                        <TextField sx={{width: '99.5%', mt: '30px'}}
                            id="standard-textarea"
                            label="Comment"
                            placeholder="Enter your comment"
                            multiline
                            rows={3}
                            variant="filled"
                        />
                        <div className='gallery-body-right'>
                            <Button sx={{backgroundColor: '#353535', '&:hover': {backgroundColor: '#232323'}}} variant="contained" endIcon={<AddCircleOutlineOutlinedIcon />}>
                                Add Comment
                            </Button>
                        </div>
                        <div className='gallery-body-comment'>
                            <div className='gallery-body-comment-title'>
                                <MessageOutlinedIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', mr: '3px', mt: '2px'}} />
                                <div className='gallery-comment-text1'>
                                    Name1
                                </div>
                                <div className='gallery-comment-text2'>
                                    2023-05-25
                                </div>
                            </div>
                            <div className='gallery-body-comment-content'>
                                this is comment <br></br> i want to sleep..............
                            </div>
                            
                        </div>
                        <div className='gallery-body-comment'>
                            <div className='gallery-body-comment-title'>
                                <MessageOutlinedIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', mr: '3px', mt: '2px'}} />
                                <div className='gallery-comment-text1'>
                                    Name2
                                </div>
                                <div className='gallery-comment-text2'>
                                    2023-05-25
                                </div>
                            </div>
                            <div className='gallery-body-comment-content'>
                                this is comment <br></br> i want to sleep..............
                            </div>
                            
                        </div>
                        <div className='gallery-body-comment'>
                            <div className='gallery-body-comment-title'>
                                <MessageOutlinedIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', mr: '3px', mt: '2px'}} />
                                <div className='gallery-comment-text1'>
                                    Name3
                                </div>
                                <div className='gallery-comment-text2'>
                                    2023-05-25
                                </div>
                            </div>
                            <div className='gallery-body-comment-content'>
                                this is comment <br></br> i want to sleep..............
                            </div>
                            
                        </div>

                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default MainPage;


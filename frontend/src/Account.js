import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './MyTools.css';
import './ToolUpload.css';
import './Account.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import BuildIcon from '@mui/icons-material/Build';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SchoolIcon from '@mui/icons-material/School';

function Account(){
	const [UserId, setUserId] = useState(localStorage.getItem("userId"));
	const badge = localStorage.getItem('badge');

    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickName");
		localStorage.removeItem("email");
        localStorage.removeItem("badge");
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
                        :<div className="sign-container">
							<div>
                            <SchoolIcon style={{ color: badge > 5 ? '#F15F5F' : '#6B66FF', verticalAlign: 'bottom', marginRight: 8}}/> 
                            <Link href ="./Account" color='#000000'>          
                                {localStorage.getItem('nickName')}
                            </Link>
                            </div>
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
                            <Link href ="./Matrix" color='#000000'>Matrix</Link>
                            <Link href="./Tools" color='#000000'>Tools</Link>
                            <Link href ="./Training" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
                            <Link href ="/MyTools" color='#000000'>My tool</Link>
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
            <div className='Account-contents'>
			<div className='Account-Menu-sub' style={{ marginTop: '30px' }}>
					
				<div className='Page-Title'>Account</div>
					<div className='Account-division-line'></div>
					<div className='Account-info-title'>Level</div>
					<div className='Account-Textfield'>
						<SchoolIcon 
							style={{ color: badge > 5 ? '#F15F5F' : '#6B66FF', verticalAlign: 'bottom', marginRight: 8, 
							padding:5, width: '100px', height: '100px'}}/>
							<div className='Account-text-level'>
							Your badge : {localStorage.getItem('badge')} <br />
							If you have more than 6 badges, you are a MASTER
							</div>
					</div>
					<div className='Account-Textfield'>
						<div className='Account-info-text'>{badge > 5 ? 'MASTER' : 'general'}</div>
					</div>
					<div className='Account-info-title'>Nickname</div>
					<div className='Account-Textfield'>
						<div className='Account-info-text'>{localStorage.getItem('nickName')}</div>
					</div>	
					<div className='Account-info-title'>Email</div>
					<div className='Account-Textfield'>
						<div className='Account-info-text'>{localStorage.getItem('email')}</div>
					</div>		
				</div>
				
					
			</div>
		</div>

    );
}

export default Account;


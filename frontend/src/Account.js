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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));


function Account(){
    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickName");
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
                        :<div className="sign-container"><Link href ="#" color='#000000'>{localStorage.getItem('nickName')}</Link>
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
                            <Link href="./Tools" color='#000000'>Tools</Link>
                            <Link href ="#" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
                            <Link href ="/MyTools" color='#0042ED'>My page</Link>
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
				<div className='Account-Menu' >
					<h4>Personalization</h4>
					<Button variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",
					}}startIcon={<BookmarkIcon sx={{color: "#FACC2E" }}/>}>
					Favorites          
					</Button>
					<Button variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",
					}}startIcon={<HistoryIcon sx={{color: "#000000" }}/>}>
						Packaging History           
					</Button>
					<Button href='/Mytools' variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
					}}startIcon={<BuildIcon sx={{color: "#0404B4"}}/>}>
						My tool             
					</Button>

					<h4>Settings</h4>
					<Button variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",
						bgcolor: "#EDEEFA",
					}}startIcon={<AccountCircleIcon />}>
					Account          
					</Button>
					<Button herf= "/Account"variant="outlined" size="large" style={{width:"60%" }} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",

					}}startIcon={<LockIcon/>}>
						<div className='font-align'>Security</div>
					</Button> 
					<Link href='./ToolUpload'>
					<Button variant="outlined" sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginTop: "50px",

					}}startIcon={<CloudUploadIcon/>}>Upload my Tool</Button>
					</Link>
				</div>
				<div className='Account-Menu-sub' style={{ marginTop: '30px' }}>
						
					<div className='Page-Title'>Account</div>
					<div className='Account-division-line'></div>
					<Box sx={{ width: '80%' }}>
						<Stack spacing={{ xs: 2, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
							<Item>Long content</Item>
							<Item>Item 1</Item>
							<Item>Item 2</Item>
						</Stack>
					</Box>
			
				</div>
			</div>
		</div>
    );
}

export default Account;


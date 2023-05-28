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
	const [formData, setFormData] = useState({
		nickName:localStorage.getItem("nickName"),
		email: localStorage.getItem("email"),
		pwd: "1234"
	});

	const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickName");
		localStorage.removeItem("email");
        localStorage.removeItem("badge");
    }

	useEffect(() => {
		axios.get(`/users/${UserId}`)
		  .then(function (response) {
			if (response.data.isSuccess) {
			  console.log(response, '성공');
			  const { email, nickName } = response.data.result;
			  setFormData(prevFormData => ({
				...prevFormData,
				email,
				nickName
			  }));
			} else {
			  console.log('error');
			}
		  });
	  }, []);

	  const handleSubmit = () => {
		// post
		axios.patch(`/users/${UserId}`, formData, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })
		  .then(function (response) {
			if (response.data.isSuccess) {
			  console.log(response, '성공');
			  localStorage.setItem("email", formData.email);
			  localStorage.setItem("nickName", formData.nickName);
			  
			} else {
			  console.log('error');
			}
		  })
	  };
	  
	
	  
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
                            <Link href ="#" color='#000000'>          
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
					<Button href='/Mytools' variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",
					}}startIcon={<BuildIcon sx={{color: "#0404B4"}}/>}>
						My tool             
					</Button>
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
						<div className='Account-info-title'>Nickname</div>
						<div className='Textfield'>
						<TextField
						margin="normal"
						fullWidth
						id="nickName"
						name="nickName"
						defaultValue = {formData.nickName}
						onChange={handleInputChange}
						/>
						<div className='Account-info-title'>Email</div>
						<TextField
						margin="normal"
						fullWidth
						name="email"
						id="email"
						defaultValue = {formData.email}
						onChange={handleInputChange}
						/>
						<div className='Account-info-title'>Password</div>
						<TextField
						margin="normal"
						required
						fullWidth
						name="pwd"
						label="pwd"
						type="password"
						id="pwd"
						autoComplete="current-password"
						defaultValue = {formData.pwd}
						
						onChange={handleInputChange}
						/>
						<Button variant="outlined" style={{ 
						color: '#FF5C60', 
						borderColor: '#FF5C60', 
						fontSize: '11px',
						justifyContent:"flex-start", 
						fontWeight: '700',
						marginTop:'20px',
						marginRight: '10px'
						}}>
						Discard Changes
					</Button>
					<Button onClick={handleSubmit} variant="outlined" style={{ 
						color: '#0000FF', 
						borderColor: '#0000FF',
						fontSize: '11px',
						marginTop:'20px',
						fontWeight : "700"
						}}>
						Save Changes
					</Button>
						</div>
						
				</div>
			</div>
		</div>
    );
}

export default Account;


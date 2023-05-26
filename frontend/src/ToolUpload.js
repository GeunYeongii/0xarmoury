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
import './ToolUpload.css';
import BuildIcon from '@mui/icons-material/Build';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperTexts from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';

function ToolUpload(){
    const Navigate = useNavigate();
    const [PostError, setpostError] = useState('');
    const [postSuccess, setpostSuccess] = useState('');

    const [formData, setFormData] = useState({
        title: 'Namp+brLuteforce',
        definition: 'My Nmap is King',
        contents: 'Options...',
        url: 'https://github.com/redcanaryco/atomic-red-team.git',
        share: 0
      });

      const handleCheckboxChange = event => {
        const isChecked = event.target.checked;
        const shareValue = isChecked ? 1 : 0;
        setFormData(prevState => ({
          ...prevState,
          share: shareValue
        }));
      };

      const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const sendDataToServer = () => {
        axios.post('gallery/tool/upload', formData, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })
          .then(response => {
            if (response.data.isSuccess){
            // 성공적으로 데이터를 전송한 경우에 수행할 작업
            console.log(response);
            setpostSuccess("도구 등록에 성공하셨습니다.");
            Navigate('/MyTools')

            }
            else{
                setpostError('도구 등록에 실패하였습니다. 다시 한번 시도 주세요.');
            }
          })
      };

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
            <div className='contents'>
            <div className='Upload-Menu' >
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
                <Button href='./MyTools' variant="outlined" size="large" style={{width:"60%"}} sx={{
                        color:"black",
                        borderColor:"black",
                        ":hover": { borderColor: "black" },
                        boxShadow: 2,
                    }}startIcon={<BuildIcon sx={{color: "#0404B4" }}/>}>
                        My tool             
                </Button>
                    
                <h4>Settings</h4>
                <Button variant="outlined" size="large" style={{width:"60%"}} sx={{
                    color:"black",
                    borderColor:"black",
                    ":hover": { borderColor: "black" },
                    boxShadow: 2,
                    marginBottom: "20px",
                }}startIcon={<AccountCircleIcon />}>
                   Account          
                </Button>
                <Button variant="outlined" size="large" style={{width:"60%" }} sx={{
                    color:"black",
                    borderColor:"black",
                    ":hover": { borderColor: "black" },
                    boxShadow: 2,
                    marginBottom: "20px",

                }}startIcon={<LockIcon/>}>
                    <div className='font-align'>Security</div>
                </Button> 
            </div>
            <div className='.Upload-Menu-sub' style={{ marginTop: '30px' }}>
                
            <Box sx={{
                width: "590px",
                height: "650px",
                border: 1, 
                borderColor: "#E2E8F0", 
                boxshadow: 2,
                borderradius: "2px"
                }}>
            <div className='font-Title'>Upload my Tools</div>
            <div className='Upload-tool-line'></div>
            <div className='font-name'>Tool name</div>
            <Box
                sx={{
                    maxWidth: '96%',
                }}
                >
                <TextField fullWidth id="fullWidth" name="title" defaultValue = {formData.title} onChange={handleInputChange} sx={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                    
                }} />
            </Box>
            <div className='font-name'>Definition</div>
            <Box
                sx={{
                    maxWidth: '96%',
                }}
                >
                <TextField fullWidth id="outlined-multiline-static" name="definition"  defaultValue = {formData.definition} onChange={handleInputChange}
                    multiline
                    rows={3}
                    sx={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                }} />
            </Box>
            <div className='font-name'>How to use</div>
            <Box
                sx={{
                    maxWidth: '96%',
                }}
                >
                <TextField fullWidth id="outlined-multiline-static" name="contents"  defaultValue = {formData.contents} onChange={handleInputChange}
                    multiline
                    rows={5}
                    sx={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                }} />
            </Box>
            <div className='font-name'>Install URL</div>
            <Box
                sx={{
                    maxWidth: '96%',
                }}
                >
                <TextField fullWidth id="fullWidth"  name="url"  defaultValue = {formData.url} onChange={handleInputChange} InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <GitHubIcon />
                    </InputAdornment>
                ), }}
                sx={{
                    marginLeft: "10px",
                    marginBottom: "20px"
                }} />
            </Box>
            </Box>

           
            </div>
            <div className='Upload-Menu-sub'>
            <Box sx={{
                width: "300px",
                height: "200px",
                border: 1, 
                borderColor: "#E2E8F0", 
                boxshadow: 2,
                borderradius: "2px"
                }}>
                <div className='font-name' style={{ marginTop: '5px' }}>Category</div>
                <div className='Upload-category-line'></div>
                <div className='Upload-Category-sub'>
                <FormControlLabel control={<Checkbox />} label="Web" sx={{
                    marginLeft: "10px",
                    width: "100px"
                }}/> 
                <FormControlLabel control={<Checkbox/>} label="Network" sx={{
                    marginLeft: "10px",
                    width: "100px"
                }}/> 
                <FormControlLabel control={<Checkbox/>} label="System" sx={{
                    marginLeft: "10px",
                    width: "100px"
                }}/>
                <FormControlLabel control={<Checkbox/>} label="Forensic" sx={{
                    marginLeft: "10px",
                    width: "100px"
                    
                }}/> 
                <FormControlLabel control={<Checkbox/>} label="Reversing" sx={{
                    marginLeft: "10px",
                    width: "100px"
                }}/> 
                </div>  
            </Box>
            <div className='Upload-Category-sub'>
            <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange} />}
                label="Do you want to share?"
                sx={{
                    justifyContent:"flex-start"
                }}
                />
                </div>
            <div className='Upload-Category-sub'>
            <Button variant="outlined" style={{ 
                color: '#FF5C60', 
                borderColor: '#FF5C60', 
                fontSize: '11px',
                justifyContent:"flex-start", 
                fontWeight: '700'
                }}>
                Cancel
            </Button>
            <Button onClick={sendDataToServer} variant="outlined" style={{ 
                color: '#0000FF', 
                borderColor: '#0000FF',
                fontSize: '11px',
                fontWeight : "700"
                 }}>
                Upload
            </Button>

            <FormHelperTexts sx={{color: '#DB0000'}}>{PostError}</FormHelperTexts>
            <FormHelperTexts sx={{color: '#0000FF'}}>{postSuccess}</FormHelperTexts>
            </div>
            </div>
            
            </div>
        </div>
    );
}

export default ToolUpload;


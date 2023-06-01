import React, {useEffect, useState} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import './ToolEdit.css';
import BuildIcon from '@mui/icons-material/Build';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperTexts from '@mui/material/FormHelperText';
import SchoolIcon from '@mui/icons-material/School';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const categoryList = [
    {id: '1',
     label: 'Information Gathering',},
    {id: '2',
     label: 'Vulnerability Analysis',},
    {id: '3',
     label: 'Web Application Analysis',},
    {id: '4',
     label: 'Database Assessment',},
     {id: '5',
     label: 'Password Attacks',},
     {id: '6',
     label: 'Wireless Attacks',},
     {id: '7',
     label: 'Reverse Engineering',},
     {id: '8',
     label: 'Exploitation Tools',},
     {id: '9',
     label: 'Sniffing & Spoofing',},
     {id: '10',
     label: 'Post Exploitation',},
     {id: '11',
     label: 'Forensics',},
     {id: '12',
     label: 'Reporting Tools',},
  ];

function TrainingUpload(){
    const [PostError, setpostError] = useState('');
    const [postSuccess, setpostSuccess] = useState('');
    const Navigate = useNavigate();
    const Location = useLocation();
    const data = Location.state;
    const badge = localStorage.getItem('badge');
    const [selectedLabel, setSelectedLabel] = useState("");

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };


    const [category, setCategory] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        definition: '',
        contents: '',
        url: '',
        category: '',
      });

      const handleChange1 = (event) => {
        setCategory(event.target.value);
        setSelectedLabel(event.target.value);
        console.log(selectedLabel);
      };
    {/* scenarioList(event.target.value) */}

      const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
        console.log(formData.category);
      };

      const sendDataToServer = () => {  //추후 수정
        formData.category = selectedLabel;
        axios.patch('#', formData, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })
          .then(response => {
            if (response.data.isSuccess){
            // 성공적으로 데이터를 전송한 경우에 수행할 작업
            Navigate('./Training');
            console.log(response);
            setpostSuccess("도구 등록에 성공하셨습니다.")
            }
            else{
                setpostError('도구 등록에 실패하였습니다. 다시 한번 시도 주세요.');
            }
          })
      };

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
                            <Link href ="./Assignment" color='#000000'>          
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
                            <Link href ="../Matrix" color='#000000'>Matrix</Link>
                            <Link href="../Tools" color='#000000'>Tools</Link>
                            <Link href ="../Training" color='#0042ED'>Training</Link>
                            <Link href ="../Gallery" color='#000000'>Gallery</Link>
                            <Link href ="../MyTools" color='#000000'>My tool</Link>
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
            
            <div className='.Upload-Menu' style={{ marginTop: '30px' }}>
                
                <Box sx={{
                    width: "590px",
                    height: "650px",
                    border: 1, 
                    borderColor: "#E2E8F0", 
                    boxshadow: 2,
                    borderradius: "2px"
                    }}>
                <div className='font-Title'>Upload Problem VM</div>
                <div className='Upload-tool-line'></div>
                <div className='font-name'>Problem title</div>
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

            {/* api에 맞게 수정 */}
            <div className='Upload-Menu-sub'>
            <FormControl sx={{ m: 1, width: 270, bgcolor: 'white'}}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                name="category" 
                onChange={handleChange1}
                MenuProps={MenuProps}
                sx={{ maxHeight: '50px', fontSize: '16px'}}
                >
                {categoryList.map((item) => (
                    <MenuItem value={item.id}> {item.label}</MenuItem>
                ))}
                </Select>
            </FormControl>
            <div className='Upload-Category-sub'>

            </div>
            <div className='Upload-Category-sub'>
            <Button variant="outlined" style={{ 
                color: '#FF5C60', 
                borderColor: '#FF5C60', 
                fontSize: '11px',
                justifyContent:"flex-start", 
                fontWeight: '700',
                marginRight:2,
                marginTop: 10,
                }}>
                Cancel
            </Button>
            <Button onClick={sendDataToServer} variant="outlined" style={{ 
                color: '#0000FF', 
                borderColor: '#0000FF',
                fontSize: '11px',
                fontWeight : "700",
                marginLeft:2,
                marginTop: 10,
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

export default TrainingUpload;


import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './Training.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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


function MainPage(){
    const [jsonData, setHello] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("**Select Scenario**");
    const [toollist, setToollist] = useState([]);

    const [category, setCategory] = useState('');
    const [scenario, setScenario] = useState('');

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

    const handleChange1 = (event) => {
        setCategory(event.target.value);
        ToolList(event.target.value);
      };
  
      const HandleChange2 = (event) => {
        const selectedScenario = event.target.value;
        setScenario(selectedScenario);
        handleSelect(event.target.value);
    };
 
    const ToolList = async (category) => { //!!시나리오 불러올 때 변수 바꾸기!!
        try {
            const response = await axios.get('/tools/category/' + category);
            setToollist(response.data.result);
  
            const processedTool = response.data.result.map(item => ({
                toolIdx: item.toolIdx,
                toolName: item.toolName,
              }));
              setToollist(processedTool);
          } catch (error) {
            console.error('Tool:', error);
        }
    }; 

    const handleSelect = (id) => {
        setSelectedId(id);

        fetchData(id)
          .then((response) => {
            const { toolName } = response.data.result;
            setSelectedLabel(toolName);
            // setToolCode(code);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };

    {/* 
    useEffect(() => {
      axios.get('/api/test')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
    }, []);
    */}

    async function fetchData(id) {
        try {
          const response = await axios.get(`tools/${id}`);
          return response;
        } catch (error) {
          throw error;
        }
      }

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
                            <Link href ="./Matrix" color='#000000'>Matrix</Link>
                            <Link href="./Tools" color='#000000'>Tools</Link>
                            <Link href ="./Training" color='#0042ED'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
                            <Link href ="./Mytools" color='#000000'>My page</Link>
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
                <div className='training-left'>
                <div className='tools-title'>
                     SCENARIO LIST
                </div>
                    <div className = 'tool-division-line2'></div>
                    <div className='tool-box-select'> 
                        <FormControl sx={{ m: 1, width: 270, bgcolor: 'white'}}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange1}
                            MenuProps={MenuProps}
                            sx={{ maxHeight: '50px', fontSize: '16px'}}
                            >
                            {categoryList.map((item) => (
                                <MenuItem value={item.id}> {item.label}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 270, bgcolor: 'white'}}>
                            <InputLabel id="demo-simple-select-label">Scenario</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={scenario}
                            label="Scenario"
                            onChange={HandleChange2}
                            MenuProps={MenuProps}
                            sx={{ maxHeight: '50px', fontSize: '16px' }}
                            >
                            {toollist.map((item) => (
                                <MenuItem value={item.toolIdx}> {item.toolName}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        </div>
                    <div className = 'tool-division-line2'></div>
                </div>
                <div className='training-right'>
                    <div className='training-box-top'>
                        <div className='training-line-column'></div>
                        <div className='training-scenario-title'>{selectedLabel}</div> 
                    </div>
                    <div className='training-box-content'>
                        <Card sx={{ width: '100%', minHeight: 220, backgroundColor: '#F9F9F9', mt: 2, mb: 2 }} elevation={4}>
                            <CardContent>
                                <div className='training-scenario-top'>
                                    <div className='training-scenario-title'>
                                    Step 1.
                                    </div>
                                    <div className='training-scenario-title2'>
                                    network clasification
                                    </div>
                                </div>
                                <div className='training-scenario-text'>
                                this scenario is ~~~~~~~.<br />
                                어쩌구 저쩌구 <br />
                                이건 설명이 들어갈 자리이다다아아아아
                                </div>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'end', mr: 2, mb: 1}}>
                                <Button variant="contained" sx={{ width: 150, height: 50, fontSize: 18, fontWeight: 500, borderRadius: 2}}>Answer</Button>
                            </CardActions>
                        </Card>
                        <Card sx={{ width: '100%', minHeight: 220, backgroundColor: '#F9F9F9', mt: 2, mb: 2 }} elevation={4}>
                            <CardContent>
                                <div className='training-scenario-top'>
                                    <div className='training-scenario-title'>
                                    Step 2.
                                    </div>
                                    <div className='training-scenario-title2'>
                                    network clasification
                                    </div>
                                </div>
                                <div className='training-scenario-text'>
                                this scenario is ~~~~~~~.<br />
                                어쩌구 저쩌구 <br />
                                이건 설명이 들어갈 자리이다다아아아아
                                </div>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'end', mr: 2, mb: 1}}>
                                <Button variant="contained" sx={{ width: 150, height: 50, fontSize: 18, fontWeight: 500, borderRadius: 2}}>Answer</Button>
                            </CardActions>
                        </Card>
                        <Card sx={{ width: '100%', minHeight: 220, backgroundColor: '#F9F9F9', mt: 2, mb: 2 }} elevation={4}>
                            <CardContent>
                                <div className='training-scenario-top'>
                                    <div className='training-scenario-title'>
                                    Step 2.
                                    </div>
                                    <div className='training-scenario-title2'>
                                    network clasification
                                    </div>
                                </div>
                                <div className='training-scenario-text'>
                                this scenario is ~~~~~~~.<br />
                                어쩌구 저쩌구 <br />
                                이건 설명이 들어갈 자리이다다아아아아
                                </div>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'end', mr: 2, mb: 1}}>
                                <Button variant="contained" sx={{ width: 150, height: 50, fontSize: 18, fontWeight: 500, borderRadius: 2}}>Answer</Button>
                            </CardActions>
                        </Card>
                        <Card sx={{ width: '100%', minHeight: 220, backgroundColor: '#F9F9F9', mt: 2, mb: 2 }} elevation={4}>
                            <CardContent>
                                <div className='training-scenario-top'>
                                    <div className='training-scenario-title'>
                                    Step 2.
                                    </div>
                                    <div className='training-scenario-title2'>
                                    network clasification
                                    </div>
                                </div>
                                <div className='training-scenario-text'>
                                this scenario is ~~~~~~~.<br />
                                어쩌구 저쩌구 <br />
                                이건 설명이 들어갈 자리이다다아아아아
                                </div>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'end', mr: 2, mb: 1}}>
                                <Button variant="contained" sx={{ width: 150, height: 50, fontSize: 18, fontWeight: 500, borderRadius: 2}}>Answer</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;


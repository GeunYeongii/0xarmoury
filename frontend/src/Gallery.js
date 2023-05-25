import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import Button from '@mui/material/Button';
import './Gallery.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import './mainPage.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
    Toolname: string,
    User: string,
    Description: String,
    Date: String,
    Good: number,
  ) {
    return { Toolname, User, Description, Date, Good };
  }
  const rows = [
    createData('Nmap_brutforce',"Hahah", "Bruteforce script using Nmap", "2023.5.21", 8),
    createData('Burp Suite_Crazy',"YoonHa", "Crazy tools", "2023.3.29", 9),
    createData('MY Sun',"Taeyang", "Sun is red", "2023.4.12", 6),
    createData('10cm Back',"10cm", "Gradient", "2023.5.17", 10),

  ];

function MainPage(){
    // const [rows, setRows] = useState([]);

    {/* 
    useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        const data = response.data;
        const newRows = data.map(item => createData(item.Toolname, item.User, item.Description, item.Date, item.Good));
        setRows(newRows);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    */}

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

            <div className='container_Header'>
                <h2><strong>Gallery</strong></h2>
                <Link href ="./GalleryDetail" color='#0042ED'>detail</Link>
            </div>
            <div className='tool-division-line'></div>

            <div className='container-body1'>
                <div className='toolbox-left'>
                    
                    <div className='tools-title'>
                    <strong>ALL</strong>(78)
                    </div>
                    <div className = 'tool-division-line2'></div>
                    <div className='tools-title' style={{ marginTop: '20px' }}>
                    Web(33)
                    </div>
                    <div className = 'tool-division-line2'></div>
                    <div className='tools-title' style={{ marginTop: '20px' }}>
                    Network(33)
                    </div>
                    <div className = 'tool-division-line2'></div>
                    </div>
                {/*게시판*/}
                <div className='toolbox-right'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Num</TableCell>
                            <TableCell>Toolname</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">좋아요</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.Toolname}>
                             <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
                            <StyledTableCell>{row.Toolname}</StyledTableCell>
                            <StyledTableCell align="center">{row.User}</StyledTableCell>
                            <StyledTableCell align="center">{row.Description}</StyledTableCell>
                            <StyledTableCell align="center">{row.Date}</StyledTableCell>
                            <TableCell align="center">{row.Good}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
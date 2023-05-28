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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {Pagination} from "@mui/material";
import { useNavigate } from 'react-router-dom';
{/**
const data = [
    { postIdx:7, name: 'Nmap', username: 'user1', date: '2023-05-24' },
    { postIdx:6, name: 'Burp Suite', username: 'user2', date: '2023-05-25' },
    { postIdx:5, name: 'Tool3', username: 'user3', date: '2023-05-26' },
    { postIdx:4, name: '10cm Back', username: '10cm', date: '2023-05-31' },
    
    // ...
  ];
 */}


function Gallery(){
     const [galleryList, setGalleryList] = useState([]);
     const [paginationCount, setPaginationCount] = useState(0);
     const [currentPage, setCurrentPage] = useState(1);

     const Navigate = useNavigate();

     useEffect(() => {
        fetchPaginationCount();
        fetchGalleryList(currentPage);
      }, [currentPage]);
    
      const fetchPaginationCount = async () => {
        try {
          const response = await axios.get('gallery/get/pageNumber');
          setPaginationCount(response.data.result);
        } catch (error) {
          console.error('Error fetching pagination count:', error);
        }
      };    

      const fetchGalleryList = async (pageNum) => {
        try {
          const response = await axios.get(`gallery/toolList/${pageNum}`);
          const processedData = response.data.result.map(item => ({
            postIdx: item.postIdx,
            name: item.title,
            userIdx: item.userIdx,
            userName: item.userName,
            postTime: item.postTime
          }));
          setGalleryList(processedData);
        } catch (error) {
          console.error('Error fetching gallery list:', error);
        }
      };
    
      const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
      };

    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickName");
    }

    const loginCheck = (no) =>{
        if (localStorage.getItem("accessToken") != null)
            Navigate('./GalleryDetail/' + no);
        else
            alert('Please Sign In!');
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
                            <Link href ="./Training" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#0042ED'>Gallery</Link>
                            <Link href ="./MyTools" color='#000000'>My page</Link>
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
            </div>
            <div className='tool-division-line'></div>

            <div className='gallery-container-body'>
                {/*게시판*/}
                <div className='gallery-toolbox-right'>
                {galleryList.map((item) => (
                    <div key={item.postIdx} className='Tool_name'>
                        <div className='Tool_title'>
                            <Link onClick={()=>loginCheck(item.postIdx)} color='#050099'>{item.name}</Link>
                            </div>
                            <div className='Tool_info'>
                                <div>
                                <AccountCircleIcon sx={{ height: 22, width: 22, verticalAlign: 'bottom', color: '#4C4C4C' }} /> {item.userName} 
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="delete" style={{ marginRight: '5px' }}>
                                    <ChatBubbleIcon sx={{ fontSize: 30, color: 'black' }} />
                                </IconButton>
                                <div>{item.postTime}</div>
                                 
                            </div>
                        </div>
                    </div>
                ))}
                <div className='toolbox-section'>

                <Pagination
                    count={paginationCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    size='large'
                />
                </div>
                </div>
                
            </div>
            
        </div>
        
    );
}

export default Gallery;
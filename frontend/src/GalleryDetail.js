import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import IconButton from '@mui/material/IconButton';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function GalleryDetail(){
    const [data, setResponse] = useState([]);
    const [comment, setComment] = useState([]);
    
    const {no} = useParams();

    {/* 
    useEffect(() => {
        axios.get(`/gallery/tool/${no}`)
        .then(response => setResponse(response.result), console.log(data))
        .catch(error => console.log('axios error:', error))
      }, []);
    */}

    useEffect(() => {GalleryDetail(no); CommentList(no);});

    const GalleryDetail = async (no) => {
        try {
            const response = await axios.get('/gallery/tool/' + no, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            });
            setResponse(response.data.result);
        } catch (error) {
            console.error('Gallery detail:', error);
        }
    };

    const CommentList = async (no) => {
        try {
            const response = await axios.get('/gallery/comments/' + no, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            });
            setComment(response.data.result);

            const processedData = response.data.result.map(item => ({
                userId: item.userIdx,
                nickName: item.nickName,
                contents: item.contents,
                postTime: item.postTime
              }));
              setComment(processedData);
        } catch (error) {
            console.error('Comment:', error);
        }
    };

    const CreateComment = async (data) => {
        const { postIdx, userIdx, contents } = data;
        const postData = { postIdx, userIdx, contents };

        console.log(postData);
    
        // post
        await axios
          .post('/gallery/comments/create', postData)  //db 주소? api?
          .then(function (response) {
            console.log(response.data.isSuccess);
            if (response.data.isSuccess){
              
            }
            else{
                console.log('댓글 생성 실패');
            }
          })
          .catch(function (err) {
            console.log(err);
          });
    };

    //'ADD COMMENT'버튼 클릭하면 동작
  const SubmitComment = (event) => {
    event.preventDefault(); // 기본 이벤트 동작 취소

    const data = new FormData(event.currentTarget);
    const joinData = {
      postIdx: Number(no),
      userIdx: Number(localStorage.getItem('userId')),
      contents: data.get('comment'),
    };

    CreateComment(joinData);
    console.log('comment upload');
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
                        <Link href="../" onClick={Logout} color='#000000'>logout</Link></div>
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
                            <Link href ="../Gallery" color='#0042ED'>Gallery</Link>
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
                            {data.title}
                        </div>
                        <div className='gallery-title-info'>
                            <div><AccountCircleIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', color: '#4C4C4C'}}/> {data.nickName} </div>
                            <div className='gallery-title-right'>
                                {data.postTime}
                                {data.userIdx == localStorage.getItem('userId')
                                &&<div><IconButton aria-label="edit" sx={{height: 25, width: 25, verticalAlign: 'bottom', ml: '5px', mt: '2px'}}>
                                    <EditIcon  />
                                </IconButton>
                                <IconButton aria-label="edit" sx={{height: 25, width: 25, verticalAlign: 'bottom', ml: '5px', mt: '2px'}}>
                                    <DeleteIcon  />
                                </IconButton></div>
                                }
                            </div>
                        </div>

                    </div>

                    <div className='gallery-division-line'></div>

                    <div className='gallery-body'>
                        <div className='gallery-body-tool'>
                            <DownloadForOfflineOutlinedIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', mr: '2px', color: 'black'}}/>
                            <Link sx={{color: '#050099'}}>{data.url}</Link>
                        </div>
                        <div className='gallery-body-maintext'>
                            {data.definition} <br></br>
                            {data.contents}
                        </div>
                        <Box component="form" onSubmit={SubmitComment} noValidate sx={{ mt: 1 }}>
                            <TextField sx={{width: '99.5%', mt: '30px'}}
                                id="comment"
                                name="comment"
                                label="Comment"
                                placeholder="Enter your comment"
                                multiline
                                rows={3}
                                variant="filled"
                            />
                            <div className='gallery-body-right'>
                                <Button type="submit" onSubmit={SubmitComment} sx={{backgroundColor: '#353535', '&:hover': {backgroundColor: '#232323'}}} variant="contained" endIcon={<AddCircleOutlineOutlinedIcon />}>
                                    Add Comment
                                </Button>
                            </div>
                        </Box>
                        
                        {comment.map((item) => (
                            <div className='gallery-body-comment'>
                                <div key={item.commentIdx} className='gallery-body-comment-title'>
                                    {/*key값 경고, commentIdx 다르게 부여하면 아마 해결..? */}
                                    <MessageOutlinedIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', mr: '3px', mt: '2px'}} />
                                    <div className='gallery-comment-text1'>
                                        {item.nickName}
                                    </div>
                                    <div className='gallery-comment-text2'>
                                        {item.postTime}
                                    </div>
                                </div>
                                <div className='gallery-body-comment-content'>
                                    {item.contents}
                                </div>
                            
                            </div>
                        ))}
                        {/* 
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
                            
                        </div> */}
                        

                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default GalleryDetail;


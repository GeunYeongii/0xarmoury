import React, {useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SchoolIcon from '@mui/icons-material/School';


function GalleryDetail(){
    const [data, setResponse] = useState([]);
    const [comment, setComment] = useState([]);
    const Navigate = useNavigate();
    const badge = localStorage.getItem('badge');
    
    const {no} = useParams();

    {/* 
    useEffect(() => {
        axios.get(`/gallery/tool/${no}`)
        .then(response => setResponse(response.result), console.log(data))
        .catch(error => console.log('axios error:', error))
      }, []);
    */}

    const sendLikeInfo = async (no) => {
        try {
          const updatedLike = data.like + 1;
          const response = await axios.post('api' + no, { like: updatedLike });
          if(response.data.isSuccess)
          {
            setResponse({ ...data, like: updatedLike }); // 업데이트된 좋아요 값 저장
          }
          else
          {
            alert('좋아요는 한 번만 가능해용~');
          }
          console.log(response.data);

        } catch (error) {
          console.error(error);
          alert('좋아요는 한 번만 가능해용~');
        }
      }
    
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

    const handleDelete = () => {
        console.log('버튼 클릭', no);
		axios.delete(`/gallery/tool/delete/${no}`, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })
		  .then((response) => {
			console.log('삭제 요청 성공:', response);
            Navigate('/Gallery');
		  })
		  .catch((error) => {
			console.error('삭제 요청 실패:', error);
		  });
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
                commentIdx: item.commentIdx,
                userIdx: item.userIdx,
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

        // post
        await axios
          .post('/gallery/comments/create', postData, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })  //db 주소? api?
          .then(function (response) {
            console.log(response.data.code);
            if (response.data.isSuccess){
                console.log('성공!!');
            }
            else{
                console.log('댓글 생성 실패');
            }
          })
          .catch(function (err) {
            console.log(err);
          });
    };

    const DeleteComment = async (commantId) => {
        // delete
        await axios
          .delete('/gallery/comments/delete/' + commantId, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            }) 
          .then(function (response) {
            console.log(response.data.code);
            if (response.data.isSuccess){
                console.log('성공!!');
            }
            else{
                console.log('실패');
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
  }


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
                            <Link href ="../Account" color='#000000'>          
                                {localStorage.getItem('nickName')}
                            </Link>
                            </div>
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
                            <Link href ="../Matrix" color='#000000'>Matrix</Link>
                            <Link href="../Tools" color='#000000'>Tools</Link>
                            <Link href ="../Training" color='#000000'>Training</Link>
                            <Link href ="../Gallery" color='#0042ED'>Gallery</Link>
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
            <div className='container-body1' >
                <div className='gallery-container'>
                    <div className='gallery-title'>
                        <div className='gallery-title-tool'>
                            {data.title}
                        </div>
                        <div className='gallery-title-info'>
                            <div><IconButton><AccountCircleIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', color: '#4C4C4C'}}/>
                            </IconButton>{data.nickName}
                            
                            {/* 좋아요 버튼 */}
                            <IconButton onClick={sendLikeInfo}><ThumbUpIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', color: '#4C4C4C', marginLeft: "10px"}}/>
                            </IconButton>{data.like}
                            </div>
                            
                            <div className='gallery-title-right'>
                               {data.postTime}
                                {data.userIdx == localStorage.getItem('userId')
                                &&<div><IconButton onClick={()=>Navigate('../ToolEdit/'+ no, 
                                    { state: { postIdx: no, 
                                            userIdx: data.userIdx, 
                                            title: data.title, 
                                            definition: data.definition, 
                                            contents: data.contents, 
                                            share: data.share,
                                            url: data.url } })} aria-label="edit" sx={{height: 25, width: 25, verticalAlign: 'bottom', ml: '5px', mt: '2px'}}>
                                    <EditIcon  />
                                </IconButton>
                                <IconButton onClick={() => handleDelete()} aria-label="delete" sx={{height: 25, width: 25, verticalAlign: 'bottom', ml: '5px', mt: '2px'}}>
                                    <DeleteIcon  />
                                </IconButton></div>
                                
                                }
                            </div>
                        </div>

                    </div>

                    <div className='gallery-division-line'></div>

                    <div className='gallery-body'>
                        <div className='gallery-text-title'>Tool Download</div>
                        <div className='gallery-body-tool'>
                            <DownloadForOfflineOutlinedIcon sx={{height: 22, width: 22, verticalAlign: 'bottom', mr: '2px', color: 'black'}}/>
                            <Link href={data.url} target="_blank" sx={{color: '#050099'}}>{data.url}</Link>
                        </div>
                        <div className='gallery-text-title'>Definition</div>
                        <div className='gallery-body-maintext'>
                            {data.definition && data.definition.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='gallery-text-title'>How to use</div>
                        <div className='gallery-body-option'>
                            {data.contents && data.contents.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
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
                                    <div className='gallery-comment-right'>
                                        {item.userIdx == localStorage.getItem('userId')
                                        &&<IconButton onClick={() => DeleteComment(item.commentIdx)} aria-label="delete" sx={{height: 22, width: 22, verticalAlign: 'bottom', ml: '5px', mt: '2px'}}>
                                            <DeleteIcon  />
                                        </IconButton>}
                                    </div>
                                </div>
                                <div className='gallery-body-comment-content'>
                                    {item.contents && item.contents.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                    ))}
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


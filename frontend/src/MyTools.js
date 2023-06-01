import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './MyTools.css';
import './ToolUpload.css';
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
import IconButton from '@mui/material/IconButton';
import {Pagination} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';

function MyTools(){

	const [galleryList, setGalleryList] = useState([]);
	const [paginationCount, setPaginationCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const badge = localStorage.getItem('badge');

	const handleDelete = (postIdx) => {
		axios.delete(`/gallery/tool/delete/${postIdx}`, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })
		  .then((response) => {
			console.log('삭제 요청 성공:', response);
			// 갤러리 목록 다시 불러오기
			fetchGalleryList(currentPage);
		  })
		  .catch((error) => {
			console.error('삭제 요청 실패:', error);
		  });
	  };

	useEffect(() => {
	   fetchPaginationCount();
	   fetchGalleryList(currentPage);
	 }, [currentPage]);
   
	 const fetchPaginationCount = async () => {
	   try {
		 const response = await axios.get('gallery/get/myList/pageNumber', {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            }); // --> gallery/tool/myPageNumber (사용자의 List 페이지)
		 setPaginationCount(response.data.result);
	   } catch (error) {
		 console.error('Error fetching pagination count:', error);
	   }
	 };
   
	 const fetchGalleryList = async (pageNum) => {
	   try {
		 const response = await axios.get(`gallery/tool/myList/${pageNum}`, {
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            }); // --> gallery/tool/myList/$(pageNum)
		 const processedData = response.data.result.map(item => ({
		   postIdx: item.postIdx,
		   name: item.title,
		   userIdx: item.userIdx,
		   userName: item.userName,
		   postTime: item.postTime,
		   share: item.share
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
                            <Link href ="/MyTools" color='#0042ED'>My tool</Link>
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
            <div className='MyTools-contents'>
				
				<div className='MyTools-Menu-sub' style={{ marginTop: '30px' }}>
						
					{/*게시판*/}
					<div className='MyTools-right'>

					<Link href='./ToolUpload'>
					<Button variant="outlined" sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "30px",

					}}startIcon={<CloudUploadIcon/>}>Upload my Tool</Button>
					</Link>

					
						{galleryList.map((item) => (
							<div key={item.postIdx} className='Tool_name'>
								<div className='Tool_title'>
									<Link href={`./GalleryDetail/${item.postIdx}`} color='#050099'>{item.name}</Link>
									<IconButton aria-label="share" sx={{ color: item.share === 0 ? 'black' : 'gray' }}>
										{/*item.share값이 0이면 검정색, 1이면 회색 */}
										<ShareIcon />
									</IconButton>
									
									</div>
									<div className='My_Tool_info'>
										<div>
										<AccountCircleIcon sx={{ height: 22, width: 22, verticalAlign: 'bottom', color: '#4C4C4C' }} /> { localStorage.getItem('nickName')} 
										</div>
										<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										<IconButton aria-label="Download">
											<DownloadIcon />
										</IconButton>
										{/*postIdx로 ToolUpload페이지에 자동으로 입력되게 해서 수정...보류 */}
										<IconButton aria-label="delete" onClick={() => handleDelete(item.postIdx)}>
											<DeleteIcon />
										</IconButton>
										
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
		</div>
    );
}

export default MyTools;


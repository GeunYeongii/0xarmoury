import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './Tools.css'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Modal from '@mui/material/Modal';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SchoolIcon from '@mui/icons-material/School';

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

    {/*
    const [data, setData] = useState([]);

    useEffect(() => {
            axios.get('/api/test/)
            .then(response => setData(response.data))
            .catch(error => console.log(error))
        }, []);
 */}
    const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.black,
          },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
            maxWidth: 'none',
            fontFamily: 'consoles', // 원하는 폰트 패밀리로 변경
            fontWeight: 600
        },
    }));

    
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
function Tools(){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [fullscreen, setFullscreen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("Title");
    const [Toolcode, setToolCode] = useState("여기는 표식체계 자리");
    const [Tooldefintion, setTooldefinition]=useState("여기는 툴 설명\n아 여기네ㅎ");
    const [Tooloption, setTooloption]=useState("여기는 옵션 설명\n제발돼라ㅏㅏㅏㅏ");
    const [ToolMITRE, setToolMITRE]=useState("여기는 마이터 설명\n개행확인");
    const [ToolWiki, setToolWiki] = useState("기본 위키 내용\n여기두");
    const [isEditing, setIsEditing] = useState(false);
    const [editedWiki, setEditedWiki] = useState(ToolWiki);
    const [toollist, setToollist] = useState([]);

    const badge = localStorage.getItem('badge');

    const [category, setCategory] = useState('');
    const [tool, setTool] = useState('');

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
        const selectedTool = event.target.value;
        setTool(selectedTool);
        handleSelect(event.target.value);
      };
 
    const ToolList = async (category) => {
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


    const handleEdit = () => {
      setIsEditing(true);
      setEditedWiki(ToolWiki);
    };
  
   
    const handleSave = () => {
        // 수정된 정보를 서버로 전송
        const updatedData = {
          toolIdx: selectedId, // 수정한 데이터의 id
          wikiInfo: editedWiki, // 수정한 내용
        };
      
        axios.post('/tools/update/wiki', updatedData,{
            headers: {
            'X-ACCESS-TOKEN': localStorage.getItem('accessToken')
            }
            })
          .then(response => {
            // 서버 응답 처리
            if(response.data.isSuccess)
            {
                console.log(response.data);
                setToolWiki(editedWiki); // 수정한 내용으로 업데이트
                setIsEditing(false); // 편집 모드 종료
            }
            else{
                alert('마스터 등급만 위키 수정이 가능해요~');
            }
          })
          .catch(error => {
            // 오류 처리
            console.log(error);
          });
      };
  
    const handleCancel = () => {
      setIsEditing(false);
    };
  
    const handleChange = (event) => {
      setEditedWiki(event.target.value);
    };



    const CircularJSON = require('circular-json');

    const handleOpenFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleSelect = (id) => {
        setSelectedId(id);

        fetchData(id)
          .then((response) => {
            const { toolName, definition, options, mitreInfo, wikiInfo, aml } = response.data.result;
            setSelectedLabel(toolName);
            setTooldefinition(definition);
            setTooloption(options);
            setToolMITRE(mitreInfo);
            setToolWiki(wikiInfo);
            setToolCode(aml);
            // setToolCode(code);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
      
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
                            <Link href="./tools" color='#0042ED'>Tools</Link>
                            <Link href ="./Training" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
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
            <div className = 'division-line'></div>
            <div className='container-body1'>

            <div className='toolbox-left'>
            <div className='tools-title'>
                     TOOLS LIST
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
                        <InputLabel id="demo-simple-select-label">Tool</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tool}
                        label="Tool"
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
                
                <div className='toolbox-right'>
                    <div className='tool-container-top'>
                    <LightTooltip title={
                        <React.Fragment>
                            <Typography color="black" fontSize={"15px"} fontFamily="consolas" fontWeight={"700"}>AML Code</Typography>
                            {Toolcode}
                        </React.Fragment>
                        } placement="top-start" arrow>
                        <Button sx={{color: "black", fontSize:"20px"}}>{selectedLabel}</Button>
                    </LightTooltip>
                       
                        <div className='tool-container-right'>
                         <IconButton aria-label="bookmark">
                            <BookmarkBorderIcon sx={{width: 40, height: 40}} />
                        </IconButton>
                        </div>
                    </div>

                    <div className='tools-division-line'></div>
               
                    <div className='toolbox-right-body'>
                        <div className='toolbox-half'>
                            <div className='text-size2'>
                                Definition
                            </div>
                            <div className='toolbox-definition'>
                                <p>{Tooldefintion && Tooldefintion.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}</p>
                            </div>
                            <div className='text-size2'>
                                Options
                            </div>
                            <div className='toolbox-option'>
                                <p>{Tooloption && Tooloption.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}</p>

                            </div>
                            <div className='text-size2'>
                                MITRE ATT&CK
                                <IconButton aria-label="Open Modal" sx={{color:"black"}} onClick={handleOpen}>
                                    <ImageSearchIcon/>
                                </IconButton>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                            <div className='toolbox-mitre'>
                                <p>{ToolMITRE && ToolMITRE.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}</p>
                            </div>
                        </div>

                        <div className='toolbox-half'>
                            <div className='text-size2'>
                                Execute
                                <IconButton aria-label="expand screen">
                                    {fullscreen ? (
                                        <FullscreenExitIcon onClick={handleOpenFullscreen} sx={{ width: 20, height: 20, color: "#000000" }} />
                                    ) : (
                                        <FullscreenIcon onClick={handleOpenFullscreen} sx={{ width: 20, height: 20, color: "#000000" }} />
                                    )}
                                </IconButton>
                            </div>
                            <iframe className={`toolbox-exec ${fullscreen ? 'fullscreen' : ''}`} src="http://localhost:5901/cast"></iframe>


                            <div className='text-size2'>
                                Wiki
                                <IconButton aria-label="edit">
                                    <EditIcon onClick={handleEdit} sx={{width: 20, height: 20}} />
                                </IconButton>
                            </div>
                            {isEditing ? (
                                <div>
                                <textarea 
                                className='toolbox-wiki' 
                                value={editedWiki}
                                onChange={handleChange} 
                                rows={14} // 원하는 세로 길이로 조정
                                style={{ resize: 'none', height: 'auto' }} // 크기 조절 비활성화 및 자동 높이 조정
                                 />
                                 <div style={{ display: "flex", gap: "10px" }}>
                                <Button variant="outlined" onClick={handleSave} sx={{color:"bluek", borderColor: "blue"}}>Save</Button>
                                <Button variant="outlined" onClick={handleCancel} sx={{color:"red", borderColor: "red"}}>Cancel</Button>
                                </div>
                                </div>
                            ) : (
                                <div className={`toolbox-wiki ${fullscreen ? 'toolbox-wiki-fullscreen' : ''}`}>
                                <p>{ToolWiki && ToolWiki.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}</p>
                                </div>
                            )}
                        </div>
                    </div>
               
                </div>
            </div>
		</div>
		);
}
export default Tools;
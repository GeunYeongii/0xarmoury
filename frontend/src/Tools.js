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
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Modal from '@mui/material/Modal';


    {/*테스트 용 data */}
    const data = [
        {
          id: '1',
          label: 'Reconnaissance',
          children: [
            { id: '2', label: 'Active Scanning' },
            { id: '3', label: 'Gather Victim Host Information' },
          ],
        },
        {
          id: '4',
          label: 'Resource Development',
          children: [
            {
              id: '5',
              label: 'Acquire Access',
            },
            {
              id: '6',
              label: 'Acquire Infrastructure',
              children: [{ id: '7', label: 'index.js' }],
            },
          ],
        },
        {
            id: '7',
            label: 'Initial Access',
            children: [
              { id: '8', label: 'Drive-by Compromise' },
              { id: '9', label: 'Exploit Public-Facing Application' },
            ],
          }
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
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 15,
        border: `1px solid ${theme.palette.grey[700]}`,
        borderRadius: theme.shape.borderRadius,
        padding: '5px'
        },
    }));

    const RenderTree = ({nodes, onSelect}) => (
        <TreeItem 
        key={nodes.id} 
        nodeId={nodes.id}
        label={
        <Typography sx={{ fontSize: 19 , fontFamily: 'Verdana', pt: 0.5, pb: 0.5}}>{nodes.label}</Typography>}
        onClick={() => nodes.id>1 ? onSelect(nodes.id, nodes.label) : 0}
        >
        {/* id값으로 제일 상단의 트리아이템은 안불러오도록 지정?
            이렇게 해도 됨? */}

        {Array.isArray(nodes.children)
    ? nodes.children.map((node) => (
        <RenderTree
            nodes={{
            ...node,
            label: (
                <Typography sx={{ fontSize: 15, fontFamily: 'Verdana'}}>{node.label}</Typography>
            ),
            }}
            onSelect={onSelect}
            key={node.id}
        />
        ))
    : null}
    </TreeItem>
);
    
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

    const [selectedId, setSelectedId] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("Title");
    const [Toolcode, setToolCode] = useState("여기는 표식체계 자리");
    const [Tooldefintion, setTooldefinition]=useState("여기는 툴 설명\n아 여기네ㅎ");
    const [Tooloption, setTooloption]=useState("여기는 옵션 설명\n제발돼라ㅏㅏㅏㅏ");
    const [ToolMITRE, setToolMITRE]=useState("여기는 마이터 설명\n개행확인");
    const [ToolWiki, setToolWiki] = useState("기본 위키 내용\n여기두");
    const [isEditing, setIsEditing] = useState(false);
    const [editedWiki, setEditedWiki] = useState(ToolWiki);
  
    const handleEdit = () => {
      setIsEditing(true);
      setEditedWiki(ToolWiki);
    };
  
    const handleSave = () => {
        // 수정된 정보를 서버로 전송
        const updatedData = {
          id: selectedId, // 수정한 데이터의 id
          wiki: editedWiki, // 수정한 내용
        };
      
        axios.put('API 위키 수정', updatedData)
          .then(response => {
            // 서버 응답 처리
            console.log(response.data);
            setToolWiki(editedWiki); // 수정한 내용으로 업데이트
            setIsEditing(false); // 편집 모드 종료
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
                            <Link href="./tools" color='#0042ED'>Tools</Link>
                            <Link href ="#" color='#000000'>Training</Link>
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
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ height: '95%', flexGrow: 1, width: '95%'
                    }}
                        >
                        {data.map((node) => (
                            <RenderTree nodes={node} onSelect={handleSelect} key={node.id} />
                            ))}
                            
                    </TreeView> 
                    <div className = 'tool-division-line2'></div>
                </div>
                <div className='toolbox-right'>
                    <div className='tool-container-top'>
                    <LightTooltip title={Toolcode} placement="top-start" arrow>
                        <Button sx={{color: "black", fontSize:"20px"}}>{selectedLabel}</Button>
                    </LightTooltip>
                       
                        <div className='tool-container-right'>
                         <Button sx={{color: '#000000'}}>edit</Button>
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
                            </div>
                            <iframe className="toolbox-exec"src="http://localhost:5901/cast"></iframe>


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
                                <div className='toolbox-wiki'>
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
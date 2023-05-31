import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './Tools.css'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SchoolIcon from '@mui/icons-material/School';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme, isActive }) => ({
    backgroundColor: isActive ? '#6799FF' : (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
    ...theme.typography.body2,
    padding: theme.spacing(1),
    border: '1px solid #A6A6A6',
    textAlign: 'center',
    color: 'black',
    flexGrow: 1,
    minWidth: '95px',
    cursor: 'pointer',
  }));

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

    // MTIRE의 tooltip
    const LightTooltip2 = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
            [`& .${tooltipClasses.arrow}`]: {
                color: theme.palette.common.black,
              },
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: '#f5f5f9',
                color: 'rgba(0, 0, 0, 0.87)',
                maxWidth: 220,
                fontSize: "13px",
                border: '1px solid #dadde9',
                fontFamily: 'consoles', // 원하는 폰트 패밀리로 변경
                fontWeight: 600,
                whiteSpace: 'pre-line'
            },
        }));

        const formatTooltipContent = (content) => {
          return content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ));
        };
        
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
    const [fullscreen, setFullscreen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("[select tool]");
    const [Toolcode, setToolCode] = useState("");
    const [Tooldefintion, setTooldefinition]=useState("");
    const [Tooloption, setTooloption]=useState("");
    const [ToolMITRE, setToolMITRE]=useState([]);
    const [ToolWiki, setToolWiki] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedWiki, setEditedWiki] = useState(ToolWiki);
    const [toollist, setToollist] = useState([]);

   

    const badge = localStorage.getItem('badge');

    const [category, setCategory] = useState('');
    const [tool, setTool] = useState('');
    const [activeItemIds, setActiveItemIds] = useState([]);

    const [MitreTip, setMitreTip] = useState("");
    const [ClickItemIds, setClickItemIds] = useState('');
    // Tooltip

    const handleItemClick = async (itemId) => {
          axios
          .get(`tools/mitreInfo/?amlPart=${itemId}`)
          .then((response)=>{
            if(response.data.isSuccess)
            {
              const itemInfo = response.data.result.join('\n');
              console.log(itemInfo);
              setClickItemIds(itemId.toString());
              console.log(itemId);
              // 받아온 정보를 상태에 저장하여 툴팁으로 표시
              setMitreTip("Tool list\n------------------\n" + itemInfo);
            }
          });
          
      };

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

    const handleOpen = () => {
        const bottomContainer = document.getElementById('bottomContainer');
        bottomContainer.scrollIntoView({ behavior: 'smooth' });
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

      useEffect(() => {
        if (tool) {
          axios
            .get(`/tools/AML/${tool}`)
            .then(function (response) {
              if(response.data.isSuccess){
                const result = response.data.result;
                const simulatedServerData = { itemIds: result };
                setActiveItemIds(simulatedServerData.itemIds);
              }
              else{
                console.log('error');
              }
            })
            .catch(function (error) {
              // Error handling
            });
        }
      }, [tool]);

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
            const { toolName, definition, options, wikiInfo, aml } = response.toolInfo;
            const mitreInfo = response.mitreInfo;

            setToolMITRE(mitreInfo);
            console.log(ToolMITRE);
            setSelectedLabel(toolName);
            setTooldefinition(definition);
            setTooloption(options);
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
          const response1 = await axios.get(`tools/${id}`);
          const response2 = await axios.get(`tools/mitreInfo/${id}`);
          return {
            toolInfo: response1.data.result,
            mitreInfo: response2.data.result
        };
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
                            <Link href="./tools" color='#0042ED'>Tools</Link>
                            <Link href ="./Training" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
                            <Link href ="./MyTools" color='#000000'>My tool</Link>
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
                                <IconButton aria-label="View Matrix" sx={{color:"black"}} onClick={handleOpen}>
                                    <ImageSearchIcon/>
                                </IconButton>
                                
                            </div>
                            <div className='toolbox-mitre'>
                             <ul>
                                {ToolMITRE.map((category) => (
                                    <li key={category.tacticName}>
                                        {category.tacticName}
                                        <ul>
                                            {category.techniques.map((technique) => (
                                            <li key={technique.name}>
                                                <Link href={technique.url} color="inherit" underline="always" target="_blank" rel="noopener noreferrer">
                                                    {technique.name}
                                                </Link>
                                            </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                                </ul>
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
            <div className='container-body1' id='bottomContainer'>
                            
                            <div className='tool-matrix-box'>
                                <div className='matrix-box-top'> 
                                    <div className='matrix-text-tactic'>Reconnaiss-ance</div>
                                    <div className='matrix-text-tactic'>Resource Development</div>
                                    <div className='matrix-text-tactic'>Initial Access</div>
                                    <div className='matrix-text-tactic'>Execution</div>
                                    <div className='matrix-text-tactic'>Persistence</div>
                                    <div className='matrix-text-tactic'>Privilege Escalation</div>
                                    <div className='matrix-text-tactic'>Defense Evasion</div>
                                    <div className='matrix-text-tactic'>Credential Access</div>
                                    <div className='matrix-text-tactic'>Discovery</div>
                                    <div className='matrix-text-tactic'>Lateral Movement</div>
                                    <div className='matrix-text-tactic'>Collection</div>
                                    <div className='matrix-text-tactic'>Command and Control</div>
                                    <div className='matrix-text-tactic'>Exfiltration</div>
                                    <div className='matrix-text-tactic'>Impact</div>
                                </div>
                                <div className='matrix-division-line3'></div>
                                <div className='tool-matrix-box-content'>
                                  <Box sx={{ width: 110, margin: 1 }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                    <Item key="RC-1" isActive={activeItemIds.includes('RC-1')} onClick={() => handleItemClick('RC-1')}>
                                        {ClickItemIds === 'RC-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                          
                                            <Typography variant="body2">Active Scanning</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Active Scanning</Typography>
                                        )}
                                    </Item>
                                    <Item key="RC-2" isActive={activeItemIds.includes('RC-2')} onClick={() => handleItemClick('RC-2')}>
                                        {ClickItemIds === 'RC-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Gather Victim Host Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Gather Victim Host Information</Typography>
                                        )}</Item>
                                      <Item key="RC-3" isActive={activeItemIds.includes('RC-3')} onClick={() => handleItemClick('RC-3')}>
                                      {ClickItemIds === 'RC-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Gather Victim Identity Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Gather Victim Identity Information</Typography>
                                        )}</Item>
                                      <Item key="RC-4" isActive={activeItemIds.includes('RC-4')} onClick={() => handleItemClick('RC-4')}>
                                      {ClickItemIds === 'RC-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Gather Victim Network Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Gather Victim Network Information</Typography>
                                        )}</Item>
                                      <Item key="RC-5" isActive={activeItemIds.includes('RC-5')} onClick={() => handleItemClick('RC-5')}>
                                      {ClickItemIds === 'RC-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Gather Victim Org Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Gather Victim Org Information</Typography>
                                        )}</Item>
                                      <Item key="RC-6" isActive={activeItemIds.includes('RC-6')} onClick={() => handleItemClick('RC-6')}>
                                      {ClickItemIds === 'RC-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Phishing for Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Phishing for Information</Typography>
                                        )}
                                        </Item>
                                      <Item key="RC-7" isActive={activeItemIds.includes('RC-7')} onClick={() => handleItemClick('RC-7')}>
                                      {ClickItemIds === 'RC-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Search Closed Sources</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Search Closed Sources</Typography>
                                        )}</Item>
                                      <Item key="RC-8" isActive={activeItemIds.includes('RC-8')} onClick={() => handleItemClick('RC-8')}>
                                      {ClickItemIds === 'RC-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Search Open Technical Databases</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Search Open Technical Databases</Typography>
                                        )}</Item>
                                      <Item key="RC-9" isActive={activeItemIds.includes('RC-9')} onClick={() => handleItemClick('RC-9')}>
                                      {ClickItemIds === 'RC-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Search Open Websites/ Domains</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Search Open Websites/ Domains</Typography>
                                        )}</Item>
                                      <Item key="RC-10" isActive={activeItemIds.includes('RC-10')} onClick={() => handleItemClick('RC-10')}>
                                      {ClickItemIds === 'RC-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Search Victim-Owned Websites</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Search Victim-Owned Websites</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="RD-1" isActive={activeItemIds.includes('RD-1')} onClick={() => handleItemClick('RD-1')}>
                                      {ClickItemIds === 'RD-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Acquire Access</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Acquire Access</Typography>
                                        )}</Item>
                                      <Item key="RD-2" isActive={activeItemIds.includes('RD-2')} onClick={() => handleItemClick('RD-2')}>
                                      {ClickItemIds === 'RD-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Acquire Infrastructure</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Acquire Infrastructure</Typography>
                                        )}</Item>
                                      <Item key="RD-3" isActive={activeItemIds.includes('RD-3')} onClick={() => handleItemClick('RD-3')}>
                                      {ClickItemIds === 'RD-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Compromise Accounts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Compromise Accounts</Typography>
                                        )}</Item>
                                      <Item key="RD-4" isActive={activeItemIds.includes('RD-4')} onClick={() => handleItemClick('RD-4')}>
                                      {ClickItemIds === 'RD-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Compromise Infrastructure</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Compromise Infrastructure</Typography>
                                        )}</Item>
                                      <Item key="RD-5" isActive={activeItemIds.includes('RD-5')} onClick={() => handleItemClick('RD-5')}>
                                      {ClickItemIds === 'RD-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Develop Capabilities</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Develop Capabilities</Typography>
                                        )}</Item>
                                      <Item key="RD-6" isActive={activeItemIds.includes('RD-6')} onClick={() => handleItemClick('RD-6')}>
                                      {ClickItemIds === 'RD-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Establish Accounts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Establish Accounts</Typography>
                                        )}</Item>
                                      <Item key="RD-7" isActive={activeItemIds.includes('RD-7')} onClick={() => handleItemClick('RD-7')}>
                                      {ClickItemIds === 'RD-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Obtain Capabilities</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Obtain Capabilities</Typography>
                                        )}</Item>
                                      <Item key="RD-8" isActive={activeItemIds.includes('RD-8')} onClick={() => handleItemClick('RD-8')}>
                                      {ClickItemIds === 'RD-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Stage Capabilities</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Stage Capabilities</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="IA-1" isActive={activeItemIds.includes('IA-1')} onClick={() => handleItemClick('IA-1')}>
                                      {ClickItemIds === 'IA-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Drive-by Compromise</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Drive-by Compromise</Typography>
                                        )}
                                        </Item>
                                      <Item key="IA-2" isActive={activeItemIds.includes('IA-2')} onClick={() => handleItemClick('IA-2')}>
                                      {ClickItemIds === 'IA-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exploit Public-Facing Application</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exploit Public-Facing Application</Typography>
                                        )}</Item>
                                      <Item key="IA-3" isActive={activeItemIds.includes('IA-3')} onClick={() => handleItemClick('IA-3')}>
                                      {ClickItemIds === 'IA-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">External Remote Services</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">External Remote Services</Typography>
                                        )}</Item>
                                      <Item key="IA-4" isActive={activeItemIds.includes('IA-4')} onClick={() => handleItemClick('IA-4')}>
                                      {ClickItemIds === 'IA-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Hardware Additions</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Hardware Additions</Typography>
                                        )}</Item>
                                      <Item key="IA-5" isActive={activeItemIds.includes('IA-5')} onClick={() => handleItemClick('IA-5')}>
                                      {ClickItemIds === 'IA-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Phishing</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Phishing</Typography>
                                        )}</Item>
                                      <Item key="IA-6" isActive={activeItemIds.includes('IA-6')} onClick={() => handleItemClick('IA-6')}>
                                      {ClickItemIds === 'IA-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Replication Through Removable Media</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Replication Through Removable Media</Typography>
                                        )}</Item>
                                      <Item key="IA-7" isActive={activeItemIds.includes('IA-7')} onClick={() => handleItemClick('IA-7')}>
                                      {ClickItemIds === 'IA-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Supply Chain Compromise</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Supply Chain Compromise</Typography>
                                        )}</Item>
                                      <Item key="IA-8" isActive={activeItemIds.includes('IA-8')} onClick={() => handleItemClick('IA-8')}>
                                      {ClickItemIds === 'IA-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Trusted Relationship</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Trusted Relationship</Typography>
                                        )}</Item>
                                      <Item key="IA-9" isActive={activeItemIds.includes('IA-9')} onClick={() => handleItemClick('IA-9')}>
                                      {ClickItemIds === 'IA-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Valid Accounts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Valid Accounts</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="EX-1" isActive={activeItemIds.includes('EX-1')} onClick={() => handleItemClick('EX-1')}>
                                      {ClickItemIds === 'EX-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Cloud Administration Command</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Cloud Administration Command</Typography>
                                        )}</Item>
                                      <Item key="EX-2" isActive={activeItemIds.includes('EX-2')} onClick={() => handleItemClick('EX-2')}>
                                      {ClickItemIds === 'EX-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Command and Scripting Interpreter</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Command and Scripting Interpreter</Typography>
                                        )}</Item>
                                      <Item key="EX-3" isActive={activeItemIds.includes('EX-3')} onClick={() => handleItemClick('EX-3')}>
                                      {ClickItemIds === 'EX-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Container Administration Command</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Container Administration Command</Typography>
                                        )}</Item>
                                      <Item key="EX-4" isActive={activeItemIds.includes('EX-4')} onClick={() => handleItemClick('EX-4')}>
                                      {ClickItemIds === 'EX-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Deploy Container</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Deploy Container</Typography>
                                        )}</Item>
                                      <Item key="EX-5" isActive={activeItemIds.includes('EX-5')} onClick={() => handleItemClick('EX-5')}>
                                      {ClickItemIds === 'EX-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exploitation for Client Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exploitation for Client Execution</Typography>
                                        )}</Item>
                                      <Item key="EX-6" isActive={activeItemIds.includes('EX-6')} onClick={() => handleItemClick('EX-6')}>
                                      {ClickItemIds === 'EX-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Inter-Process Communication</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Inter-Process Communication</Typography>
                                        )}</Item>
                                      <Item key="EX-7" isActive={activeItemIds.includes('EX-7')} onClick={() => handleItemClick('EX-7')}>
                                      {ClickItemIds === 'EX-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Native API</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Native API</Typography>
                                        )}</Item>
                                      <Item key="EX-8" isActive={activeItemIds.includes('EX-8')} onClick={() => handleItemClick('EX-8')}>
                                      {ClickItemIds === 'EX-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Scheduled Task/Job</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Scheduled Task/Job</Typography>
                                        )}</Item>
                                      <Item key="EX-9" isActive={activeItemIds.includes('EX-9')} onClick={() => handleItemClick('EX-9')}>
                                      {ClickItemIds === 'EX-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Serverless Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Serverless Execution</Typography>
                                        )}</Item>
                                      <Item key="EX-10" isActive={activeItemIds.includes('EX-10')} onClick={() => handleItemClick('EX-10')}>
                                      {ClickItemIds === 'EX-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Shared Modulesn</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Shared Modules</Typography>
                                        )}</Item>
                                      <Item key="EX-11" isActive={activeItemIds.includes('EX-11')} onClick={() => handleItemClick('EX-11')}>
                                      {ClickItemIds === 'EX-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Software Deployment Tools</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Software Deployment Tools</Typography>
                                        )}</Item>
                                      <Item key="EX-12" isActive={activeItemIds.includes('EX-12')} onClick={() => handleItemClick('EX-12')}>
                                      {ClickItemIds === 'EX-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Services</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Services</Typography>
                                        )}</Item>
                                      <Item key="EX-13" isActive={activeItemIds.includes('EX-13')} onClick={() => handleItemClick('EX-13')}>
                                      {ClickItemIds === 'EX-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">User Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">User Execution</Typography>
                                        )}</Item>
                                      <Item key="EX-14" isActive={activeItemIds.includes('EX-14')} onClick={() => handleItemClick('EX-14')}>
                                      {ClickItemIds === 'EX-14' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Windows Management Instrumentation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Windows Management Instrumentation</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="PR-1" isActive={activeItemIds.includes('PR-1')} onClick={() => handleItemClick('PR-1')}>
                                      {ClickItemIds === 'PR-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Account Manipulation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Account Manipulation</Typography>
                                        )}</Item>
                                      <Item key="PR-2" isActive={activeItemIds.includes('PR-2')} onClick={() => handleItemClick('PR-2')}>
                                      {ClickItemIds === 'PR-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">BITS Jobs</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">BITS Jobs</Typography>
                                        )}</Item>
                                      <Item key="PR-3" isActive={activeItemIds.includes('PR-3')} onClick={() => handleItemClick('PR-3')}>
                                      {ClickItemIds === 'PR-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Boot or Logon Autostart Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Boot or Logon Autostart Execution</Typography>
                                        )}</Item>
                                      <Item key="PR-4" isActive={activeItemIds.includes('PR-4')} onClick={() => handleItemClick('PR-4')}>
                                      {ClickItemIds === 'PR-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Boot or Logon Initialization Scripts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Boot or Logon Initialization Scripts</Typography>
                                        )}</Item>
                                      <Item key="PR-5" isActive={activeItemIds.includes('PR-5')} onClick={() => handleItemClick('PR-5')}>
                                      {ClickItemIds === 'PR-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Browser Extensions</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Browser Extensions</Typography>
                                        )}</Item>
                                      <Item key="PR-6" isActive={activeItemIds.includes('PR-6')} onClick={() => handleItemClick('PR-6')}>
                                      {ClickItemIds === 'PR-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Compromise Client Software Binary</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Compromise Client Software Binary</Typography>
                                        )}</Item>
                                      <Item key="PR-7" isActive={activeItemIds.includes('PR-7')} onClick={() => handleItemClick('PR-7')}>
                                      {ClickItemIds === 'PR-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Create Account</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Create Account</Typography>
                                        )}</Item>
                                      <Item key="PR-8" isActive={activeItemIds.includes('PR-8')} onClick={() => handleItemClick('PR-8')}>
                                      {ClickItemIds === 'PR-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Create or Modify System Process</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Create or Modify System Process</Typography>
                                        )}</Item>
                                      <Item key="PR-9" isActive={activeItemIds.includes('PR-9')} onClick={() => handleItemClick('PR-9')}>
                                      {ClickItemIds === 'PR-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Event Triggered Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Event Triggered Execution</Typography>
                                        )}</Item>
                                      <Item key="PR-10" isActive={activeItemIds.includes('PR-10')} onClick={() => handleItemClick('PR-10')}>
                                      {ClickItemIds === 'PR-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">External Remote Services</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">External Remote Services</Typography>
                                        )}</Item>
                                      <Item key="PR-11" isActive={activeItemIds.includes('PR-11')} onClick={() => handleItemClick('PR-11')}>
                                      {ClickItemIds === 'PR-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Hijack Execution Flow</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Hijack Execution Flow</Typography>
                                        )}</Item>
                                      <Item key="PR-12" isActive={activeItemIds.includes('PR-12')} onClick={() => handleItemClick('PR-12')}>
                                      {ClickItemIds === 'PR-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Implant Internal Image</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Implant Internal Image</Typography>
                                        )}</Item>
                                      <Item key="PR-13" isActive={activeItemIds.includes('PR-13')} onClick={() => handleItemClick('PR-13')}>
                                      {ClickItemIds === 'PR-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Modify Authentication Process</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Modify Authentication Process</Typography>
                                        )}</Item>
                                      <Item key="PR-14" isActive={activeItemIds.includes('PR-14')} onClick={() => handleItemClick('PR-14')}>
                                      {ClickItemIds === 'PR-14' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Office Application Startup</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Office Application Startup</Typography>
                                        )}</Item>
                                      <Item key="PR-15" isActive={activeItemIds.includes('PR-15')} onClick={() => handleItemClick('PR-15')}>
                                      {ClickItemIds === 'PR-15' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Pre-OS Boot</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Pre-OS Boot</Typography>
                                        )}</Item>
                                      <Item key="PR-16" isActive={activeItemIds.includes('PR-16')} onClick={() => handleItemClick('PR-16')}>
                                      {ClickItemIds === 'PR-16' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Scheduled Task/Job</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Scheduled Task/Job</Typography>
                                        )}</Item>
                                      <Item key="PR-17" isActive={activeItemIds.includes('PR-17')} onClick={() => handleItemClick('PR-17')}>
                                      {ClickItemIds === 'PR-17' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Server Software Component</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Server Software Component</Typography>
                                        )}</Item>
                                      <Item key="PR-18" isActive={activeItemIds.includes('PR-18')} onClick={() => handleItemClick('PR-18')}>
                                      {ClickItemIds === 'PR-18' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Traffic Signaling</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Traffic Signaling</Typography>
                                        )}</Item>
                                      <Item key="PR-19" isActive={activeItemIds.includes('PR-19')} onClick={() => handleItemClick('PR-19')}>
                                      {ClickItemIds === 'PR-19' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Valid Accounts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Valid Accounts</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="PE-1" isActive={activeItemIds.includes('PE-1')} onClick={() => handleItemClick('PE-1')}>
                                      {ClickItemIds === 'PE-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Abuse Elevation Control Mechanism</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Abuse Elevation Control Mechanism</Typography>
                                        )}</Item>
                                      <Item key="PE-2" isActive={activeItemIds.includes('PE-2')} onClick={() => handleItemClick('PE-2')}>
                                      {ClickItemIds === 'PE-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Access Token Manipulation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Access Token Manipulation</Typography>
                                        )}</Item>
                                      <Item key="PE-3" isActive={activeItemIds.includes('PE-3')} onClick={() => handleItemClick('PE-3')}>
                                      {ClickItemIds === 'PE-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Boot or Logon Autostart Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Boot or Logon Autostart Execution</Typography>
                                        )}</Item>
                                      <Item key="PE-4" isActive={activeItemIds.includes('PE-4')} onClick={() => handleItemClick('PE-4')}>
                                      {ClickItemIds === 'PE-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Boot or Logon Initialization Scripts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Boot or Logon Initialization Scripts</Typography>
                                        )}</Item>
                                      <Item key="PE-5" isActive={activeItemIds.includes('PE-5')} onClick={() => handleItemClick('PE-5')}>
                                      {ClickItemIds === 'PE-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Create or Modify System Process</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Create or Modify System Process</Typography>
                                        )}</Item>
                                      <Item key="PE-6" isActive={activeItemIds.includes('PE-6')} onClick={() => handleItemClick('PE-6')}>
                                      {ClickItemIds === 'PE-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Domain Policy Modification</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Domain Policy Modification</Typography>
                                        )}</Item>
                                      <Item key="PE-7" isActive={activeItemIds.includes('PE-7')} onClick={() => handleItemClick('PE-7')}>
                                      {ClickItemIds === 'PE-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Escape to Host</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Escape to Host</Typography>
                                        )}</Item>
                                      <Item key="PE-8" isActive={activeItemIds.includes('PE-8')} onClick={() => handleItemClick('PE-8')}>
                                      {ClickItemIds === 'PE-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Event Triggered Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Event Triggered Execution</Typography>
                                        )}</Item>
                                      <Item key="PE-9" isActive={activeItemIds.includes('PE-9')} onClick={() => handleItemClick('PE-9')}>
                                      {ClickItemIds === 'PE-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exploitation for Privilege Escalation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exploitation for Privilege Escalation</Typography>
                                        )}</Item>
                                      <Item key="PE-10" isActive={activeItemIds.includes('PE-10')} onClick={() => handleItemClick('PE-10')}>
                                      {ClickItemIds === 'PE-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Hijack Execution Flow</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Hijack Execution Flow</Typography>
                                        )}</Item>
                                      <Item key="PE-11" isActive={activeItemIds.includes('PE-11')} onClick={() => handleItemClick('PE-11')}>
                                      {ClickItemIds === 'PE-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Process Injection</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Process Injection</Typography>
                                        )}</Item>
                                      <Item key="PE-12" isActive={activeItemIds.includes('PE-12')} onClick={() => handleItemClick('PE-12')}>
                                      {ClickItemIds === 'PE-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Scheduled Task/Job</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Scheduled Task/Job</Typography>
                                        )}</Item>
                                      <Item key="PE-13" isActive={activeItemIds.includes('PE-13')} onClick={() => handleItemClick('PE-13')}>
                                      {ClickItemIds === 'PE-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Valid Accounts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Valid Accounts</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="DE-1" isActive={activeItemIds.includes('DE-1')} onClick={() => handleItemClick('DE-1')}>
                                      {ClickItemIds === 'DE-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Abuse Elevation Control Mechanism</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Abuse Elevation Control Mechanism</Typography>
                                        )}</Item>
                                      <Item key="DE-2" isActive={activeItemIds.includes('DE-2')} onClick={() => handleItemClick('DE-2')}>
                                      {ClickItemIds === 'DE-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Access Token Manipulation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Access Token Manipulation</Typography>
                                        )}</Item>
                                      <Item key="DE-3" isActive={activeItemIds.includes('DE-3')} onClick={() => handleItemClick('DE-3')}>
                                      {ClickItemIds === 'DE-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">BITS Jobs</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">BITS Jobs</Typography>
                                        )}</Item>
                                      <Item key="DE-4" isActive={activeItemIds.includes('DE-4')} onClick={() => handleItemClick('DE-4')}>
                                      {ClickItemIds === 'DE-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Build Image on Host</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Build Image on Host</Typography>
                                        )}</Item>
                                      <Item key="DE-5" isActive={activeItemIds.includes('DE-5')} onClick={() => handleItemClick('DE-5')}>
                                      {ClickItemIds === 'DE-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Debugger Evasion</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Debugger Evasion</Typography>
                                        )}</Item>
                                      <Item key="DE-6" isActive={activeItemIds.includes('DE-6')} onClick={() => handleItemClick('DE-6')}>
                                      {ClickItemIds === 'DE-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Deobfuscate/ Decode Files or Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Deobfuscate/ Decode Files or Information</Typography>
                                        )}</Item>
                                      <Item key="DE-7" isActive={activeItemIds.includes('DE-7')} onClick={() => handleItemClick('DE-7')}>
                                      {ClickItemIds === 'DE-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Deploy Container</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Deploy Container</Typography>
                                        )}</Item>
                                      <Item key="DE-8" isActive={activeItemIds.includes('DE-8')} onClick={() => handleItemClick('DE-8')}>
                                      {ClickItemIds === 'DE-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Direct Volume Access</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Direct Volume Access</Typography>
                                        )}</Item>
                                      <Item key="DE-9" isActive={activeItemIds.includes('DE-9')} onClick={() => handleItemClick('DE-9')}>
                                      {ClickItemIds === 'DE-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Domain Policy Modification</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Domain Policy Modification</Typography>
                                        )}</Item>
                                      <Item key="DE-10" isActive={activeItemIds.includes('DE-10')} onClick={() => handleItemClick('DE-10')}>
                                      {ClickItemIds === 'DE-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Execution Guardrails</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Execution Guardrails</Typography>
                                        )}</Item>
                                      <Item key="DE-11" isActive={activeItemIds.includes('DE-11')} onClick={() => handleItemClick('DE-11')}>
                                      {ClickItemIds === 'DE-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exploitation for Defense Evasion</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exploitation for Defense Evasion</Typography>
                                        )}</Item>
                                      <Item key="DE-12" isActive={activeItemIds.includes('DE-12')} onClick={() => handleItemClick('DE-12')}>
                                      {ClickItemIds === 'DE-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">File and Directory Permissions Modification</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">File and Directory Permissions Modification</Typography>
                                        )}</Item>
                                      <Item key="DE-13" isActive={activeItemIds.includes('DE-13')} onClick={() => handleItemClick('DE-13')}>
                                      {ClickItemIds === 'DE-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Hide Artifacts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Hide Artifacts</Typography>
                                        )}</Item>
                                      <Item key="DE-14" isActive={activeItemIds.includes('DE-14')} onClick={() => handleItemClick('DE-14')}>
                                      {ClickItemIds === 'DE-14' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Hijack Execution Flow</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Hijack Execution Flow</Typography>
                                        )}</Item>
                                      <Item key="DE-15" isActive={activeItemIds.includes('DE-15')} onClick={() => handleItemClick('DE-15')}>
                                      {ClickItemIds === 'DE-15' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Impair Defenses</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Impair Defenses</Typography>
                                        )}</Item>
                                      <Item key="DE-16" isActive={activeItemIds.includes('DE-16')} onClick={() => handleItemClick('DE-16')}>
                                      {ClickItemIds === 'DE-16' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Indicator Removal</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Indicator Removal</Typography>
                                        )}</Item>
                                      <Item key="DE-17" isActive={activeItemIds.includes('DE-17')} onClick={() => handleItemClick('DE-17')}>
                                      {ClickItemIds === 'DE-17' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Indirect Command Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Indirect Command Execution</Typography>
                                        )}</Item>
                                      <Item key="DE-18" isActive={activeItemIds.includes('DE-18')} onClick={() => handleItemClick('DE-18')}>
                                      {ClickItemIds === 'DE-18' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Masquerading</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Masquerading</Typography>
                                        )}</Item>
                                      <Item key="DE-19" isActive={activeItemIds.includes('DE-19')} onClick={() => handleItemClick('DE-19')}>
                                      {ClickItemIds === 'DE-19' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Modify Authentication Process</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Modify Authentication Process</Typography>
                                        )}</Item>
                                      <Item key="DE-20" isActive={activeItemIds.includes('DE-20')} onClick={() => handleItemClick('DE-20')}>
                                      {ClickItemIds === 'DE-20' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Modify Cloud Compute Infrastructure</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Modify Cloud Compute Infrastructure</Typography>
                                        )}</Item>
                                      <Item key="DE-21" isActive={activeItemIds.includes('DE-21')} onClick={() => handleItemClick('DE-21')}>
                                      {ClickItemIds === 'DE-21' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Modify Registry</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Modify Registry</Typography>
                                        )}</Item>
                                      <Item key="DE-22" isActive={activeItemIds.includes('DE-22')} onClick={() => handleItemClick('DE-22')}>
                                      {ClickItemIds === 'DE-22' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Modify System Image</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Modify System Image</Typography>
                                        )}</Item>
                                      <Item key="DE-23" isActive={activeItemIds.includes('DE-23')} onClick={() => handleItemClick('DE-23')}>
                                      {ClickItemIds === 'DE-23' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Network Boundary Bridging</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Network Boundary Bridging</Typography>
                                        )}</Item>
                                      <Item key="DE-24" isActive={activeItemIds.includes('DE-24')} onClick={() => handleItemClick('DE-24')}>
                                      {ClickItemIds === 'DE-24' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Obfuscated Files or Information</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Obfuscated Files or Information</Typography>
                                        )}</Item>
                                      <Item key="DE-25" isActive={activeItemIds.includes('DE-25')} onClick={() => handleItemClick('DE-25')}>
                                      {ClickItemIds === 'DE-25' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Plist File Modification</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Plist File Modification</Typography>
                                        )}</Item>
                                      <Item key="DE-26" isActive={activeItemIds.includes('DE-26')} onClick={() => handleItemClick('DE-26')}>
                                      {ClickItemIds === 'DE-26' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Pre-OS Boot</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Pre-OS Boot</Typography>
                                        )}</Item>
                                      <Item key="DE-27" isActive={activeItemIds.includes('DE-27')} onClick={() => handleItemClick('DE-27')}>
                                      {ClickItemIds === 'DE-27' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Process Injection</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Process Injection</Typography>
                                        )}</Item>
                                      <Item key="DE-28" isActive={activeItemIds.includes('DE-28')} onClick={() => handleItemClick('DE-28')}>
                                      {ClickItemIds === 'DE-28' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Reflective Code Loading</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Reflective Code Loading</Typography>
                                        )}</Item>
                                      <Item key="DE-29" isActive={activeItemIds.includes('DE-29')} onClick={() => handleItemClick('DE-29')}>
                                      {ClickItemIds === 'DE-29' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Rogue Domain Controller</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Rogue Domain Controller</Typography>
                                        )}</Item>
                                      <Item key="DE-30" isActive={activeItemIds.includes('DE-30')} onClick={() => handleItemClick('DE-30')}>
                                      {ClickItemIds === 'DE-30' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Rootkit</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Rootkit</Typography>
                                        )}</Item>
                                      <Item key="DE-31" isActive={activeItemIds.includes('DE-31')} onClick={() => handleItemClick('DE-31')}>
                                      {ClickItemIds === 'DE-31' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Subvert Trust Controls</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Subvert Trust Controls</Typography>
                                        )}</Item>
                                      <Item key="DE-32" isActive={activeItemIds.includes('DE-32')} onClick={() => handleItemClick('DE-32')}>
                                      {ClickItemIds === 'DE-32' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Binary Proxy Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Binary Proxy Execution</Typography>
                                        )}</Item>
                                      <Item key="DE-33" isActive={activeItemIds.includes('DE-33')} onClick={() => handleItemClick('DE-33')}>
                                      {ClickItemIds === 'DE-33' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Script Proxy Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Script Proxy Execution</Typography>
                                        )}</Item>
                                      <Item key="DE-34" isActive={activeItemIds.includes('DE-34')} onClick={() => handleItemClick('DE-34')}>
                                      {ClickItemIds === 'DE-34' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Template Injection</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Template Injection</Typography>
                                        )}</Item>
                                      <Item key="DE-35" isActive={activeItemIds.includes('DE-35')} onClick={() => handleItemClick('DE-35')}>
                                      {ClickItemIds === 'DE-35' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Traffic Signaling</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Traffic Signaling</Typography>
                                        )}</Item>
                                      <Item key="DE-36" isActive={activeItemIds.includes('DE-36')} onClick={() => handleItemClick('DE-36')}>
                                      {ClickItemIds === 'DE-36' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Trusted Developer Utilities Proxy Execution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Trusted Developer Utilities Proxy Execution</Typography>
                                        )}</Item>
                                      <Item key="DE-37" isActive={activeItemIds.includes('DE-37')} onClick={() => handleItemClick('DE-37')}>
                                      {ClickItemIds === 'DE-37' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Unused/ Unsupported Cloud Regions</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Unused/ Unsupported Cloud Regions</Typography>
                                        )}</Item>
                                      <Item key="DE-38" isActive={activeItemIds.includes('DE-38')} onClick={() => handleItemClick('DE-38')}>
                                      {ClickItemIds === 'DE-38' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Use Alternate Authentication Material</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Use Alternate Authentication Material</Typography>
                                        )}</Item>
                                      <Item key="DE-39" isActive={activeItemIds.includes('DE-39')} onClick={() => handleItemClick('DE-39')}>
                                      {ClickItemIds === 'DE-39' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Valid Accounts</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Valid Accounts</Typography>
                                        )}</Item>
                                      <Item key="DE-40" isActive={activeItemIds.includes('DE-40')} onClick={() => handleItemClick('DE-40')}>
                                      {ClickItemIds === 'DE-40' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Virtualization / Sandbox Evasion</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Virtualization / Sandbox Evasion</Typography>
                                        )}</Item>
                                      <Item key="DE-41" isActive={activeItemIds.includes('DE-41')} onClick={() => handleItemClick('DE-41')}>
                                      {ClickItemIds === 'DE-41' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Weaken Encryption</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Weaken Encryption</Typography>
                                        )}</Item>
                                      <Item key="DE-42" isActive={activeItemIds.includes('DE-42')} onClick={() => handleItemClick('DE-42')}>
                                      {ClickItemIds === 'DE-42' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">XSL Script Processing</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">XSL Script Processing</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="CA-1" isActive={activeItemIds.includes('CA-1')} onClick={() => handleItemClick('CA-1')}>
                                      {ClickItemIds === 'CA-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Adversary-in-the-Middle</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Adversary-in-the-Middle</Typography>
                                        )}</Item>
                                      <Item key="CA-2" isActive={activeItemIds.includes('CA-2')} onClick={() => handleItemClick('CA-2')}>
                                      {ClickItemIds === 'CA-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Brute Force</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Brute Force</Typography>
                                        )}</Item>
                                      <Item key="CA-3" isActive={activeItemIds.includes('CA-3')} onClick={() => handleItemClick('CA-3')}>
                                      {ClickItemIds === 'CA-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Credentials from Password Stores</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Credentials from Password Stores</Typography>
                                        )}</Item>
                                      <Item key="CA-4" isActive={activeItemIds.includes('CA-4')} onClick={() => handleItemClick('CA-4')}>
                                      {ClickItemIds === 'CA-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exploitation for Credential Access</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exploitation for Credential Access</Typography>
                                        )}</Item>
                                      <Item key="CA-5" isActive={activeItemIds.includes('CA-5')} onClick={() => handleItemClick('CA-5')}>
                                      {ClickItemIds === 'CA-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Forced Authentication</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Forced Authentication</Typography>
                                        )}</Item>
                                      <Item key="CA-6" isActive={activeItemIds.includes('CA-6')} onClick={() => handleItemClick('CA-6')}>
                                      {ClickItemIds === 'CA-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Forge Web Credentials</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Forge Web Credentials</Typography>
                                        )}</Item>
                                      <Item key="CA-7" isActive={activeItemIds.includes('CA-7')} onClick={() => handleItemClick('CA-7')}>
                                      {ClickItemIds === 'CA-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Input Capture</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Input Capture</Typography>
                                        )}</Item>
                                      <Item key="CA-8" isActive={activeItemIds.includes('CA-8')} onClick={() => handleItemClick('CA-8')}>
                                      {ClickItemIds === 'CA-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Modify Authentication Process</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Modify Authentication Process</Typography>
                                        )}</Item>
                                      <Item key="CA-9" isActive={activeItemIds.includes('CA-9')} onClick={() => handleItemClick('CA-9')}>
                                      {ClickItemIds === 'CA-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Multi-Factor Authentication Interception</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Multi-Factor Authentication Interception</Typography>
                                        )}</Item>
                                      <Item key="CA-10" isActive={activeItemIds.includes('CA-10')} onClick={() => handleItemClick('CA-10')}>
                                      {ClickItemIds === 'CA-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Multi-Factor Authentication Request Generation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Multi-Factor Authentication Request Generation</Typography>
                                        )}</Item>
                                      <Item key="CA-11" isActive={activeItemIds.includes('CA-11')} onClick={() => handleItemClick('CA-11')}>
                                      {ClickItemIds === 'CA-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Network Sniffing</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Network Sniffing</Typography>
                                        )}</Item>
                                      <Item key="CA-12" isActive={activeItemIds.includes('CA-12')} onClick={() => handleItemClick('CA-12')}>
                                      {ClickItemIds === 'CA-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">OS Credential Dumping</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">OS Credential Dumping</Typography>
                                        )}</Item>
                                      <Item key="CA-13" isActive={activeItemIds.includes('CA-13')} onClick={() => handleItemClick('CA-13')}>
                                      {ClickItemIds === 'CA-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Steal Application Access Token</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Steal Application Access Token</Typography>
                                        )}</Item>
                                      <Item key="CA-14" isActive={activeItemIds.includes('CA-14')} onClick={() => handleItemClick('CA-14')}>
                                      {ClickItemIds === 'CA-14' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Steal Web Session Cookie</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Steal Web Session Cookie</Typography>
                                        )}</Item>
                                      <Item key="CA-15" isActive={activeItemIds.includes('CA-15')} onClick={() => handleItemClick('CA-15')}>
                                      {ClickItemIds === 'CA-15' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Steal or Forge Authentication Certificates</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Steal or Forge Authentication Certificates</Typography>
                                        )}</Item>
                                      <Item key="CA-16" isActive={activeItemIds.includes('CA-16')} onClick={() => handleItemClick('CA-16')}>
                                      {ClickItemIds === 'CA-16' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Steal or Forge Kerberos Tickets</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Steal or Forge Kerberos Tickets</Typography>
                                        )}</Item>
                                      <Item key="CA-17" isActive={activeItemIds.includes('CA-17')} onClick={() => handleItemClick('CA-17')}>
                                      {ClickItemIds === 'CA-17' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Unsecured Credentials</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Unsecured Credentials</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="DI-1" isActive={activeItemIds.includes('DI-1')} onClick={() => handleItemClick('DI-1')}>
                                      {ClickItemIds === 'DI-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Account Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Account Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-2" isActive={activeItemIds.includes('DI-2')} onClick={() => handleItemClick('DI-2')}>
                                      {ClickItemIds === 'DI-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Application Window Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Application Window Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-3" isActive={activeItemIds.includes('DI-3')} onClick={() => handleItemClick('DI-3')}>
                                      {ClickItemIds === 'DI-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Browser Information Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Browser Information Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-4" isActive={activeItemIds.includes('DI-4')} onClick={() => handleItemClick('DI-4')}>
                                      {ClickItemIds === 'DI-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Cloud Infrastructure Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Cloud Infrastructure Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-5" isActive={activeItemIds.includes('DI-5')} onClick={() => handleItemClick('DI-5')}>
                                      {ClickItemIds === 'DI-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Cloud Service Dashboard</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Cloud Service Dashboard</Typography>
                                        )}</Item>
                                      <Item key="DI-6" isActive={activeItemIds.includes('DI-6')} onClick={() => handleItemClick('DI-6')}>
                                      {ClickItemIds === 'DI-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Cloud Service Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Cloud Service Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-7" isActive={activeItemIds.includes('DI-7')} onClick={() => handleItemClick('DI-7')}>
                                      {ClickItemIds === 'DI-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Cloud Storage Object Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Cloud Storage Object Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-8" isActive={activeItemIds.includes('DI-8')} onClick={() => handleItemClick('DI-8')}>
                                      {ClickItemIds === 'DI-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Container and Resource Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Container and Resource Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-9" isActive={activeItemIds.includes('DI-9')} onClick={() => handleItemClick('DI-9')}>
                                      {ClickItemIds === 'DI-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Debugger Evasion</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Debugger Evasion</Typography>
                                        )}</Item>
                                      <Item key="DI-10" isActive={activeItemIds.includes('DI-10')} onClick={() => handleItemClick('DI-10')}>
                                      {ClickItemIds === 'DI-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Device Driver Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Device Driver Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-11" isActive={activeItemIds.includes('DI-11')} onClick={() => handleItemClick('DI-11')}>
                                      {ClickItemIds === 'DI-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Domain Trust Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Domain Trust Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-12" isActive={activeItemIds.includes('DI-12')} onClick={() => handleItemClick('DI-12')}>
                                      {ClickItemIds === 'DI-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">File and Directory Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">File and Directory Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-13" isActive={activeItemIds.includes('DI-13')} onClick={() => handleItemClick('DI-13')}>
                                      {ClickItemIds === 'DI-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Group Policy Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Group Policy Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-14" isActive={activeItemIds.includes('DI-14')} onClick={() => handleItemClick('DI-14')}>
                                      {ClickItemIds === 'DI-14' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Network Service Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Network Service Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-15" isActive={activeItemIds.includes('DI-15')} onClick={() => handleItemClick('DI-15')}>
                                      {ClickItemIds === 'DI-15' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Network Share Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Network Share Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-16" isActive={activeItemIds.includes('DI-16')} onClick={() => handleItemClick('DI-16')}>
                                      {ClickItemIds === 'DI-16' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Network Sniffing</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Network Sniffing</Typography>
                                        )}</Item>
                                      <Item key="DI-17" isActive={activeItemIds.includes('DI-17')} onClick={() => handleItemClick('DI-17')}>
                                      {ClickItemIds === 'DI-17' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Password Policy Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Password Policy Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-18" isActive={activeItemIds.includes('DI-18')} onClick={() => handleItemClick('DI-18')}>
                                      {ClickItemIds === 'DI-18' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Peripheral Device Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Peripheral Device Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-19" isActive={activeItemIds.includes('DI-19')} onClick={() => handleItemClick('DI-19')}>
                                      {ClickItemIds === 'DI-19' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Permission Groups Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Permission Groups Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-20" isActive={activeItemIds.includes('DI-20')} onClick={() => handleItemClick('DI-20')}>
                                      {ClickItemIds === 'DI-20' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Process Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Process Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-21" isActive={activeItemIds.includes('DI-21')} onClick={() => handleItemClick('DI-21')}>
                                      {ClickItemIds === 'DI-21' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Query Registry</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Query Registry</Typography>
                                        )}</Item>
                                      <Item key="DI-22" isActive={activeItemIds.includes('DI-22')} onClick={() => handleItemClick('DI-22')}>
                                      {ClickItemIds === 'DI-22' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Remote System Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Remote System Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-23" isActive={activeItemIds.includes('DI-23')} onClick={() => handleItemClick('DI-23')}>
                                      {ClickItemIds === 'DI-23' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Software Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Software Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-24" isActive={activeItemIds.includes('DI-24')} onClick={() => handleItemClick('DI-24')}>
                                      {ClickItemIds === 'DI-24' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Information Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Information Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-25" isActive={activeItemIds.includes('DI-25')} onClick={() => handleItemClick('DI-25')}>
                                      {ClickItemIds === 'DI-25' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Location Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Location Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-26" isActive={activeItemIds.includes('DI-26')} onClick={() => handleItemClick('DI-26')}>
                                      {ClickItemIds === 'DI-26' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Network Configuration Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Network Configuration Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-27" isActive={activeItemIds.includes('DI-27')} onClick={() => handleItemClick('DI-27')}>
                                      {ClickItemIds === 'DI-27' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Network Connections Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Network Connections Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-28" isActive={activeItemIds.includes('DI-28')} onClick={() => handleItemClick('DI-28')}>
                                      {ClickItemIds === 'DI-28' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Owner/ User Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Owner/ User Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-29" isActive={activeItemIds.includes('DI-29')} onClick={() => handleItemClick('DI-29')}>
                                      {ClickItemIds === 'DI-29' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Service Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Service Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-30" isActive={activeItemIds.includes('DI-30')} onClick={() => handleItemClick('DI-30')}>
                                      {ClickItemIds === 'DI-30' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Time Discovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Time Discovery</Typography>
                                        )}</Item>
                                      <Item key="DI-31" isActive={activeItemIds.includes('DI-31')} onClick={() => handleItemClick('DI-31')}>
                                      {ClickItemIds === 'DI-31' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Virtualization/ Sandbox Evasion</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Virtualization/ Sandbox Evasion</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="LM-1" isActive={activeItemIds.includes('LM-1')} onClick={() => handleItemClick('LM-1')}>
                                      {ClickItemIds === 'LM-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exploitation of Remote Services</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exploitation of Remote Services</Typography>
                                        )}</Item>
                                      <Item key="LM-2" isActive={activeItemIds.includes('LM-2')} onClick={() => handleItemClick('LM-2')}>
                                      {ClickItemIds === 'LM-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Internal Spearphishing</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Internal Spearphishing</Typography>
                                        )}</Item>
                                      <Item key="LM-3" isActive={activeItemIds.includes('LM-3')} onClick={() => handleItemClick('LM-3')}>
                                      {ClickItemIds === 'LM-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Lateral Tool Transfer</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Lateral Tool Transfer</Typography>
                                        )}</Item>
                                      <Item key="LM-4" isActive={activeItemIds.includes('LM-4')} onClick={() => handleItemClick('LM-4')}>
                                      {ClickItemIds === 'LM-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Remote Service Session Hijacking</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Remote Service Session Hijacking</Typography>
                                        )}</Item>
                                      <Item key="LM-5" isActive={activeItemIds.includes('LM-5')} onClick={() => handleItemClick('LM-5')}>
                                      {ClickItemIds === 'LM-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Remote Services</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Remote Services</Typography>
                                        )}</Item>
                                      <Item key="LM-6" isActive={activeItemIds.includes('LM-6')} onClick={() => handleItemClick('LM-6')}>
                                      {ClickItemIds === 'LM-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Replication Through Removable Media</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Replication Through Removable Media</Typography>
                                        )}</Item>
                                      <Item key="LM-7" isActive={activeItemIds.includes('LM-7')} onClick={() => handleItemClick('LM-7')}>
                                      {ClickItemIds === 'LM-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Software Deployment Tools</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Software Deployment Tools</Typography>
                                        )}</Item>
                                      <Item key="LM-8" isActive={activeItemIds.includes('LM-8')} onClick={() => handleItemClick('LM-8')}>
                                      {ClickItemIds === 'LM-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Taint Shared Content</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Taint Shared Content</Typography>
                                        )}</Item>
                                      <Item key="LM-9" isActive={activeItemIds.includes('LM-9')} onClick={() => handleItemClick('LM-9')}>
                                      {ClickItemIds === 'LM-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Use Alternate Authentication Material</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Use Alternate Authentication Material</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="CO-1" isActive={activeItemIds.includes('CO-1')} onClick={() => handleItemClick('CO-1')}>
                                      {ClickItemIds === 'CO-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Adversary-in-the-Middle</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Adversary-in-the-Middle</Typography>
                                        )}</Item>
                                      <Item key="CO-2" isActive={activeItemIds.includes('CO-2')} onClick={() => handleItemClick('CO-2')}>
                                      {ClickItemIds === 'CO-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Archive Collected Data</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Archive Collected Data</Typography>
                                        )}</Item>
                                      <Item key="CO-3" isActive={activeItemIds.includes('CO-3')} onClick={() => handleItemClick('CO-3')}>
                                      {ClickItemIds === 'CO-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Audio Capture</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Audio Capture</Typography>
                                        )}</Item>
                                      <Item key="CO-4" isActive={activeItemIds.includes('CO-4')} onClick={() => handleItemClick('CO-4')}>
                                      {ClickItemIds === 'CO-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Automated Collection</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Automated Collection</Typography>
                                        )}</Item>
                                      <Item key="CO-5" isActive={activeItemIds.includes('CO-5')} onClick={() => handleItemClick('CO-5')}>
                                      {ClickItemIds === 'CO-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Browser Session Hijacking</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Browser Session Hijacking</Typography>
                                        )}</Item>
                                      <Item key="CO-6" isActive={activeItemIds.includes('CO-6')} onClick={() => handleItemClick('CO-6')}>
                                      {ClickItemIds === 'CO-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Clipboard Data</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Clipboard Data</Typography>
                                        )}</Item>
                                      <Item key="CO-7" isActive={activeItemIds.includes('CO-7')} onClick={() => handleItemClick('CO-7')}>
                                      {ClickItemIds === 'CO-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data Staged</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data Staged</Typography>
                                        )}</Item>
                                      <Item key="CO-8" isActive={activeItemIds.includes('CO-8')} onClick={() => handleItemClick('CO-8')}>
                                      {ClickItemIds === 'CO-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data from Cloud Storage</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data from Cloud Storage</Typography>
                                        )}</Item>
                                      <Item key="CO-9" isActive={activeItemIds.includes('CO-9')} onClick={() => handleItemClick('CO-9')}>
                                      {ClickItemIds === 'CO-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data from Configuration Repository</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data from Configuration Repository</Typography>
                                        )}</Item>
                                      <Item key="CO-10" isActive={activeItemIds.includes('CO-10')} onClick={() => handleItemClick('CO-10')}>
                                      {ClickItemIds === 'CO-10' ? (
                                        <LightTooltip2 title={MitreTip} placement="right">
                                            <Typography variant="body2">Data from Information Repositories</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data from Information Repositories</Typography>
                                        )}</Item>
                                      <Item key="CO-11" isActive={activeItemIds.includes('CO-11')} onClick={() => handleItemClick('CO-11')}>
                                      {ClickItemIds === 'CO-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data from Local System</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data from Local System</Typography>
                                        )}</Item>
                                      <Item key="CO-12" isActive={activeItemIds.includes('CO-12')} onClick={() => handleItemClick('CO-12')}>
                                      {ClickItemIds === 'CO-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data from Network Shared Drive</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data from Network Shared Drive</Typography>
                                        )}</Item>
                                      <Item key="CO-13" isActive={activeItemIds.includes('CO-13')} onClick={() => handleItemClick('CO-13')}>
                                      {ClickItemIds === 'CO-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data from Removable Media</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data from Removable Media</Typography>
                                        )}</Item>
                                      <Item key="CO-14" isActive={activeItemIds.includes('CO-14')} onClick={() => handleItemClick('CO-14')}>
                                      {ClickItemIds === 'CO-14' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Email Collection</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Email Collection</Typography>
                                        )}</Item>
                                      <Item key="CO-15" isActive={activeItemIds.includes('CO-15')} onClick={() => handleItemClick('CO-15')}>
                                      {ClickItemIds === 'CO-15' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Input Capture</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Input Capture</Typography>
                                        )}</Item>
                                      <Item key="CO-16" isActive={activeItemIds.includes('CO-16')} onClick={() => handleItemClick('CO-16')}>
                                      {ClickItemIds === 'CO-16' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Screen Capture</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Screen Capture</Typography>
                                        )}</Item>
                                      <Item key="CO-17" isActive={activeItemIds.includes('CO-17')} onClick={() => handleItemClick('CO-17')}>
                                      {ClickItemIds === 'CO-17' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Video Capture</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Video Capture</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="EXF-1" isActive={activeItemIds.includes('EXF-1')} onClick={() => handleItemClick('EXF-1')}>
                                      {ClickItemIds === 'EXF-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Application Layer Protocol</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Application Layer Protocol</Typography>
                                        )}</Item>
                                      <Item key="EXF-2" isActive={activeItemIds.includes('EXF-2')} onClick={() => handleItemClick('EXF-2')}>
                                      {ClickItemIds === 'EXF-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Communication Through Removable Media</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Communication Through Removable Media</Typography>
                                        )}</Item>
                                      <Item key="EXF-3" isActive={activeItemIds.includes('EXF-3')} onClick={() => handleItemClick('EXF-3')}>
                                      {ClickItemIds === 'EXF-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data Encoding</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data Encoding</Typography>
                                        )}</Item>
                                      <Item key="EXF-4" isActive={activeItemIds.includes('EXF-4')} onClick={() => handleItemClick('EXF-4')}>
                                      {ClickItemIds === 'EXF-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data Obfuscation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data Obfuscation</Typography>
                                        )}</Item>
                                      <Item key="EXF-5" isActive={activeItemIds.includes('EXF-5')} onClick={() => handleItemClick('EXF-5')}>
                                      {ClickItemIds === 'EXF-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Dynamic Resolution</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Dynamic Resolution</Typography>
                                        )}</Item>
                                      <Item key="EXF-6" isActive={activeItemIds.includes('EXF-6')} onClick={() => handleItemClick('EXF-6')}>
                                      {ClickItemIds === 'EXF-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Encrypted Channel</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Encrypted Channel</Typography>
                                        )}</Item>
                                      <Item key="EXF-7" isActive={activeItemIds.includes('EXF-7')} onClick={() => handleItemClick('EXF-7')}>
                                      {ClickItemIds === 'EXF-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Fallback Channels</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Fallback Channels</Typography>
                                        )}</Item>
                                      <Item key="EXF-8" isActive={activeItemIds.includes('EXF-8')} onClick={() => handleItemClick('EXF-8')}>
                                      {ClickItemIds === 'EXF-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Ingress Tool Transfer</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Ingress Tool Transfer</Typography>
                                        )}</Item>
                                      <Item key="EXF-9" isActive={activeItemIds.includes('EXF-9')} onClick={() => handleItemClick('EXF-9')}>
                                      {ClickItemIds === 'EXF-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Multi-Stage Channels</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Multi-Stage Channels</Typography>
                                        )}</Item>
                                      <Item key="EXF-10" isActive={activeItemIds.includes('EXF-10')} onClick={() => handleItemClick('EXF-10')}>
                                      {ClickItemIds === 'EXF-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Non-Application Layer Protocol</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Non-Application Layer Protocol</Typography>
                                        )}</Item>
                                      <Item key="EXF-11" isActive={activeItemIds.includes('EXF-11')} onClick={() => handleItemClick('EXF-11')}>
                                      {ClickItemIds === 'EXF-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Non-Standard Port</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Non-Standard Port</Typography>
                                        )}</Item>
                                      <Item key="EXF-12" isActive={activeItemIds.includes('EXF-12')} onClick={() => handleItemClick('EXF-12')}>
                                      {ClickItemIds === 'EXF-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Protocol Tunneling</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Protocol Tunneling</Typography>
                                        )}</Item>
                                      <Item key="EXF-13" isActive={activeItemIds.includes('EXF-13')} onClick={() => handleItemClick('EXF-13')}>
                                      {ClickItemIds === 'EXF-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Proxy</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Proxy</Typography>
                                        )}</Item>
                                      <Item key="EXF-14" isActive={activeItemIds.includes('EXF-14')} onClick={() => handleItemClick('EXF-14')}>
                                      {ClickItemIds === 'EXF-14' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Remote Access Software</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Remote Access Software</Typography>
                                        )}</Item>
                                      <Item key="EXF-15" isActive={activeItemIds.includes('EXF-15')} onClick={() => handleItemClick('EXF-15')}>
                                      {ClickItemIds === 'EXF-15' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Traffic Signaling</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Traffic Signaling</Typography>
                                        )}</Item>
                                      <Item key="EXF-16" isActive={activeItemIds.includes('EXF-16')} onClick={() => handleItemClick('EXF-16')}>
                                      {ClickItemIds === 'EXF-16' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Web Service</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Web Service</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1  }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="C2-1" isActive={activeItemIds.includes('C2-1')} onClick={() => handleItemClick('C2-1')}>
                                      {ClickItemIds === 'C2-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Automated Exfiltration</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Automated Exfiltration</Typography>
                                        )}</Item>
                                      <Item key="C2-2" isActive={activeItemIds.includes('C2-2')} onClick={() => handleItemClick('C2-2')}>
                                      {ClickItemIds === 'C2-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data Transfer Size Limits</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data Transfer Size Limits</Typography>
                                        )}</Item>
                                      <Item key="C2-3" isActive={activeItemIds.includes('C2-3')} onClick={() => handleItemClick('C2-3')}>
                                      {ClickItemIds === 'C2-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exfiltration Over Alternative Protocol</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exfiltration Over Alternative Protocol</Typography>
                                        )}</Item>
                                      <Item key="C2-4" isActive={activeItemIds.includes('C2-4')} onClick={() => handleItemClick('C2-4')}>
                                      {ClickItemIds === 'C2-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exfiltration Over C2 Channel</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exfiltration Over C2 Channel</Typography>
                                        )}</Item>
                                      <Item key="C2-5" isActive={activeItemIds.includes('C2-5')} onClick={() => handleItemClick('C2-5')}>
                                      {ClickItemIds === 'C2-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exfiltration Over Other Network Medium</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exfiltration Over Other Network Medium</Typography>
                                        )}</Item>
                                      <Item key="C2-6" isActive={activeItemIds.includes('C2-6')} onClick={() => handleItemClick('C2-6')}>
                                      {ClickItemIds === 'C2-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exfiltration Over Physical Medium</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exfiltration Over Physical Medium</Typography>
                                        )}</Item>
                                      <Item key="C2-7" isActive={activeItemIds.includes('C2-7')} onClick={() => handleItemClick('C2-7')}>
                                      {ClickItemIds === 'C2-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Exfiltration Over Web Service</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Exfiltration Over Web Service</Typography>
                                        )}</Item>
                                      <Item key="C2-8" isActive={activeItemIds.includes('C2-8')} onClick={() => handleItemClick('C2-8')}>
                                      {ClickItemIds === 'C2-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Scheduled Transfer</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Scheduled Transfer</Typography>
                                        )}</Item>
                                      <Item key="C2-9" isActive={activeItemIds.includes('C2-9')} onClick={() => handleItemClick('C2-9')}>
                                      {ClickItemIds === 'C2-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Transfer Data to Cloud Account</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Transfer Data to Cloud Account</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                  <Box sx={{ width: 110, margin: 1 }}>
                                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                      <Item key="IM-1" isActive={activeItemIds.includes('IM-1')} onClick={() => handleItemClick('IM-1')}>
                                      {ClickItemIds === 'IM-1' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Account Access Removal</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Account Access Removal</Typography>
                                        )}</Item>
                                      <Item key="IM-2" isActive={activeItemIds.includes('IM-2')} onClick={() => handleItemClick('IM-2')}>
                                      {ClickItemIds === 'IM-2' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data Destruction</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data Destruction</Typography>
                                        )}</Item>
                                      <Item key="IM-3" isActive={activeItemIds.includes('IM-3')} onClick={() => handleItemClick('IM-3')}>
                                      {ClickItemIds === 'IM-3' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data Encrypted for Impact</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data Encrypted for Impact</Typography>
                                        )}</Item>
                                      <Item key="IM-4" isActive={activeItemIds.includes('IM-4')} onClick={() => handleItemClick('IM-4')}>
                                      {ClickItemIds === 'IM-4' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Data Manipulation</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Data Manipulation</Typography>
                                        )}</Item>
                                      <Item key="IM-5" isActive={activeItemIds.includes('IM-5')} onClick={() => handleItemClick('IM-5')}>
                                      {ClickItemIds === 'IM-5' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Defacement</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Defacement</Typography>
                                        )}</Item>
                                      <Item key="IM-6" isActive={activeItemIds.includes('IM-6')} onClick={() => handleItemClick('IM-6')}>
                                      {ClickItemIds === 'IM-6' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Disk Wipe</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Disk Wipe</Typography>
                                        )}</Item>
                                      <Item key="IM-7" isActive={activeItemIds.includes('IM-7')} onClick={() => handleItemClick('IM-7')}>
                                      {ClickItemIds === 'IM-7' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Endpoint Denial of Service</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Endpoint Denial of Service</Typography>
                                        )}</Item>
                                      <Item key="IM-8" isActive={activeItemIds.includes('IM-8')} onClick={() => handleItemClick('IM-8')}>
                                      {ClickItemIds === 'IM-8' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Firmware Corruption</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Firmware Corruption</Typography>
                                        )}</Item>
                                      <Item key="IM-9" isActive={activeItemIds.includes('IM-9')} onClick={() => handleItemClick('IM-9')}>
                                      {ClickItemIds === 'IM-9' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Inhibit System Recovery</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Inhibit System Recovery</Typography>
                                        )}</Item>
                                      <Item key="IM-10" isActive={activeItemIds.includes('IM-10')} onClick={() => handleItemClick('IM-10')}>
                                      {ClickItemIds === 'IM-10' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Network Denial of Service</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Network Denial of Service</Typography>
                                        )}</Item>
                                      <Item key="IM-11" isActive={activeItemIds.includes('IM-11')} onClick={() => handleItemClick('IM-11')}>
                                      {ClickItemIds === 'IM-11' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Resource Hijacking</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Resource Hijacking</Typography>
                                        )}</Item>
                                      <Item key="IM-12" isActive={activeItemIds.includes('IM-12')} onClick={() => handleItemClick('IM-12')}>
                                      {ClickItemIds === 'IM-12' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">Service Stop</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">Service Stop</Typography>
                                        )}</Item>
                                      <Item key="IM-13" isActive={activeItemIds.includes('IM-13')} onClick={() => handleItemClick('IM-13')}>
                                      {ClickItemIds === 'IM-13' ? (
                                        <LightTooltip2 title={MitreTip && formatTooltipContent(MitreTip)} placement="right">
                                            <Typography variant="body2">System Shutdown / Reboot</Typography>
                                        </LightTooltip2>
                                        ) : (
                                        <Typography variant="body2">System Shutdow / Reboot</Typography>
                                        )}</Item>
                                    </Stack>
                                  </Box>
                                </div>
                            </div>
                        </div>
		</div>

		);
}
export default Tools;
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SchoolIcon from '@mui/icons-material/School';
import './Matrix.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import TreeItem from '@mui/lab/TreeItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperTexts from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const testdata = [
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


function MyTools(){
    const [category, setCategory] = useState('');
    const [tool, setTool] = useState('');

    const [toollist, setToollist] = useState([]);

	const badge = localStorage.getItem('badge');
   
    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickName");
        localStorage.removeItem("email");
        localStorage.removeItem("badge");
    }

    const handleChange1 = (event) => {
		setCategory(event.target.value);
		ToolList(event.target.value);
	  };
  
	  const HandleChange2 = (event) => {
		const selectedTool = event.target.value;
		setTool(selectedTool);
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
                            <Link href="./Tools" color='#000000'>Tools</Link>
                            <Link href ="./Training" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
                            <Link href ="/MyTools" color='#0042ED'>My page</Link>
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
				<div className='MyTools-Menu' >
					<h4>Personalization</h4>
					<Button variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",
					}}startIcon={<BuildIcon sx={{color: "#0404B4"}}/>}>
						My tool             
					</Button>
					<Button variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",
					}}startIcon={<BookmarkIcon sx={{color: "#FACC2E" }}/>}>
					Favorites          
					</Button>
					<Button href="./Package" variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						bgcolor: "#EDEEFA"
					}}startIcon={<HistoryIcon sx={{color: "#000000" }}/>}>
						Packaging History           
					</Button>
					

					<h4>Settings</h4>
					<Button href="./Account" variant="outlined" size="large" style={{width:"60%"}} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",
					}}startIcon={<AccountCircleIcon />}>
					Account          
					</Button>
					<Button variant="outlined" size="large" style={{width:"60%" }} sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginBottom: "20px",

					}}startIcon={<LockIcon />}>
						<div className='font-align'>Security</div>
					</Button> 
					<Link href='./ToolUpload'>
					<Button variant="outlined" sx={{
						color:"black",
						borderColor:"black",
						":hover": { borderColor: "black" },
						boxShadow: 2,
						marginTop: "50px",

					}}startIcon={<CloudUploadIcon/>}>Upload my Tool</Button>
					</Link>
				</div>
				<div className='MyTools-Menu-sub' style={{ marginTop: '30px' }}>
					<div className='MyTools-right'>
						<Box
						sx={{
							width: "100%",
							height: "100%",
							border: 1, 
							borderColor: "#E2E8F0", 
							boxShadow: 2,
							borderRadius: "2px"
						}}
						>
						<div className='font-Title' style={{ marginTop: '5px' }}>Create Package</div>
						<div className='Upload-tool-line'></div>
						<div className='font-name'>Package name</div>
						<Box sx={{ maxWidth: '96%' }}>
							<TextField fullWidth id="fullWidth" name="title" sx={{ marginLeft: "10px", marginBottom: "20px" }} />
						</Box>
						<div className='font-name'>Purpose</div>
						<Box sx={{ maxWidth: '96%' }}>
							<TextField
							fullWidth
							id="outlined-multiline-static"
							name="definition"
							multiline
							rows={3}
							sx={{ marginLeft: "10px", marginBottom: "20px" }}
							/>
						</Box>
						<div className='Upload-Category-sub'>
						<div className='matrix-box-select'>
							<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-simple-select-label">Category</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={category}
								label="Category"
								onChange={handleChange1}
								MenuProps={MenuProps}
								sx={{ maxHeight: '45px', fontSize: '15px' }}
							>
								{testdata.map((item) => (
								<MenuItem value={item.id}> {item.label}</MenuItem>
								))}
							</Select>
							</FormControl>

							<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-simple-select-label">Tool</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={tool}
								label="Tool"
								onChange={HandleChange2}
								MenuProps={MenuProps}
								sx={{ maxHeight: '45px', fontSize: '15px' }}
							>
								{toollist.map((item) => (
								<MenuItem value={item.toolIdx}> {item.toolName}</MenuItem>
								))}
							</Select>
							</FormControl>
						</div>
						</div>
						<div className='Upload-Category-sub'></div>
						</Box>
					</div>
				</div>
				<div className='MyTools-Menu-sub'  style={{ marginTop: '30px' }}>
				<div className='MyTools-right'>
						<Box
						sx={{
							width: "50%",
							height: "100%",
							border: 1, 
							borderColor: "#E2E8F0", 
							boxShadow: 2,
							borderRadius: "2px"
						}}
						>
						<div className='font-Title' style={{ marginTop: '5px' }}>LIST</div>
						<div className='Upload-tool-line'></div>
						<div className='font-name'>Tool name</div>
						</Box>
						<div className='Upload-Category-sub'>
							<FormControlLabel
								control={<Checkbox />}
								label="download package"
								sx={{
									justifyContent:"flex-start"
								}}
								/>
								</div>
							<div className='Upload-Category-sub'>
							<Button variant="outlined" style={{ 
								color: '#FF5C60', 
								borderColor: '#FF5C60', 
								fontSize: '11px',
								justifyContent:"flex-start", 
								fontWeight: '700',
								marginRight:'10px'
								}}>
								Cancel
							</Button>
							<Button variant="outlined" style={{ 
								color: '#0000FF', 
								borderColor: '#0000FF',
								fontSize: '11px',
								fontWeight : "700"
								}}>
								Packaging
							</Button>

							{/*<FormHelperTexts sx={{color: '#DB0000'}}>{PostError}</FormHelperTexts>
							<FormHelperTexts sx={{color: '#0000FF'}}>{postSuccess}</FormHelperTexts>
							*/}
							</div>
				</div>
				</div>
			</div>
	</div>
    );
}

export default MyTools;


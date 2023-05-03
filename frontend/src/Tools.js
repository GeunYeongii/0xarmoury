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
import { useState, useEffect } from 'react';

function Tools(){

    {/*테스트 용 data */}
    const data = [
        {
          id: '1',
          label: 'Applications',
          children: [
            { id: '2', label: 'Calendar' },
            { id: '3', label: 'Email' },
          ],
        },
        {
          id: '4',
          label: 'Documents',
          children: [
            {
              id: '5',
              label: 'OSS',
            },
            {
              id: '6',
              label: 'MUI',
              children: [{ id: '7', label: 'index.js' }],
            },
          ],
        },
      ];
    {/*
    const [data, setData] = useState([]);

    useEffect(() => {
        // 데이터베이스에서 데이터를 불러와서 state 업데이트
        const fetchData = async () => {
        const response = await fetch('/api/data'); // 데이터를 불러올 API 경로
        const data = await response.json(); // JSON 형식으로 응답을 받아옴
        setData(data);
        };
        fetchData();
    }, []);
 */}
    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={<Typography sx={{ fontSize: 25 }}>{nodes.label}</Typography>}>
        {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree({
                ...node,
                label: (
                  <Typography sx={{ fontSize: 16 }}>
                    {node.label}
                  </Typography>
                ),
              })
            )
            : null}
        </TreeItem>
    );

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
                            <Link href="/tools" color='#0042ED'>Tools</Link>
                            <Link href ="#" color='#000000'>Training</Link>
                            <Link href ="#" color='#000000'>Gallery</Link>
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
            <div className='container-body1'>
                <div className='toolbox-left'>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 240, flexGrow: 1, width: '95%' }}
                    >
                    {data.map((node) => renderTree(node))}
                </TreeView>
                {/*
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 240, flexGrow: 1, width: '95%'}}
                    >
                      <TreeItem nodeId="1" label={<Typography sx={{fontSize: '40px'}}>Applications</Typography>}>
                        <TreeItem nodeId="2" label="Calendar" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="10" label="OSS" />
                        <TreeItem nodeId="6" label="MUI">
                        <TreeItem nodeId="8" label="index.js" />
                        </TreeItem>
                    </TreeItem>
                </TreeView>
                 */}
                </div>
                <div className='toolbox-right'>
                    <p>에휴</p>
                </div>
            </div>
		</div>
		);
}
export default Tools;
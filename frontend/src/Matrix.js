import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import './Matrix.css'
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
import { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));


    {/*테스트 용 data */}
    const testdata = [
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

function Matrix(){

    const [selectedId, setSelectedId] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [str, setStr] = useState(null);
    const [selectedDefinition, setSelectedDefinition] = useState(null);

    const CircularJSON = require('circular-json');


    const handleSelect = (id, label) => {
        setSelectedId(id);
        setSelectedLabel(label);
        const jsonObject = JSON.parse(CircularJSON.stringify({ label }));
        // 'children' 있으면 Str에 children value저장
        if (jsonObject && jsonObject.label && jsonObject.label.props && jsonObject.label.props.children) {
          setStr(jsonObject.label.props.children);
        } else {
            //  'children' 앖으면 Str에 label저장
          setStr(jsonObject.label);
        }

        /* 정상 작동하는지는 모르겠지만 일단 데이터베이스에서 Definiton받아오는 코드//
        useEffect(() => {
            axios.get('/api/data/${id}')
            .then(response => setSelectedDefinition(response.data))
            .catch(error => console.log(error))
        }, []);
        */
    };

    const Logout = () => {
        localStorage.removeItem("accessToken");
    }

    const options = {
        title: {
            text: 'MITRE ATT&CK MATRIX'
          },
        chart: {
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#008FFB'],
        series: [
          {
            name: 'Metric 1',
            data: [
              {x: 'Category 1',y: 7,},
              {x: 'Category 2',y: 30,},
              /* Add more data points here*/],
          },
          {
            name: 'Metric 2',
            data: [
              {x: 'Category 1',y: 30,},
              {x: 'Category 2',y: 30,},
              {x: 'Category 3',y: 7,},
              /* Add more data points here*/],
          },
          {
            name: 'Metric 3',
            data: [
              {x: 'Category 1',y: 7,},
              {x: 'Category 2',y: 7,},
              /* Add more data points here*/],
          },
        ],
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
                            <Link href ="./Matrix" color='#0042ED'>Matric</Link>
                            <Link href="/tools" color='#000000'>Tools</Link>
                            <Link href ="#" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
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
                <div className='matrix-box-left'>
                    
                    <div className='matrix-tools-title'>
                     TOOLS LIST
                    </div>
                    <div className = 'matrix-division-line2'></div>
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ height: '95%', flexGrow: 1, width: '95%'
                    }}
                        >
                        {testdata.map((node) => (
                            <RenderTree nodes={node} onSelect={handleSelect} key={node.id} />
                            ))}
                            
                    </TreeView> 
                    <div className = 'matrix-division-line2'></div>
                </div>
                            
                <div className='matrix-box-right'>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Item>Reconnaissance</Item>
                        <Item>Active Scanning</Item>
                        <Item>Gather Victim Host Information</Item>
                        <Item>Gather Victim Identity Information</Item>
                        <Item>Gather Victim Network Information</Item>
                        <Item>Gather Victim Org Information</Item>
                        <Item>Phishing for Information</Item>
                        <Item>Search Closed Sources</Item>
                        <Item>Search Open Technical Databases</Item>
                        <Item>Search Open Websites/Domains</Item>
                        <Item>Search Victim-Owned Websites</Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Resource Development</Item>
                        <Item>Acquire Access</Item>
                        <Item>Acquire Infrastructure</Item>
                        <Item>Compromise Accounts</Item>
                        <Item>Compromise Infrastructure</Item>
                        <Item>Develop Capabilities</Item>
                        <Item>Establish Accounts</Item>
                        <Item>Obtain Capabilities</Item>
                        <Item>Stage Capabilities</Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Initial Access</Item>
                        <Item>Drive-by Compromise</Item>
                        <Item>Exploit Public-Facing Application</Item>
                        <Item>External Remote Services</Item>
                        <Item>Hardware Additions</Item>
                        <Item>Phishing</Item>
                        <Item>Replication Through Removable Media</Item>
                        <Item>Supply Chain Compromise</Item>
                        <Item>Trusted Relationship</Item>
                        <Item>Valid Accounts</Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Execution</Item>
                        <Item>Cloud Administration Command</Item>
                        <Item>Command and Scripting Interpreter</Item>
                        <Item>Container Administration Command</Item>
                        <Item>Deploy Container</Item>
                        <Item>Exploitation for Client Execution</Item>
                        <Item>Inter-Process Communication</Item>
                        <Item>Native API</Item>
                        <Item>Scheduled Task/Job</Item>
                        <Item>Serverless Execution</Item>
                        <Item>Shared Modules</Item>
                        <Item>Software Deployment Tools</Item>
                        <Item>System Services</Item>
                        <Item>User Execution</Item>
                        <Item>Windows Management Instrumentation</Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Persistence</Item>
                        <Item>Account Manipulation</Item>
                        <Item>BITS Jobs</Item>
                        <Item>Boot or Logon Autostart Execution</Item>
                        <Item>Boot or Logon Initialization Scripts</Item>
                        <Item>Browser Extensions</Item>
                        <Item>Compromise Client Software Binary</Item>
                        <Item>Create Account</Item>
                        <Item>Create or Modify System Process</Item>
                        <Item>Event Triggered Execution</Item>
                        <Item>External Remote Services</Item>
                        <Item>Hijack Execution Flow</Item>
                        <Item>Implant Internal Image</Item>
                        <Item>Modify Authentication Process</Item>
                        <Item>Office Application Startup</Item>
                        <Item>Pre-OS Boot</Item>
                        <Item>Scheduled Task/Job</Item>
                        <Item>Server Software Component</Item>
                        <Item>Traffic Signaling</Item>
                        <Item>Valid Accounts</Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Privilege Escalation</Item>
                        <Item>Abuse Elevation Control Mechanism</Item>
                        <Item>Access Token Manipulation</Item>
                        <Item>Boot or Logon Autostart Execution</Item>
                        <Item>Boot or Logon Initialization Scripts</Item>
                        <Item>Create or Modify System Process</Item>
                        <Item>Domain Policy Modification</Item>
                        <Item>Escape to Host</Item>
                        <Item>Event Triggered Execution</Item>
                        <Item>Exploitation for Privilege Escalation</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Defense Evasion</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Credential Access</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Discovery</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Lateral Movement</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Collection</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Command and Control</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Exfiltration</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 110 }}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                      <Item>Impact</Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                      </Stack>
                    </Box>
                      {/* 
                        <ApexChart
                            options={options} 
                            series={options.series} 
                            type="heatmap" 
                            height={350}
                        />*/}
                </div>
            </div>
		</div>
		);
}
export default Matrix;
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
import { useState, useEffect, React } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  border: '1px solid #A6A6A6',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'balck',
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

    const [category, setCategory] = useState('');
    const [tool, setTool] = useState('');

    const handleChange1 = (event) => {
      setCategory(event.target.value);
    };

    const handleChange2 = (event) => {
      setTool(event.target.value);
    };

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
                  sx={{ maxHeight: '45px', fontSize: '15px'}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-label">Tool</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tool}
                  label="Tool"
                  onChange={handleChange2}
                  MenuProps={MenuProps}
                  sx={{ maxHeight: '45px', fontSize: '15px' }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='container-body1'>
                            
                <div className='matrix-box'>
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
                    <div className='matrix-box-content'>
                      <Box sx={{ width: 110, margin: 1 }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Active Scanning</Item>
                          <Item>Gather Victim Host Information</Item>
                          <Item>Gather Victim Identity Information</Item>
                          <Item>Gather Victim Network Information</Item>
                          <Item>Gather Victim Org Information</Item>
                          <Item>Phishing for Information</Item>
                          <Item>Search Closed Sources</Item>
                          <Item>Search Open Technical Databases</Item>
                          <Item>Search Open Websites/ Domains</Item>
                          <Item>Search Victim-Owned Websites</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
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
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
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
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
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
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
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
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Abuse Elevation Control Mechanism</Item>
                          <Item>Access Token Manipulation</Item>
                          <Item>Boot or Logon Autostart Execution</Item>
                          <Item>Boot or Logon Initialization Scripts</Item>
                          <Item>Create or Modify System Process</Item>
                          <Item>Domain Policy Modification</Item>
                          <Item>Escape to Host</Item>
                          <Item>Event Triggered Execution</Item>
                          <Item>Exploitation for Privilege Escalation</Item>
                          <Item>Hijack Execution Flow</Item>
                          <Item>Process Injection</Item>
                          <Item>Scheduled Task/Job</Item>
                          <Item>Valid Accounts</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Abuse Elevation Control Mechanism</Item>
                          <Item>Access Token Manipulation</Item>
                          <Item>BITS Jobs</Item>
                          <Item>Build Image on Host</Item>
                          <Item>Debugger Evasion</Item>
                          <Item>Deobfuscate/ Decode Files or Information</Item>
                          <Item>Deploy Container</Item>
                          <Item>Direct Volume Access</Item>
                          <Item>Domain Policy Modification</Item>
                          <Item>Execution Guardrails</Item>
                          <Item>Exploitation for Defense Evasion</Item>
                          <Item>File and Directory Permissions Modification</Item>
                          <Item>Hide Artifacts</Item>
                          <Item>Hijack Execution Flow</Item>
                          <Item>Impair Defenses</Item>
                          <Item>Indicator Removal</Item>
                          <Item>Indirect Command Execution</Item>
                          <Item>Masquerading</Item>
                          <Item>Modify Authentication Process</Item>
                          <Item>Modify Cloud Compute Infrastructure</Item>
                          <Item>Modify Registry</Item>
                          <Item>Modify System Image</Item>
                          <Item>Network Boundary Bridging</Item>
                          <Item>Obfuscated Files or Information</Item>
                          <Item>Plist File Modification</Item>
                          <Item>Pre-OS Boot</Item>
                          <Item>Process Injection</Item>
                          <Item>Reflective Code Loading</Item>
                          <Item>Rogue Domain Controller</Item>
                          <Item>Rootkit</Item>
                          <Item>Subvert Trust Controls</Item>
                          <Item>System Binary Proxy Execution</Item>
                          <Item>System Script Proxy Execution</Item>
                          <Item>Template Injection</Item>
                          <Item>Traffic Signaling</Item>
                          <Item>Trusted Developer Utilities Proxy Execution</Item>
                          <Item>Unused/ Unsupported Cloud Regions</Item>
                          <Item>Use Alternate Authentication Material</Item>
                          <Item>Valid Accounts</Item>
                          <Item>Virtualization/ Sandbox Evasion</Item>
                          <Item>Weaken Encryption</Item>
                          <Item>XSL Script Processing</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Adversary-in-the-Middle</Item>
                          <Item>Brute Force</Item>
                          <Item>Credentials from Password Stores</Item>
                          <Item>Exploitation for Credential Access</Item>
                          <Item>Forced Authentication</Item>
                          <Item>Forge Web Credentials</Item>
                          <Item>Input Capture</Item>
                          <Item>Modify Authentication Process</Item>
                          <Item>Multi-Factor Authentication Interception</Item>
                          <Item>Multi-Factor Authentication Request Generation</Item>
                          <Item>Network Sniffing</Item>
                          <Item>OS Credential Dumping</Item>
                          <Item>Steal Application Access Token</Item>
                          <Item>Steal Web Session Cookie</Item>
                          <Item>Steal or Forge Authentication Certificates</Item>
                          <Item>Steal or Forge Kerberos Tickets</Item>
                          <Item>Unsecured Credentials</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Account Discovery</Item>
                          <Item>Application Window Discovery</Item>
                          <Item>Browser Information Discovery</Item>
                          <Item>Cloud Infrastructure Discovery</Item>
                          <Item>Cloud Service Dashboard</Item>
                          <Item>Cloud Service Discovery</Item>
                          <Item>Cloud Storage Object Discovery</Item>
                          <Item>Container and Resource Discovery</Item>
                          <Item>Debugger Evasion</Item>
                          <Item>Device Driver Discovery</Item>
                          <Item>Domain Trust Discovery</Item>
                          <Item>File and Directory Discovery</Item>
                          <Item>Group Policy Discovery</Item>
                          <Item>Network Service Discovery</Item>
                          <Item>Network Share Discovery</Item>
                          <Item>Network Sniffing</Item>
                          <Item>Password Policy Discovery</Item>
                          <Item>Peripheral Device Discovery</Item>
                          <Item>Permission Groups Discovery</Item>
                          <Item>Process Discovery</Item>
                          <Item>Query Registry</Item>
                          <Item>Remote System Discovery</Item>
                          <Item>Software Discovery</Item>
                          <Item>System Information Discovery</Item>
                          <Item>System Location Discovery</Item>
                          <Item>System Network Configuration Discovery</Item>
                          <Item>System Network Connections Discovery</Item>
                          <Item>System Owner/ User Discovery</Item>
                          <Item>System Service Discovery</Item>
                          <Item>System Time Discovery</Item>
                          <Item>Virtualization/ Sandbox Evasion</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Exploitation of Remote Services</Item>
                          <Item>Internal Spearphishing</Item>
                          <Item>Lateral Tool Transfer</Item>
                          <Item>Remote Service Session Hijacking</Item>
                          <Item>Remote Services</Item>
                          <Item>Replication Through Removable Media</Item>
                          <Item>Software Deployment Tools</Item>
                          <Item>Taint Shared Content</Item>
                          <Item>Use Alternate Authentication Material</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Adversary-in-the-Middle</Item>
                          <Item>Archive Collected Data</Item>
                          <Item>Audio Capture</Item>
                          <Item>Automated Collection</Item>
                          <Item>Browser Session Hijacking</Item>
                          <Item>Clipboard Data</Item>
                          <Item>Data Staged</Item>
                          <Item>Data from Cloud Storage</Item>
                          <Item>Data from Configuration Repository</Item>
                          <Item>Data from Information Repositories</Item>
                          <Item>Data from Local System</Item>
                          <Item>Data from Network Shared Drive</Item>
                          <Item>Data from Removable Media</Item>
                          <Item>Email Collection</Item>
                          <Item>Input Capture</Item>
                          <Item>Screen Capture</Item>
                          <Item>Video Capture</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Application Layer Protocol</Item>
                          <Item>Communication Through Removable Media</Item>
                          <Item>Data Encoding</Item>
                          <Item>Data Obfuscation</Item>
                          <Item>Dynamic Resolution</Item>
                          <Item>Encrypted Channel</Item>
                          <Item>Fallback Channels</Item>
                          <Item>Ingress Tool Transfer</Item>
                          <Item>Multi-Stage Channels</Item>
                          <Item>Non-Application Layer Protocol</Item>
                          <Item>Non-Standard Port</Item>
                          <Item>Protocol Tunneling</Item>
                          <Item>Proxy</Item>
                          <Item>Remote Access Software</Item>
                          <Item>Traffic Signaling</Item>
                          <Item>Web Service</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1  }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Automated Exfiltration</Item>
                          <Item>Data Transfer Size Limits</Item>
                          <Item>Exfiltration Over Alternative Protocol</Item>
                          <Item>Exfiltration Over C2 Channel</Item>
                          <Item>Exfiltration Over Other Network Medium</Item>
                          <Item>Exfiltration Over Physical Medium</Item>
                          <Item>Exfiltration Over Web Service</Item>
                          <Item>Scheduled Transfer</Item>
                          <Item>Transfer Data to Cloud Account</Item>
                        </Stack>
                      </Box>
                      <Box sx={{ width: 110, margin: 1 }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                          <Item>Account Access Removal</Item>
                          <Item>Data Destruction</Item>
                          <Item>Data Encrypted for Impact</Item>
                          <Item>Data Manipulation</Item>
                          <Item>Defacement</Item>
                          <Item>Disk Wipe</Item>
                          <Item>Endpoint Denial of Service</Item>
                          <Item>Firmware Corruption</Item>
                          <Item>Inhibit System Recovery</Item>
                          <Item>Network Denial of Service</Item>
                          <Item>Resource Hijacking</Item>
                          <Item>Service Stop</Item>
                          <Item>System Shutdown/ Reboot</Item>
                        </Stack>
                      </Box>
                    </div>
                </div>
            </div>
		</div>
		);
}
export default Matrix;
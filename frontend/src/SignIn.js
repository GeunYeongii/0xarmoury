import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormHelperTexts from '@mui/material/FormHelperText'
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function SignIn() {
  const [loginError, setLoginError] = useState('');
  const Navigate = useNavigate();
  const onhandlePost = async (data) => {
    const { email, password } = data;
    const postData = { email, password };

    // post
    await axios
      .post('/users/login', postData)  //db 주소? api?
      .then(function (response) {
        if (response.data.isSuccess){
          console.log(response, '성공');
          localStorage.setItem("accessToken", response.data.result.jwt);
          localStorage.setItem("userId", response.data.result.userIdx);
          localStorage.setItem("nickName", response.data.result.nickName);
          localStorage.setItem("email", postData.email);
          localStorage.setItem("badge", response.data.badge);
          Navigate('/');
        }
        else{
          console.log('error');
          setLoginError('로그인에 실패하였습니다. 다시한번 확인해 주세요.');
        }
      })
      {/* 
      .catch(function (err) {
        console.log(err);
        setLoginError('로그인에 실패하였습니다. 다시한번 확인해 주세요.');
      });
      */}
  };

  //'SIGN IN'버튼 클릭하면 동작
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 이벤트 동작 취소

    const data = new FormData(event.currentTarget);
    const joinData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    onhandlePost(joinData);
  }
  
  return (
    <ThemeProvider theme={theme}>
      {/* 홈버튼 */}
      <Link href="/">
        <Button startIcon={<img src="/img/armoury_logo.png" alt="Armoury" width={60} height={60}/>} sx={{
          margin: 1,
          fontSize:30,
          color:'black',}}
        >
        <strong>0xARMOURY</strong>
        </Button>
      </Link>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white', width:64, height:64}}>
            <LockOutlinedIcon sx={{fontSize: "60px", color: 'black'}} />
          </Avatar>
          <Typography component="h1" fontSize='30px'>
            <strong>Sign In</strong>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1, bgcolor: '#363636' }}
            >
              Sign In
            </Button>
            <FormHelperTexts sx={{color: '#DB0000'}}>{loginError}</FormHelperTexts>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item  sx={{mt:1}}>
                <Link href="./SignUp" variant="body2" color='#0000A5'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
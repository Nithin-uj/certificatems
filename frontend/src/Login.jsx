import React,{useState} from 'react';
import Header from './Header'
import Footer from './Footer'
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


const EmailPasswordForm = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // Ensure axios is set to send cookies with requests

  const [salert, setsalert] = useState(null);

  const [values,setValues] = useState({
    email : "",
    password : ""
  })
  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  //   console.log(event.target.name)
  // };

  // const handlePasswordChange = (event) => {
  //   console.log(event.target.name)
  //   setPassword(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Email:', values.email);
    // console.log('Password:', values.password);
    // Add your form submission logic here (e.g., authentication, validation)

    axios.post("http://localhost:8090/login",values)
    .then(res => {
      if(res.data.Message === "Success"){
        alert(res.data.Message);
        navigate("/admin")
      }
      else{
        setsalert(res.data.Message);
        setTimeout(()=>{
          setsalert(null)
        },3000)
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header/>
    <Box
      component="form"
      sx={{
        width: '300px',
        margin: 'auto',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)',
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" align="center">
        Admin Log in
      </Typography>
      {salert ? <Alert severity="error">{salert}</Alert> : <></>}
      <TextField
        label="Email"
        type='email'
        variant="outlined"
        fullWidth
        margin="normal"
        value={values.email}
        name='email'
        onChange={e=>setValues({...values,email:e.target.value})}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        name='password'
        type="password"
        value={values.password}
        onChange={e=>setValues({...values,password:e.target.value})}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
    <Footer/>
    </div>
  );
};

export default EmailPasswordForm;


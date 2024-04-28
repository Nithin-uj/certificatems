import React,{useState} from 'react';
import Header from './Header'
import Footer from './Footer'
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const EmailPasswordForm = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [salert, setsalert] = useState(false);

  const [values,setValues] = useState({
    name : "",
    email : "",
    password : "",
    cpassword : "",
  })
  const [isvalid,setIsvalid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8090/register",values)
    .then(res => {
      console.log(res)
      // console.log("then")
      // console.log(res.data.err.sqlMessage)
      // console.log(res.data.err.code)
      if(res.data.Status==="Success"){
        setsalert(true);
        setValues({
          name : "",
          email : "",
          password : "",
          cpassword : "",
        });
        setTimeout(()=>{
          setsalert(false);
        },2000)
      }
    })
    .catch(error => {
      // console.log("catch")
      console.log(error)
    })
  };

  const handelcpassword = (e) => {
    setValues({...values,cpassword:e.target.value});
    if(values.password === e.target.value){
      setIsvalid(true);}
        else{
          setIsvalid(false);
        }
  }

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
        Register
      </Typography>
      {salert ? <Alert severity="success">Registration Successful</Alert> : <></>}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={values.name}
        name='name'
        onChange={e=>setValues({...values,name:e.target.value})}
      />
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        fullWidth
        margin="normal"
        name='cpassword'
        type="password"
        required
        value={values.cpassword}
        onChange={handelcpassword}
      />
      {/* <Alert severity="error">This is an error Alert.</Alert> */}
      {isvalid ? <></> : <p className='text-danger'>Password Not Matching</p>}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isvalid}>
        Login
      </Button>
    </Box>
    <Footer/>
    </div>
  );
};

export default EmailPasswordForm;


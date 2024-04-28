import React, { useState } from "react";
import Aheader from "./Aheader";
import Footer from "./Footer";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Main from './Main'
import bgimage from './blue.png'
import signn from './signature.png'
import logo from './logo.png'

function generateCertificateNumber() {
  const timestamp = Math.round(new Date().getTime()/10000 );
  const randomComponent = Math.floor(1000 + Math.random() * 9000);
  const certificateNumber = `${timestamp}-${randomComponent}`;
  return certificateNumber;
}

function Admin() {
  const [option, setOption] = useState(2);

  const Form = () => {
    const [values,setValues] = useState({
      cno : generateCertificateNumber(),
      header : "CERTIFICATE",
      subheader : "Sub header",
      intro : "Intro",
      name : "Mr. / Mrs. Name",
      desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque magnam ut maiores minus velit ea cupiditate incidunt ducimus ",
      img1 : null,
    })
    // console.table(values)
    // <img src=${values.preview} alt=${values.preview}/>

    const preview = `
    <div style="background-image:url(${bgimage});background-size: cover;height:100%;">
    <div style="display:flex;justify-content:flex-end;padding-right:60px;padding-top:40px;">Certificate number : ${values.cno}</div>
    <h1 style="font-size:48px; display:flex;justify-content:center;align-items:center;margin-top:100px;margin-bottom:0;font-family: 'Garamond', serif;"> ${values.header}</h1>
    <h4 style="display:flex;justify-content:center;align-items:center;color:#1da7a9;font-family: 'Garamond', serif;"> ${values.subheader}</h4>
    <div style="display:flex;justify-content:center;align-items:center;margin:10px;font-size:20px"> ${values.intro}</div>
    <h2 style="display:flex;justify-content:center;align-items:center;margin-top:30px;"><div style="border-bottom: 2px solid #1da7a9;width:max-content;display:flex;justify-content:center">${values.name}</div></h2>
    <div style="display:flex;justify-content:center;align-items:center;"><div style="width:60%;white-space:normal;text-align:center">${values.desc}</div></div>
    <div style="display:flex;justify-content:center;align-items:center;margin-top:80px">
    <div style="margin-right:150px">
    <div style="display:flex;justify-content:center;align-items:center;"><img style="width:120px" src='${signn}'/></div>
    <h5 style="display:flex;justify-content:center;align-items:center;margin:0">NAME</h5>
    <div style="display:flex;justify-content:center;align-items:center;">Designation</div>
    </div>
    <img style="display:flex;justify-content:center;width:150px;max-height:200px;" src=${values.preview} alt=${values.preview} onerror="this.src='${logo}'; this.alt='logo'"/>
    <div style="margin-left:150px">
    <div style="display:flex;justify-content:center;align-items:center;"><img style="width:120px" src='${signn}'/></div>
    <h5 style="display:flex;justify-content:center;align-items:center;margin:0">NAME</h5>
    <div style="display:flex;justify-content:center;align-items:center;">Designation</div>
    </div>
    </div>
    <div style="position: absolute;bottom:35px;left:40px">Verify: <a href="http://localhost:3000/verify/${values.cno}">http://localhost:3000/verify/${values.cno}</a></div>
    </div>
  `;

    const mystyle = {
      width: 1123, // Width in pixelsmargin
      height: 794, // Landscape height at 96 DPI
      backgroundColor: 'white', // Correct key for background color
      border: '1px solid lightgrey', // Border with specified color
      borderRadius : '4px',
      overflowX:'scroll',
      transform: 'scale(0.85)',
      transformOrigin: 'top left',
    };

    const handleFileChange = (e)=>{
      setValues({...values,img1:e.target.files[0]})

      const reader = new FileReader();
      reader.onload = (e) => {
        setValues({...values,preview:e.target.result});
        console.table(values)
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  
    return <div>
    <div className="container-fluid">
      <div className="row" >
         <div className="col-3"> 
        <h2 className="m-2 d-flex justify-content-center">Enter the details</h2>
      <div className="m-2 d-flex justify-content-center align-items-center">
        <form>
        <TextField
          label="Certificate no."
          className="my-2"
          value={values.cno}
          onChange={e=>setValues({...values,cno:e.target.value})}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Header"
          className="my-2"
          value={values.header}
          onChange={e=>setValues({...values,header:e.target.value})}
        />
        <TextField
          label="Sub Header"
          className="my-2"
          value={values.subheader}
          onChange={e=>setValues({...values,subheader:e.target.value})}
        />
        <TextField
          label="Intro"
          className="my-2"
          value={values.intro}
          onChange={e=>setValues({...values,intro:e.target.value})}
        />
        <TextField
          label="Intro"
          className="my-2"
          value={values.name}
          onChange={e=>setValues({...values,name:e.target.value})}
        />
        <TextField
          label="Discription"
          className="my-2"
          value={values.desc}
          multiline
          onChange={e=>setValues({...values,desc:e.target.value})}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        </form>
      </div>
        </div>
        <div className="col-9" style={{overflow:'scroll'}}>
          <h3>Preview</h3>
        <div style={mystyle} dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
      </div>
    </div>
    </div>
  }

  const Render = () => {
    switch (option) {
      case 0:
        return <>default</>;
      case 1:
        return <Form/>;
      case 2:
        return <><Main/></>;
      case 3:
        return <></>;
      case 4:
        return <></>;
      case 5:
        return <></>;
      default:
        return <>default</>;
    }
  };

  return (
    <div>
      <Aheader />
      <Box sx={{ display: "flex", m: 1 }}>
        <ButtonGroup>
          <Button key="home" onClick={() => setOption(0)}>
            Home
          </Button>
          <Button key="create" onClick={() => setOption(1)}>
            Generate Certificate
          </Button>
          <Button key="temp" onClick={() => setOption(2)}>
            Create Template
          </Button>
          <Button key="view" onClick={() => setOption(3)}>
            View Certificate
          </Button>
          <Button key="issue" onClick={() => setOption(4)}>
            Issue Certificate
          </Button>
          <Button key="edit" onClick={() => setOption(5)}>
            Edit Certificate
          </Button>
        </ButtonGroup>
      </Box>
      {/* {option} */}
      <Render />
      <Footer />
    </div>
  );
}

export default Admin;

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Certi from './certi.jpg'
// import {Link} from 'react-router-dom'


function Home() {
  return (
    <div>
        <Header/>
        <div>
            <h2 className="m-5">
                Manage and Verify your Certificates Here
            </h2>
        {/* <Link className="nav-link" to="/admin">Log in</Link> */}
            <div className="m-5 mb-0">
                We provide platform for Storing and verifying of certificates
            </div>
            <div className="m-5 mt-0">
                This is a demo website for Handson
            </div>
            <div className='d-flex justify-content-center'>
            <figure class="figure">
            <img src={Certi} class="figure-img img-fluid rounded" width="500px" alt="..."/>
            <figcaption class="figure-caption">Demo Certificate</figcaption>
            </figure>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
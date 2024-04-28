import React from 'react'
import {Link} from 'react-router-dom'

function Header() {

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Certificates Managment System</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link" to="/verify">Search</Link>
        </li>
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Enter Certificate No." aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link" to="/login">Log in</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header
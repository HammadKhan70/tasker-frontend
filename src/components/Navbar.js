import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from "react-router-dom";

function navBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname.match("emailActivate");

  function logout() {
    localStorage.clear()
    navigate('/login')
  }

  if (pathname == 'emailActivate') {
    return null
  } else {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="tasker-text">T a s k e r</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">


            <Nav className="ms-auto">
              {!localStorage.getItem('token') ?
                <>
                  <Nav.Link className="text-dark active" href="/login">Login</Nav.Link>
                  <Nav.Link className="text-dark" href="/signup">Sign Up</Nav.Link>
                </>
                :
                <>
                  <Nav.Link className="text-dark" href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link className="text-dark" href="/createTask">Tasks</Nav.Link>
                  <Nav.Link className="text-dark" onClick={logout}>Logout</Nav.Link>
                </>
              }
            </Nav>


          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default navBar
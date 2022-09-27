import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../signup.css';
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')

  async function registerUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:3005/api/registerUser',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         name,
         email,
         password
      })
    })

    const data = await response.json()
     if(data.message === 4){
       navigate('/login')
    }
     if(data.message === 1){
      setWarning('Email is Already Registered')
    }
     if(data.message === 2){
      setWarning('Phone is Already Registered')
    }
  }

  return (

    <Container className='container'>
      <Row className="p-5 m-auto">
        <Col lg={5} md={6} sm={12} className="square p-5 mt-5 m-auto shadow-sm bg-light rounded-5">

      <h1 className="text-secondary p-1 text-center rounded ">Sign Up</h1>

      <Form onSubmit={registerUser} >
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="secondary btn-block" className="mb-3" type="submit">
          Sign up
        </Button>

        <Form.Group className="mb-3">
          <Form.Text className="text-danger">
            {warning}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
        <Link className='text-secondary' to="/login">Login</Link>
        </Form.Group>
                
      </Form>

      </Col>
      </Row>
      </Container>
  )
}

export default Signup
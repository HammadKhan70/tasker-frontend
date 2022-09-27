import React from 'react'
import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../signup.css';
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')

  async function login(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3005/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    var data = await response.json()

    if (data.message === 8) {
      localStorage.setItem('token', data.user.token)
      window.location.href = '/dashboard'
    } if (data.message === 7) {
      setWarning('Please Check Your Credientials')
    } if (data.message === 6) {
      setWarning('Please Activate Your Account')
    }
  }
  return (

    <Container className='container' >
      <Row className="p-5 m-auto">
        <Col lg={5} md={6} sm={12} className="square p-5 my-5 m-auto shadow-sm bg-light rounded-5">

          <h1 className="text-secondary p-1 text-center rounded ">Login</h1>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="secondary btn-block" className="mb-3" type="submit">
              Login
            </Button>

            <Form.Group className="mb-3">
              <Form.Text className="text-danger">
                {warning}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Link className='text-secondary' to="/signup">Signup</Link>
            </Form.Group>

          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default Login
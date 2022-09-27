import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';


function emailActivate() {
  const { hashToken } = useParams();
  
  const [emailData, setEmailData] = useState('')

  async function activeEmail(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3005/api/confirmEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hashToken: hashToken
      })
    })
    const data = await response.json()

    if (data.message === 16) {
      setEmailData('Activated Successfully')
    } else {
      alert('NotSuccessfully')
    }
  }

  return (
    // <div>emailActivate</div>
    <Container className='container' >
      <Row className="p-5 m-auto">
        <Col lg={5} md={6} sm={12} className="square p-5 my-5 m-auto shadow-sm bg-light rounded-5">

          <h5 className="text-success p-1 text-center rounded ">Email Activation</h5>
          <Form onSubmit={activeEmail}>
            {!emailData ?
              <>
                <Form.Group className="mb-3 mt-3">
                  <Form.Text className="text-secondary mt-3 p-5 text-center">
                    Please Active Your Email Addresss. Thank You !
                  </Form.Text>
                </Form.Group>

                <Form.Group className="d-flex mt-3 justify-content-center">
                  <Button variant="success btn-block " className="mb-3 mt-3" type="submit">
                    Activate
                  </Button>
                </Form.Group>
              </>
              :
              <>
                <Form.Group className="d-flex mt-3 justify-content-center">
                  <Form.Text className="text-secondary mt-3 text-center">
                    Thank You For Activation!
                  </Form.Text>
                </Form.Group>
              </>
            }

          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default emailActivate
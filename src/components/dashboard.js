import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Buffer } from 'buffer/'  
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'

function dashboard() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState('')
  
  async function populateProfile(){
    let token = localStorage.getItem('token')
    const userId = jwt_decode(token)
    const user = userId.user
    var auth = "Basic " + new Buffer(user + ":" + token).toString("base64");
    
    const response = await fetch('http://localhost:3005/api/getUser',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
    })

    const data = await response.json()
     if(data.message == 9){
      setUserData(data.result)
     }else{
      alert(data.message)
     }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
     const id = jwt_decode(token)
     if(!id.user){
       localStorage.removeItem('token')
       navigate('/login')
     }else {
       populateProfile()
     }
    }if(!token){
      navigate('/login')
    }
 },[])


  return (
    // <div>
    //   <h1> your name is {userData.name || 'no name'}</h1>
    // </div>
    <Container className='container' >
      <Row className="p-3 m-auto ">
        <Col lg={4} md={5} sm={10} className="square p-3 my-5 m-auto shadow-sm bg-light rounded-5 ">
      
       <Image src={userData.image } roundedCircle style={{ height: '10rem', width: '10rem'}} className='d-block mx-auto img-fluid'></Image>
        
        {/* <p className="text-dark rounded mt-4" style={{ marginLeft: '20px'}} >Name:  {userData.name}</p>
        <p className="text-dark rounded mt-4" style={{ marginLeft: '20px'}} >Email:  {userData.email}</p> */}
        {/* <h6 className="text-dark rounded">{userData.email}</h6> */}
        <Table  className="mt-3 m-auto" >
        <tbody>
          <tr>
            <td>Name</td>
            <td>{userData.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{userData.email}</td>
          </tr>
          
        </tbody>
        </Table>
       
      </Col>
      </Row>
      </Container>

    
  )
}

export default dashboard;
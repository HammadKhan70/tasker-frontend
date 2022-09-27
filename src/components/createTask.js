import React, { useState, useEffect } from 'react'
import '../App.css'
import jwt_decode from "jwt-decode"
import { Buffer } from 'buffer/'  
import { Container, InputGroup, Col, Button, Form , Table} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate()
  const [taskName, setTaskName] = useState('')
  const [message, setMessage] = useState('')
  const [taskData, setTaskData] = useState([])
  
  // ADD TASK
  async function addTask(event){
    event.preventDefault()

    let token = localStorage.getItem('token')
    const userId = jwt_decode(token)
    const user = userId.user
    var auth = "Basic " + new Buffer(user + ":" + token).toString("base64");
    
    const response = await fetch('http://localhost:3005/api/addTask',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({
        taskName
      })
    })
    
    const data = await response.json()
     if(data.message == 10){
      setTaskName(data.result)
      //setMessage('Added Successfully')
      getTask()

     }else{
      alert(data.message)
     }
     event.target.reset()
  }

  // GET TASK
  async function getTask(){
    let token = localStorage.getItem('token')
    const userId = jwt_decode(token)
    const user = userId.user
    var auth = "Basic " + new Buffer(user + ":" + token).toString("base64");
    
    const response = await fetch('http://localhost:3005/api/getTasks',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
    })

    const getData = await response.json()
     if(getData.message == 13){
      setTaskData(getData.result)
     }else{
      alert(getData.message)
     }
  }

  // DELETE TASK
  async function deleteTask(id){
    let token = localStorage.getItem('token')
    const userId = jwt_decode(token)
    const user = userId.user
    var auth = "Basic " + new Buffer(user + ":" + token).toString("base64");
    
    const response = await fetch('http://localhost:3005/api/deleteTask',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({
        id
      })
    })

    const deleteData = await response.json()
     if(deleteData.message == 12){
      // setTaskData(getData.result)
      getTask()
     }else{
      alert(getData.message)
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
      getTask()
     }
    }if(!token){
      navigate('/login')
    }
 },[])

  
  return (
    <Container>
      <Col sm={5} className="p-5 m-auto">

      <Form onSubmit={addTask} >
      <InputGroup className="mb-3">
        <Form.Control style={{ fontSize: '15px', padding: '2x 5px' }} className= 'bg-light' placeholder="Enter Task" onChange={(e) => setTaskName(e.target.value)} />
        <Button variant="outline-secondary" id="button-addon2" className='bg-secondary text-white' type="submit">
          Add
        </Button>
      </InputGroup>

      <Form.Group className="mb-3">
        <Form.Text className="text-success">
          {message}
        </Form.Text>
      </Form.Group>
      </Form>

      <div>
      {taskData.map((data) => {
          return (
        // <Container className=' container bg-dark rounded shadow-sm border border-info mt-2'>
             
        //       {/* <Form.Group className="mb-2 bg-light" style={{ height: '22px'}}> */}
        //         <Form.Text className="text-secondary p-2">
        //            {data.taskName}
        //        </Form.Text>
        //       {/* </Form.Group> */}
        //       <div className='text-right'>
        //       <Button >
        //         X
        //       </Button>
        //       </div>
        // </Container>
         <div className='square border rounded mt-2 d-flex flex-row bg-light'>
             <div className='text-dark mt-2' style={{ marginLeft: '12px' }}>{data.taskName}</div>
            <div style={{ marginLeft: 'auto' }}>
              <Button className='bg-secondary border-light' onClick={() => deleteTask(data._id)}>X</Button>
            </div>
         </div>
          )
        })}
      </div>

      </Col>
    </Container>
  )
}

export default CreateTask

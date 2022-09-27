import React, { useEffect, useState } from 'react'
import axios from 'axios'


const GetTask = () => {
  const [APIData, setAPIData] = useState([]);

  const getAllTask = () => {
    axios.get(`http://localhost:3005/api/getTasks`)
    .then((response) => {
       setAPIData(response.data.result)
    })
  }

  useEffect(() => {
    getAllTask()
  },[])

  return (
    <div >
        {APIData.map((data) => {
          return (
          <div>
             <h5 className='list'>{data.taskName}</h5>
             {/* <button>DeleteTask</button> */}
          </div>
          )
        })}
    </div>
    
  )
}

export default GetTask
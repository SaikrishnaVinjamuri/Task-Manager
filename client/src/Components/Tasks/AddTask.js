import React, { useState } from 'react'
import  { useNavigate  } from 'react-router-dom'
import { createTask } from '../../controller/taskController'
import "./AddTask.css"
// import DateTimePicker from 'react-datetime-picker'

function AddTask() {
  const [ title, setTitle ] = useState('')
  const [ time, setTimein] = useState('')
  const [ priority, setPriority ] = useState(0)
  const [ date , setDate ] = useState(new Date())
  const [ description, setDescription ] = useState('')
  const navigate = useNavigate()
  const [milliseconds ,setMilliseconds]= useState(0)

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleDescriptionChange(e) {
      setDescription(e.target.value)
  }

  function handlePriorityChange(e) {
        setPriority(Number(e.target.value))
  }

  function handleDateChange(e) {
    setDate(e.target.value  )
    setMilliseconds(new Date(e.target.value).getTime())
  }

  function handleTimeChange(e) {
    console.log(e.target.value)
    setTimein(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
        title: title,
        description: description,
        priority: priority,
        time : time ,
        milliseconds : milliseconds,
        date : date
    }
    createTask(data)
    .then((res) => {
        console.log(res.data)
    })

    navigate("/")
  }

  return (
    <div className='container col-md-6'>
      <div className='mt-5 '>
        <h1 className='d-flex justify-content-center lead display-4'>Add Task</h1>
        <div className='d-flex justify-content-center'>
          <form onSubmit={handleSubmit}>
            <div className='mt-3'>
              <label htmlFor='title' className='form-label'>Title</label>
              <input type='text' name='title' id='title' className='form-control' value={title} onChange={handleTitleChange}/>
            </div>

            <div className='mt-3'>
              <label htmlFor='Description' className='form-label'>Description</label>
              <input type='text' name='description' id='description' className='form-control' value={description} onChange={handleDescriptionChange}/>
            </div>

            <div className='mt-3'>
              <label htmlFor='duedate' className='form-label'>Date</label>
              <input type='date' name='date' id='date' className='form-control' value={date} onChange={handleDateChange} />
            </div>
            <div className='mt-3'>
              <label htmlFor='time' className='form-label'>Time</label>
              <input type='time' name='time' id='time' className='form-control' value={time} onChange={handleTimeChange} />
            </div>
            <div className='mt-3'>
              <label htmlFor='priority' className='form-label'>Priority</label>
                  <div className="form-check">
                      <input className="form-check-input" type="radio" name="priority" id="0" value="0" onChange={handlePriorityChange} checked/>
                      <label className="form-check-label" htmlFor="0">
                          Highly Important
                      </label>
                  </div>

                  <div className="form-check">
                      <input className="form-check-input" type="radio" name="priority" onChange={handlePriorityChange} id="1" value="1"/>
                      <label className="form-check-label" htmlFor="1">
                          Moderate Important
                      </label>
                  </div>

                  <div className="form-check">
                      <input className="form-check-input" type="radio" name="priority" onChange={handlePriorityChange} id="2" value="2"/>
                      <label className="form-check-label" htmlFor="2">
                          Sometime Later
                      </label>
                  </div>

                  <div className='d-flex justify-content-center mt-5' style={{marginRight: "35px" }}>
                      <button className='btn btn-primary' type='submit'>Add</button>
                  </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTask
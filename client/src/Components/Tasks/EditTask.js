import React, { useEffect, useState } from 'react'
import  { useNavigate, useParams  } from 'react-router-dom'

import { BsFillCursorFill } from "react-icons/bs";

import { editTask, readTask } from '../../controller/taskController'

function EditTask() {
  let { taskId } = useParams() // var name shd match the url path var name
  const [ task, setTask ] = useState({})
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ priority, setPriority ] = useState(0)
  const [ date, setDate ] = useState(new Date())
  const [ time, setTimein ] = useState('');
  const [milliseconds ,setMilliseconds]= useState(0)
  const navigate = useNavigate()

  useEffect(() => {
      console.log(taskId)
      readTask(taskId)
      .then((res) => {
          if(res.data === "Please login") {
            navigate("/login")
          } else {
              console.log(res.data)
              setTask(task)
              setTitle(res.data.title)
              setDescription(res.data.description)
              setMilliseconds(new Date(res.data.milliseconds).getTime())
              setPriority(res.data.priority)
              setDate(res.data.date)
              setTimein(res.data.time)
          }
      })
  }, [])

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }
  function handleTimeChange(e) {
    setTimein(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }
  function handleDateChange(e) {
    setDate(e.target.value)
    setMilliseconds(new Date(e.target.value).getTime())
  }
  function handlePriorityChange(e) {
    setPriority(Number(e.target.value))
  }


  function handleSubmit(e) {
    e.preventDefault()
    const data = {
        title: title,
        description: description,
        priority: priority,
        date : date,
        milliseconds : milliseconds,
        time : time
    }
    editTask(data, taskId)
    .then((res) => {
        console.log(res.data)
    })

    navigate("/")
  }

  return (
    <div className='container col-md-6'>
      <div className='mt-5'>
        <h1 className='d-flex justify-content-center lead display-4'>Edit Task</h1>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <label htmlFor='title' className='form-label'>Title</label>
            <input type='text' name='title' id='title' className='form-control' value={title} onChange={handleTitleChange}/>
          </div>

          <div className='mt-3'>
            <label htmlFor='description' className='form-label'>Description</label>
            <input type='text' name='description' id='description' className='form-control' value={description} onChange={handleDescriptionChange}/>
          </div>
          <div className='mt-3'>
              <label htmlFor='duedate' className='form-label'>Date</label>
              <input type='date' name='date' id='date' className='form-control' value={date} onChange={handleDateChange} />
          </div>
          <div className='mt-3'>
          <label htmlFor='Time' className='form-label'>Time</label>
                  <input type='time' name='time' id='time' className='form-control' value={time} onChange={handleTimeChange} />
          </div>

          <div className='mt-3'>
            <label htmlFor='priority' className='form-label'>Priority</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="priority" id="0" value="0" onChange={handlePriorityChange} checked={priority === 0}/>
                    <label className="form-check-label" htmlFor="0">
                        Highly Important
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="radio" name="priority" onChange={handlePriorityChange} id="1" value="1" checked={priority === 1}/>
                    <label className="form-check-label" htmlFor="1">
                        Moderate Important
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="radio" name="priority" onChange={handlePriorityChange} id="2" value="2" checked={priority === 2}/>
                    <label className="form-check-label" htmlFor="2">
                        Sometime Later
                    </label>
                </div>

                <div className='d-flex justify-content-center mt-5'>
                    <button className='btn btn-primary' type='submit'> <BsFillCursorFill/> Update</button>
                </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default EditTask
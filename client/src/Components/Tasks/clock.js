import React, { useState ,useEffect} from 'react'
import pic from "./clock.png";
import './clock.css'

function Count(props) {
    const date = props.date
    const ptime = props.time
    const [ph , ps] = ptime.split(":")
    const tr = new Date(date).setHours(ph,ps)
    const cm = new Date().getTime()
    const gap = tr - cm
    const seconds = 1000
    const minute = seconds*60
    const hour = minute*60
    const day = hour*24
    const [textDay,setTextDay ] = useState('')
    const [textHour,setTextHour]  = useState('')
    const [textMinute,setTextMinute] = useState('')
    const [textSecond,setTextSecond] = useState('')

    useEffect(() => {
        setTimeout(() => {
          setTextDay(Math.floor(gap/day));
          setTextHour(Math.floor((gap%day)/hour))
          setTextMinute(Math.floor((gap%hour)/minute))
          setTextSecond(Math.floor((gap%minute)/seconds))
        }, 1000);
      });

    return (
        <div>
            <img className="picad" src={pic} />
            {gap>0?
            <>{textDay} days {textHour} hours {textMinute} minutes {textSecond} seconds left </>:"Expired time limit"}
            
             {/* {real} */}
            {} 
        </div>
    )
}

export default Count;
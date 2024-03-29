import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import AddTask from './Components/Tasks/AddTask';
import EditTask from './Components/Tasks/EditTask';
import Footer from './Components/Footer/Footer';
import DateTimePicker from 'react-datetime-picker'

function App() {

  const [user, setUser ] = useState()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser !== 'undefined') {
      const foundUser = loggedInUser;
      setUser(JSON.parse(foundUser));
    }
  }, []);

  return (
    <div className="App" >
      {/* <div className="bg"> */}
         <Router>
            <Navbar user = { user }/>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path="/add" element={<AddTask/>}/>
              <Route path="/edit/:taskId" element={<EditTask/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
            <Footer/>
          </Router>
        {/* </div> */}
    </div>
  );
}

export default App;

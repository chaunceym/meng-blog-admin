import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from '../pages/Login'
import AdminIndex from "../pages/AdminIndex"

const Main = (props) => {
  return (
    <Router>
      <Route path="/index" component={AdminIndex}/>
      <Route path="/login" exact component={Login}/>
    </Router>
  )
}

export default Main
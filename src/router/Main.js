import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from '../pages/Login'
import AdminIndex from "../pages/AdminIndex"
import AddArticle from "../pages/AddArticle"
import ArticleList from "../pages/ArticleList"

const Main = () => {
  return (
    <Router>
      <Route path="/login" exact component={Login}/>
      <Route path="/index" component={AdminIndex}/>
      <Route path="/index/add" exact component={AddArticle}/>
      <Route path="/index/list" exact component={ArticleList}/>
    </Router>
  )
}

export default Main
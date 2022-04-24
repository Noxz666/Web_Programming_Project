import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Header from './components/Navbar'
import Search_User from './components/User_Search_part/UserSearch'
import Search_page from './components/Search_part/Search_page'
import Search_page_ShowID from './components/Search_part/Show'
import User_ShowID from './components/User_Search_part/UserShow'
import Login from './components/Login';

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Header/>
      <Switch>
        
        <Route exact path="/" component={App} />
        <Route path="/Search_user" component={Search_User} />
        <Route path="/Search_page" component={Search_page} />
        <Route path="/Login" component={Login} />
        <Route path="/AllData/:id" component={Search_page_ShowID} />
        <Route path="/UserAllData/:id" component={User_ShowID} />
        
        
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



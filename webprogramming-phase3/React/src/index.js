import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Header from './components/Navbar'
import Login_page from './components/Login_part/Login'
import Search_page from './components/Search_part/Search_page'

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Header/>
      <Switch>
        
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login_page} />
        <Route path="/Search_page" component={Search_page} />
        
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


